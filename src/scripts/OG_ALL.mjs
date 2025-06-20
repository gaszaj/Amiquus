// Path: /src/scripts/OG_ALL.mjs
// Purpose: Run all OG image generation scripts sequentially
// Data: Executes all OG_*.mjs scripts
// Dependencies: All OG_*.mjs scripts in this directory

import { spawn } from 'child_process';

// List of all OG scripts with correct paths
const scripts = [
    'src/scripts/OG_home.mjs',
    'src/scripts/OG_eeat.mjs', 
    'src/scripts/OG_category.mjs',
    'src/scripts/OG_author.mjs',
    'src/scripts/OG_product.mjs',
    'src/scripts/OG_article.mjs'
];

// Simple function to run a script
async function runScript(scriptPath) {
    return new Promise((resolve) => {
        console.log(`\n🚀 Running ${scriptPath}...`);
        
        const child = spawn('node', [scriptPath], { stdio: 'inherit' });
        
        child.on('close', (code) => {
            if (code === 0) {
                console.log(`✅ ${scriptPath} completed`);
                resolve(true);
            } else {
                console.log(`❌ ${scriptPath} failed (code: ${code})`);
                resolve(false);
            }
        });
    });
}

// Main execution
async function main() {
    console.log('🎯 Starting all OG image generation scripts...');
    
    let successCount = 0;
    
    for (const script of scripts) {
        const success = await runScript(script);
        if (success) successCount++;
    }
    
    console.log(`\n✨ Done! ${successCount}/${scripts.length} scripts completed successfully`);
    
    if (successCount < scripts.length) {
        process.exit(1);
    }
}

main().catch(console.error);