const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials. Please check your .env.local file.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function updateImageUrls() {
  console.log('🔄 Updating image URLs from PNG/JPG to WebP...\n');

  try {
    // Fetch all projects
    const { data: projects, error } = await supabase
      .from('projects')
      .select('id, image_url, title');

    if (error) {
      console.error('Error fetching projects:', error);
      return;
    }

    console.log(`Found ${projects.length} projects to check.\n`);

    let updated = 0;
    for (const project of projects) {
      const oldUrl = project.image_url;
      
      // Check if it's a local image (not from Supabase storage)
      if (oldUrl && (oldUrl.endsWith('.png') || oldUrl.endsWith('.jpg') || oldUrl.endsWith('.jpeg'))) {
        // Replace extension with .webp
        const newUrl = oldUrl.replace(/\.(png|jpg|jpeg)$/i, '.webp');
        
        const { error: updateError } = await supabase
          .from('projects')
          .update({ image_url: newUrl })
          .eq('id', project.id);

        if (updateError) {
          console.log(`✗ Error updating "${project.title}":`, updateError.message);
        } else {
          console.log(`✓ Updated "${project.title}"`);
          console.log(`  ${oldUrl} -> ${newUrl}`);
          updated++;
        }
      }
    }

    console.log(`\n✅ Done! Updated ${updated} project image URLs.`);
  } catch (error) {
    console.error('Error:', error);
  }
}

updateImageUrls();
