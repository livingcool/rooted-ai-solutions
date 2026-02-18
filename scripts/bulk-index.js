import fs from 'fs';
import path from 'path';
import { google } from 'googleapis';
import { JWT } from 'google-auth-library';
import { fileURLToPath } from 'url';

// CONFIGURATION
const SERVICE_ACCOUNT_FILE = 'service_account.json'; // Ensure this file exists in root
const SITEMAP_FILE = 'public/sitemap.xml';

async function main() {
    console.log('🚀 Starting Bulk Indexing Script...');

    // 1. Check for Service Account Key
    const keyPath = path.join(process.cwd(), SERVICE_ACCOUNT_FILE);
    if (!fs.existsSync(keyPath)) {
        console.error(`❌ Error: Service account key not found at ${SERVICE_ACCOUNT_FILE}`);
        console.error('Please verify you have moved your JSON key to the root directory.');
        process.exit(1);
    }

    // 2. Read Sitemap
    const sitemapPath = path.join(process.cwd(), SITEMAP_FILE);
    if (!fs.existsSync(sitemapPath)) {
        console.error(`❌ Error: Sitemap not found at ${SITEMAP_FILE}`);
        process.exit(1);
    }

    const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
    // Simple regex to extract URLs from sitemap
    const urlRegex = /<loc>(.*?)<\/loc>/g;
    let match;
    const urls = [];

    while ((match = urlRegex.exec(sitemapContent)) !== null) {
        if (match[1]) urls.push(match[1]);
    }

    console.log(`📋 Found ${urls.length} URLs in sitemap.`);

    // 3. Authenticate
    const keys = JSON.parse(fs.readFileSync(keyPath, 'utf8')); // Fixed: Use JSON.parse instead of require

    const client = new JWT({
        email: keys.client_email,
        key: keys.private_key,
        scopes: ['https://www.googleapis.com/auth/indexing'],
    });

    try {
        await client.authorize();
        console.log('✅ Authenticated with Google Indexing API.');
    } catch (err) {
        console.error('❌ Authentication failed:', err.message);
        process.exit(1);
    }

    // 4. Submit URLs
    const indexing = google.indexing({ version: 'v3', auth: client });

    console.log('📤 Submitting URLs for indexing...');

    let successCount = 0;
    let failCount = 0;

    for (const url of urls) {
        try {
            console.log(`   Processing: ${url}`);

            const res = await indexing.urlNotifications.publish({
                requestBody: {
                    url: url,
                    type: 'URL_UPDATED',
                },
            });

            if (res.status === 200) {
                console.log(`   ✅ Success: ${url}`);
                successCount++;
            } else {
                console.error(`   ⚠️ Failed (${res.status}): ${url}`);
                failCount++;
            }

        } catch (error) {
            console.error(`   ❌ Error submitting ${url}:`, error.message);
            failCount++;
        }
    }

    console.log('\n=============================================');
    console.log(`🎉 Bulk Indexing Complete!`);
    console.log(`✅ Success: ${successCount}`);
    console.log(`❌ Failed: ${failCount}`);
    console.log('=============================================');
    console.log('Note: Google may take up to 24 hours to process these requests.');
}

main().catch(console.error);
