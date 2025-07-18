# BPM Counter

BPM Counter is a website that measures your heart rate. Here's what you do:

1. Find your pulse by pressing two of your fingers against your neck.
2. Once you've found it, tap the button in the center of the screen once for every pulse that you feel.
3. Continue tapping for at least 10 seconds.
4. When you are done, the app will tell you what your heartrate was!

## Development

### Prerequisites

- Node.js 18.0.0 or higher
- npm (comes with Node.js)

### Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/Auroratide/bpm-counter.git
   cd bpm-counter
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000`

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build locally

### Project Structure

- `index.html` - Main HTML file
- `src/main.ts` - TypeScript entry point
- `src/style.css` - Global styles
- `dist/` - Production build output (generated)

### Deployment

This project is configured for GitHub Pages deployment. The production build will be available in the `dist/` directory after running `npm run build`.
