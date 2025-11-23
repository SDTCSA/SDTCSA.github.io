import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.resolve(__dirname, '../public');
const dirsToScan = ['logos', 'images', 'posters']; // Add other directories if needed

const MAX_WIDTH_LOGO = 512; // Logos don't need to be huge
const MAX_WIDTH_POSTER = 1024; // Posters can be a bit larger
const QUALITY = 80;

async function processDirectory(dirName) {
    const fullPath = path.join(publicDir, dirName);
    if (!fs.existsSync(fullPath)) {
        console.log(`Directory ${dirName} does not exist, skipping.`);
        return;
    }

    const files = fs.readdirSync(fullPath);

    for (const file of files) {
        const ext = path.extname(file).toLowerCase();
        if (['.png', '.jpg', '.jpeg'].includes(ext)) {
            const inputPath = path.join(fullPath, file);
            const filenameWithoutExt = path.basename(file, ext);
            const outputPath = path.join(fullPath, `${filenameWithoutExt}.webp`);

            // Skip if webp already exists and is newer (optional, but good for re-running)
            if (fs.existsSync(outputPath)) {
                // If WebP exists, we can delete the original if the user requested it (implied by context)
                // But let's just log it for now, or maybe we should just delete it here?
                // The user said "png不需要保留了", so we should delete the original.
                try {
                    fs.unlinkSync(inputPath);
                    console.log(`Deleted original: ${dirName}/${file} (WebP already exists)`);
                } catch (e) {
                    console.error(`Failed to delete ${file}:`, e);
                }
                continue; 
            }

            try {
                const metadata = await sharp(inputPath).metadata();
                let pipeline = sharp(inputPath);

                const isLogo = dirName === 'logos';
                const maxWidth = isLogo ? MAX_WIDTH_LOGO : MAX_WIDTH_POSTER;

                if (metadata.width > maxWidth) {
                    pipeline = pipeline.resize({ width: maxWidth });
                }

                await pipeline
                    .webp({ quality: QUALITY })
                    .toFile(outputPath);

                console.log(`Optimized: ${dirName}/${file} -> ${dirName}/${filenameWithoutExt}.webp`);
                
                // Optional: Calculate savings
                const originalStats = fs.statSync(inputPath);
                const newStats = fs.statSync(outputPath);
                const savings = ((originalStats.size - newStats.size) / originalStats.size * 100).toFixed(2);
                console.log(`  Saved ${savings}% (${(originalStats.size/1024).toFixed(2)}KB -> ${(newStats.size/1024).toFixed(2)}KB)`);

                // Delete original file after successful conversion
                fs.unlinkSync(inputPath);
                console.log(`  Deleted original: ${dirName}/${file}`);

            } catch (err) {
                console.error(`Error processing ${file}:`, err);
            }
        }
    }
}

async function main() {
    console.log('Starting image optimization...');
    for (const dir of dirsToScan) {
        await processDirectory(dir);
    }
    console.log('Done!');
}

main();
