const fs = require('fs-extra');
const path = require('path');
const { marked } = require('marked');

// Ensure directories exist
fs.ensureDirSync('src/content');
fs.ensureDirSync('src/content/blog');
fs.ensureDirSync('src/content/projects');
fs.ensureDirSync('public/blog');
fs.ensureDirSync('public/projects');

// Read the templates
const template = fs.readFileSync('src/templates/base.html', 'utf-8');
const blogTemplate = fs.readFileSync('src/templates/blog.html', 'utf-8');
const blogPostTemplate = fs.readFileSync('src/templates/blog-post.html', 'utf-8');
const homeTemplate = fs.readFileSync('src/templates/home.html', 'utf-8');
const navTemplate = fs.readFileSync('src/templates/nav.html', 'utf-8');
const footerTemplate = fs.readFileSync('src/templates/footer.html', 'utf-8');
const convertkitTemplate = fs.readFileSync('src/templates/convertkit.html', 'utf-8');
const projectsTemplate = fs.readFileSync('src/templates/projects.html', 'utf-8');
const projectPageTemplate = fs.readFileSync('src/templates/project-page.html', 'utf-8');

// Parse frontmatter (YAML-like)
function parseFrontmatter(md) {
    if (!md.startsWith('---')) return { attributes: {}, body: md };
    const end = md.indexOf('---', 3);
    if (end === -1) return { attributes: {}, body: md };
    const fm = md.slice(3, end).trim();
    const body = md.slice(end + 3).trim();
    const attributes = {};
    fm.split('\n').forEach(line => {
        const [key, ...rest] = line.split(':');
        if (key && rest.length) attributes[key.trim()] = rest.join(':').trim();
    });
    return { attributes, body };
}

// Configure marked to allow HTML
marked.setOptions({
    breaks: true,
    gfm: true
});

// Convert markdown to HTML
function convertMarkdownToHtml(markdown) {
    return marked.parse(markdown);
}

async function build() {
    // Generate home page
    const homeHtml = homeTemplate
        .replace(/{{nav}}/g, navTemplate)
        .replace(/{{footer}}/g, footerTemplate);
    await fs.writeFile('public/index.html', homeHtml);

    // Process regular markdown files in src/content (not blog)
    const files = await fs.readdir('src/content');
    for (const file of files) {
        if (file.endsWith('.md')) {
            const content = await fs.readFile(path.join('src/content', file), 'utf-8');
            const { attributes, body } = parseFrontmatter(content);
            const html = convertMarkdownToHtml(body);
            const title = attributes.title || file.replace('.md', '');
            
            // Use projects template for projects.md, otherwise use regular template
            const templateToUse = file === 'projects.md' ? projectsTemplate : template;
            
            const pageHtml = templateToUse
                .replace(/{{content}}/g, html)
                .replace(/{{title}}/g, title)
                .replace(/{{nav}}/g, navTemplate)
                .replace(/{{footer}}/g, footerTemplate);
            
            // For projects.md, create it as projects/index.html instead of projects.html
            if (file === 'projects.md') {
                await fs.ensureDir('public/projects');
                await fs.writeFile('public/projects/index.html', pageHtml);
            } else {
                const outputFile = file.replace('.md', '.html');
                await fs.writeFile(path.join('public', outputFile), pageHtml);
            }
        }
    }

    // Process blog posts
    const blogDir = 'src/content/blog';
    const blogFiles = (await fs.readdir(blogDir)).filter(f => f.endsWith('.md'));
    let blogPosts = [];
    for (const file of blogFiles) {
        const raw = await fs.readFile(path.join(blogDir, file), 'utf-8');
        const { attributes, body } = parseFrontmatter(raw);
        const html = convertMarkdownToHtml(body);
        const title = attributes.title || file.replace('.md', '');
        const date = attributes.date || '';
        
        // Remove the first H1 heading from content since title is in hero section
        const contentWithoutTitle = html.replace(/<h1[^>]*>.*?<\/h1>/, '');
        
        const blogHtml = blogPostTemplate
            .replace(/{{content}}/g, contentWithoutTitle)
            .replace(/{{title}}/g, title)
            .replace(/{{nav}}/g, navTemplate)
            .replace(/{{footer}}/g, footerTemplate);
        const outputFile = file.replace('.md', '.html');
        await fs.writeFile(path.join('public/blog', outputFile), blogHtml);
        blogPosts.push({
            title,
            date,
            url: `/Site/blog/${outputFile}`
        });
    }
    // Sort blog posts by date descending
    blogPosts.sort((a, b) => (b.date || '').localeCompare(a.date || ''));

    // Generate blog index
    const blogIndexContent = `
    <ul style="list-style:none; padding:0;">
      ${blogPosts.map(post => {
        // Format date to "Last updated Month Day Year"
        let formattedDate = '';
        if (post.date) {
          const date = new Date(post.date);
          const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                         'July', 'August', 'September', 'October', 'November', 'December'];
          const month = months[date.getMonth()];
          const day = date.getDate();
          const year = date.getFullYear();
          formattedDate = `Last updated ${month} ${day} ${year}`;
        }
        return `
        <li style="margin-bottom:2rem;">
          <a href="${post.url}" style="font-size:1rem; font-family:var(--font-sans); color:var(--primary); font-weight:300; text-transform:uppercase; letter-spacing:0.1em;">${post.title}</a><br>
          <span style="color:#888; font-size:0.95rem;">${formattedDate}</span>
        </li>
      `}).join('')}
    </ul>`;
    
    const blogIndexHtml = blogTemplate
        .replace(/{{content}}/g, blogIndexContent)
        .replace(/{{title}}/g, 'Blog')
        .replace(/{{date}}/g, '')
        .replace(/{{convertkit}}/g, convertkitTemplate)
        .replace(/{{nav}}/g, navTemplate)
        .replace(/{{footer}}/g, footerTemplate);
    await fs.writeFile('public/blog/index.html', blogIndexHtml);

    // Process project pages
    const projectsDir = 'src/content/projects';
    if (fs.existsSync(projectsDir)) {
        const projectFiles = (await fs.readdir(projectsDir)).filter(f => f.endsWith('.md'));
        for (const file of projectFiles) {
            const raw = await fs.readFile(path.join(projectsDir, file), 'utf-8');
            const { attributes, body } = parseFrontmatter(raw);
            const html = convertMarkdownToHtml(body);
            const title = attributes.title || file.replace('.md', '');
            
            // Remove the first H1 heading from content since title is in hero section
            const contentWithoutTitle = html.replace(/<h1[^>]*>.*?<\/h1>/, '');
            
            const projectHtml = projectPageTemplate
                .replace(/{{content}}/g, contentWithoutTitle)
                .replace(/{{title}}/g, title)
                .replace(/{{nav}}/g, navTemplate)
                .replace(/{{footer}}/g, footerTemplate);
            const outputFile = file.replace('.md', '.html');
            await fs.writeFile(path.join('public/projects', outputFile), projectHtml);
        }
    }

    // Copy CSS assets if they exist
    if (fs.existsSync('src/css')) {
        await fs.copy('src/css', 'public/css', { overwrite: true });
    }
}

build().catch(console.error); 