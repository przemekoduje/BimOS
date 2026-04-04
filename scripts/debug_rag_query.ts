import { searchLegalChunks } from '../src/services/legalRagService';
import dotenv from 'dotenv';
import path from 'path';

// Load .env
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function testRagSearch() {
  const query = "art 38 ust 1 prawo budowlane";
  console.log(`Testing RAG search for: "${query}"...`);
  try {
    const chunks = await searchLegalChunks(query, 5);
    console.log(`Found ${chunks.length} chunks:`);
    chunks.forEach((chunk, i) => {
      console.log(`\n--- Chunk ${i + 1} (${chunk.document_name} | ${chunk.article_ref}) ---`);
      console.log(chunk.content);
    });
  } catch (err) {
    console.error('Error during RAG search:', err);
  }
}

testRagSearch();
