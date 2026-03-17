const fs = require('fs');
const axios = require('axios');
const https = require('https');

const agent = new https.Agent({  
  rejectUnauthorized: false
});

async function extractEngineers() {
  const allEngineers = [];
  const provinces = [12]; // Śląskie
  
  for (const provinceId of provinces) {
    console.log(`--- Starting FULL extraction for Province: Śląskie (ID: ${provinceId}) ---`);
    let page = 1;
    let hasMore = true;

    while (hasMore) {
      // Removing options[contact_data]=true to get the FULL list of 16k engineers
      // Adding stats[total]=count to get the total number of records
      const url = `https://e-crub-next.gunb.gov.pl/api/public/professional_cards?filter[voivodeship_id]=${provinceId}&page[size]=20&page[number]=${page}&stats[total]=count`;
      
      try {
        const response = await axios.get(url, {
          httpsAgent: agent,
          timeout: 15000,
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            'Referer': 'https://e-crub-next.gunb.gov.pl/'
          }
        });
        
        const data = response.data;
        const totalCount = data.meta?.stats?.total?.count || 'unknown';
        
        if (data.data && data.data.length > 0) {
          allEngineers.push(...data.data);
          console.log(`Śląskie, Page ${page}: Fetched ${data.data.length} records (Total: ${allEngineers.length} / ${totalCount})`);
          page++;
        } else {
          console.log("No more data reached.");
          hasMore = false;
        }
        
        // Slightly faster delay for larger pull, but still polite
        await new Promise(resolve => setTimeout(resolve, 600)); 
      } catch (error) {
        if (error.response && error.response.status === 429) {
          console.log("Rate limited! Waiting 60 seconds...");
          await new Promise(resolve => setTimeout(resolve, 60000));
        } else {
          console.error(`Error on Page ${page}:`, error.message);
          hasMore = false; 
        }
      }
    }
  }

  // Save to both root and public for convenience
  const jsonContent = JSON.stringify(allEngineers, null, 2);
  fs.writeFileSync('engineers_data.json', jsonContent);
  fs.writeFileSync('public/engineers_data.json', jsonContent);

  fs.writeFileSync('engineers_data.json', JSON.stringify(allEngineers, null, 2));
  console.log(`Extraction complete. Saved ${allEngineers.length} records to engineers_data.json`);
}

extractEngineers();
