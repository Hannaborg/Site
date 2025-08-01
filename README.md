# Site - Personal Portfolio & Blog

A simple static site built with HTML, CSS, and Node.js for a personal portfolio and blog.

## Site Specification

### Structure
- **Home Page**: Landing page with navigation and footer
- **Blog**: Collection of markdown posts with newsletter signup
- **Projects**: Portfolio of project pages
- **Static Assets**: CSS styling and images

### Features
- **Markdown Support**: Blog posts and project pages written in markdown with frontmatter
- **Newsletter Integration**: ConvertKit email signup forms
- **Responsive Design**: Mobile-friendly layout
- **GitHub Pages**: Automated deployment via GitHub Actions
- **Simple Build Process**: Node.js build script converts markdown to HTML

### File Structure
```
Site/
├── src/
│   ├── content/          # Markdown content
│   │   ├── blog/         # Blog posts
│   │   └── projects/     # Project pages
│   ├── templates/        # HTML templates
│   └── css/             # Stylesheets
├── public/              # Built site (deployed)
├── build.js            # Build script
└── package.json        # Dependencies
```

### Development
```bash
npm install              # Install dependencies
npm run build           # Build the site
npm run serve           # Serve locally
```

### Deployment
- Automatically deploys to GitHub Pages on push to main branch
- Build process runs via GitHub Actions
- Site available at: https://hannaborg.github.io/Site/