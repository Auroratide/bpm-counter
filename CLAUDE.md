Intelligently manage this CLAUDE.md file based on conversation context and work state. Use this file to document useful commands for the project, document architecture, and keep a live list of notes about work that was recently done or is left to do.

## Commands

### Development
- `npm install` - Install dependencies
- `npm run dev` - Start development server (opens at http://localhost:3000)
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Deployment
- Built files are output to `dist/` directory
- Configured for GitHub Pages deployment with base path `/bpm-counter/`

## Architecture

This is a static website built with:
- **Vite** - Fast build tool and dev server
- **TypeScript** - Type-safe JavaScript
- **Vanilla HTML/CSS/JS** - No framework dependencies for simplicity
- **GitHub Pages** - Static site hosting

### Project Structure
```
├── index.html          # Main HTML file
├── src/
│   ├── main.ts         # Main TypeScript entry point
│   └── style.css       # Global styles
├── package.json        # Dependencies and scripts
├── tsconfig.json       # TypeScript configuration
├── vite.config.ts      # Vite configuration
└── .gitignore          # Git ignore patterns
```

## Notes

- **Initial Setup** (2025-07-18): Created basic project structure with Vite + TypeScript
- **Hello World**: Simple homepage displaying "Hello World" message
- **GitHub Pages Ready**: Configured base path for deployment
- **Next Steps**: Can extend with actual BPM counter functionality
