const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const directories = [
  'public/images/design',
  'public/images/development',
  'public/images'
];

async function convertToWebP(inputPath, outputPath) {
  try {
    const info = await sharp(inputPath)
      .webp({ quality: 80 })
      .toFile(outputPath);
    
    const originalSize = fs.statSync(inputPath).size;
    const newSize = info.size;
    const savings = ((originalSize - newSize) / originalSize * 100).toFixed(1);
    
    console.log(`✓ ${path.basename(inputPath)} -> ${path.basename(outputPath)}`);
    console.log(`  ${(originalSize / 1024 / 1024).toFixed(2)}MB -> ${(newSize / 1024 / 1024).toFixed(2)}MB (${savings}% smaller)`);
    
    return { original: originalSize, converted: newSize };
  } catch (error) {
    console.error(`✗ Error converting ${inputPath}:`, error.message);
    return null;
  }
}

async function processDirectory(dir) {
  if (!fs.existsSync(dir)) {
    console.log(`Directory ${dir} does not exist, skipping...`);
    return { original: 0, converted: 0, count: 0 };
  }

  const files = fs.readdirSync(dir);
  let totalOriginal = 0;
  let totalConverted = 0;
  let count = 0;

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (['.png', '.jpg', '.jpeg'].includes(ext)) {
      const inputPath = path.join(dir, file);
      const outputPath = path.join(dir, file.replace(ext, '.webp'));
      
      // Skip if already a .webp file exists
      if (fs.existsSync(outputPath)) {
        console.log(`⏭ Skipping ${file} (WebP already exists)`);
        continue;
      }

      const result = await convertToWebP(inputPath, outputPath);
      if (result) {
        totalOriginal += result.original;
        totalConverted += result.converted;
        count++;
      }
    }
  }

  return { original: totalOriginal, converted: totalConverted, count };
}

async function main() {
  console.log('🖼️  Converting images to WebP format...\n');
  
  let grandTotalOriginal = 0;
  let grandTotalConverted = 0;
  let grandTotalCount = 0;

  for (const dir of directories) {
    console.log(`\n📁 Processing ${dir}...`);
    console.log('─'.repeat(50));
    
    const result = await processDirectory(dir);
    grandTotalOriginal += result.original;
    grandTotalConverted += result.converted;
    grandTotalCount += result.count;
  }

  console.log('\n' + '═'.repeat(50));
  console.log('📊 SUMMARY');
  console.log('═'.repeat(50));
  console.log(`Total files converted: ${grandTotalCount}`);
  console.log(`Total original size: ${(grandTotalOriginal / 1024 / 1024).toFixed(2)}MB`);
  console.log(`Total converted size: ${(grandTotalConverted / 1024 / 1024).toFixed(2)}MB`);
  console.log(`Total savings: ${((grandTotalOriginal - grandTotalConverted) / 1024 / 1024).toFixed(2)}MB (${((grandTotalOriginal - grandTotalConverted) / grandTotalOriginal * 100).toFixed(1)}%)`);
  console.log('\n✅ Done! You can now delete the original PNG/JPG files if desired.');
}

main().catch(console.error);
