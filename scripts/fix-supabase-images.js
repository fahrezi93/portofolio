const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials. Please check your .env.local file.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function fixSupabaseImageUrls() {
  console.log('🔄 Fixing Supabase image URLs...\n');

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

    let fixed = 0;
    for (const project of projects) {
      const currentUrl = project.image_url;
      
      // Only fix Supabase storage URLs that were wrongly converted to .webp
      // Keep local images (/images/...) as .webp since those were actually converted
      if (currentUrl && 
          currentUrl.includes('supabase') && 
          currentUrl.endsWith('.webp')) {
        
        // Check if file exists with original extension
        // Try common extensions
        const extensions = ['.png', '.jpg', '.jpeg', '.gif'];
        
        for (const ext of extensions) {
          const originalUrl = currentUrl.replace('.webp', ext);
          
          // Try to fetch the image to see if it exists
          try {
            const response = await fetch(originalUrl, { method: 'HEAD' });
            if (response.ok) {
              // Found the original file!
              const { error: updateError } = await supabase
                .from('projects')
                .update({ image_url: originalUrl })
                .eq('id', project.id);

              if (updateError) {
                console.log(`✗ Error updating "${project.title}":`, updateError.message);
              } else {
                console.log(`✓ Fixed "${project.title}"`);
                console.log(`  ${currentUrl} -> ${originalUrl}`);
                fixed++;
              }
              break;
            }
          } catch (e) {
            // Continue to next extension
          }
        }
      }
    }

    console.log(`\n✅ Done! Fixed ${fixed} Supabase image URLs.`);
  } catch (error) {
    console.error('Error:', error);
  }
}

fixSupabaseImageUrls();
