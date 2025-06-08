const fs = require('fs-extra');
const path = require('path');
const { marked } = require('marked');

// Ensure directories exist
fs.ensureDirSync('src/content');
fs.ensureDirSync('public');

// Read the template
const template = fs.readFileSync('src/template.html', 'utf-8');

// Convert markdown to HTML
function convertMarkdownToHtml(markdown) {
    return marked.parse(markdown);
}

// Process all markdown files
async function build() {
    // Copy index.html directly
    if (fs.existsSync('src/content/index.html')) {
        await fs.copy('src/content/index.html', 'public/index.html');
    }

    // Read all markdown files
    const files = await fs.readdir('src/content');
    
    for (const file of files) {
        if (file.endsWith('.md')) {
            const content = await fs.readFile(path.join('src/content', file), 'utf-8');
            const html = convertMarkdownToHtml(content);
            
            // Replace content in template
            const pageHtml = template.replace('{{content}}', html);
            
            // Write to public directory
            const outputFile = file.replace('.md', '.html');
            await fs.writeFile(path.join('public', outputFile), pageHtml);
        }
    }
    
    // Copy static assets
    await fs.copy('src/static', 'public', { overwrite: true });
}

build().catch(console.error); 