# Personal Portfolio & Blog Site

A static site generator built with Node.js that creates a personal portfolio and blog from Markdown files.

## Features

- **Static Site Generation**: Converts Markdown files to HTML using a custom build script
- **Blog System**: Supports blog posts with frontmatter metadata (title, date)
- **Portfolio Pages**: Dedicated project showcase with individual project pages
- **Newsletter Integration**: ConvertKit email subscription form embedded in blog
- **Responsive Design**: Clean, minimal CSS with mobile-friendly layout
- **GitHub Pages Deployment**: Automated deployment via GitHub Actions

## Tech Stack

- **Build Tool**: Custom Node.js script with `marked` for Markdown parsing
- **Styling**: Vanilla CSS with CSS custom properties
- **Templates**: HTML templates with placeholder replacement
- **Deployment**: GitHub Pages with automated build workflow

## Structure

```
src/
├── content/          # Markdown content (blog posts, projects)
├── templates/        # HTML templates
└── css/             # Stylesheets
public/              # Generated static files
```

## Usage

1. Add Markdown files to `src/content/`
2. Run `npm run build` to generate static site
3. Deploy to GitHub Pages automatically on push to main branch