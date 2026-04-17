import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { spawn } from 'child_process'
import fs from 'fs'

// Keep track of the running background process
let enrichmentProcess = null;

// Custom plugin to add backend API endpoints inside the Dev server
const enrichmentControllerPlugin = () => ({
  name: 'enrichment-controller',
  configureServer(server) {
    const aiDisabledFile = '.AI_DISABLED';

    server.middlewares.use((req, res, next) => {
      // GET /api/ai/status
      if (req.url === '/api/ai/status' && req.method === 'GET') {
        const isDisabled = fs.existsSync(aiDisabledFile);
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ isDisabled }));
        return;
      }

      // POST /api/ai/enable
      if (req.url === '/api/ai/enable' && req.method === 'POST') {
        if (fs.existsSync(aiDisabledFile)) {
          fs.unlinkSync(aiDisabledFile);
        }
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ status: 'ai_enabled_globally' }));
        return;
      }
      // POST /api/enrichment/start
      if (req.url === '/api/enrichment/start' && req.method === 'POST') {
        if (enrichmentProcess) {
          res.statusCode = 400;
          res.end(JSON.stringify({ error: 'Process already running' }));
          return;
        }

        try {
          // Usuwamy globalną blokadę AI przy starcie
          if (fs.existsSync(aiDisabledFile)) {
            fs.unlinkSync(aiDisabledFile);
          }

          // Odpal proces z katalogu w którym się znajdujemy
          enrichmentProcess = spawn('node', ['enrich_engineers.cjs'], {
            detached: false,
            stdio: 'inherit'
          });

          enrichmentProcess.on('exit', (code) => {
            console.log(`Enrichment process exited with code ${code}`);
            enrichmentProcess = null;
          });

          enrichmentProcess.on('error', (err) => {
            console.error('Failed to start enrichment process.', err);
            enrichmentProcess = null;
          });

          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ status: 'started' }));

        } catch (error) {
           res.statusCode = 500;
           res.end(JSON.stringify({ error: error.message }));
        }
        return;
      }

      // POST /api/enrichment/stop
      if (req.url === '/api/enrichment/stop' && req.method === 'POST') {
        if (!enrichmentProcess) {
          res.statusCode = 400;
          res.end(JSON.stringify({ error: 'Process is not running' }));
          return;
        }

        try {
          // Globalny Kill-Switch: tworzymy plik blokady dla wszystkich skryptów
          fs.writeFileSync(aiDisabledFile, 'true');

          if (enrichmentProcess) {
            // Wysyłamy SIGINT by pozwolić skryptowi elegancko się ubić 
            enrichmentProcess.kill('SIGINT');
            enrichmentProcess = null;
          }

          // KRYTYCZNE: Wywołujemy skrypt czyszczący cache Gemini, by zatrzymać opłaty za storage
          console.log("[STORAGE] Attempting to purge Gemini caches...");
          spawn('node', ['./scripts/cleanup_gemini_caches.cjs'], { stdio: 'inherit' });
          
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ status: 'ai_killed_globally' }));
        } catch(error) {
           res.statusCode = 500;
           res.end(JSON.stringify({ error: error.message }));
        }
        return;
      }

      // POST /api/enrichment/reject
      if (req.url === '/api/enrichment/reject' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => { body += chunk.toString(); });
        req.on('end', () => {
          try {
            const { id } = JSON.parse(body);
            const pendingFile = 'public/enrichment_pending.json';

            if (fs.existsSync(pendingFile)) {
              let pendingList = JSON.parse(fs.readFileSync(pendingFile, 'utf8'));
              pendingList = pendingList.filter(p => String(p.id) !== String(id));
              fs.writeFileSync(pendingFile, JSON.stringify(pendingList, null, 2));
              
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: true }));
            } else {
              res.statusCode = 404;
              res.end(JSON.stringify({ error: 'Pending file not found' }));
            }
          } catch (error) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: error.message }));
          }
        });
        return;
      }

      // POST /api/enrichment/approve
      if (req.url === '/api/enrichment/approve' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => { body += chunk.toString(); });
        req.on('end', () => {
          try {
            const { id } = JSON.parse(body);
            const pendingFile = 'public/enrichment_pending.json';
            const dataFile = 'engineers_data.json';
            const publicDataFile = 'public/engineers_data.json';

            if (fs.existsSync(pendingFile) && fs.existsSync(dataFile)) {
              let pendingList = JSON.parse(fs.readFileSync(pendingFile, 'utf8'));
              const approvedItem = pendingList.find(p => String(p.id) === String(id));
              
              if (approvedItem) {
                // Usun z pending
                pendingList = pendingList.filter(p => String(p.id) !== String(id));
                fs.writeFileSync(pendingFile, JSON.stringify(pendingList, null, 2));

                // Zapisz do main db
                let mainData = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
                const engineerIndex = mainData.findIndex(e => String(e.id) === String(id));
                
                if (engineerIndex !== -1) {
                  if (!mainData[engineerIndex].attributes.contact_data) {
                    mainData[engineerIndex].attributes.contact_data = { address: {} };
                  } else if (!mainData[engineerIndex].attributes.contact_data.address) {
                    mainData[engineerIndex].attributes.contact_data.address = {};
                  }
                  if (approvedItem.email) {
                    mainData[engineerIndex].attributes.contact_data.address.email_address = approvedItem.email;
                  }
                  if (approvedItem.phone) {
                    mainData[engineerIndex].attributes.contact_data.address.phone_number = approvedItem.phone;
                  }
                  
                  fs.writeFileSync(dataFile, JSON.stringify(mainData, null, 2));
                  fs.writeFileSync(publicDataFile, JSON.stringify(mainData, null, 2));
                }
                
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: true }));
                return;
              }
            }
            res.statusCode = 404;
            res.end(JSON.stringify({ error: 'Item not found' }));
          } catch (error) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: error.message }));
          }
        });
        return;
      }

      // If it's not our custom endpoint, let Vite handle it
      next();
    });
  }
});

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), enrichmentControllerPlugin()],
})
