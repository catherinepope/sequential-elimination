# Journal Topic Selector

A Vue-based tool that helps you choose the best topic for your next article using a systematic sequential elimination process.

## Overview

The Journal Topic Selector uses a three-phase approach to help you objectively evaluate and narrow down potential writing topics:

1. **Input Phase**: Enter all potential topics you're considering
2. **Rating Phase**: Rate each topic on five key criteria (1-10 scale):
   - **Expertise**: Your level of knowledge about the topic
   - **Available Material**: Accessibility of research and supporting information
   - **Relevance**: Current importance and audience interest
   - **Originality**: Uniqueness and fresh perspective
   - **Timescale**: Ability to complete project
3. **Results Phase**: View your top topics after eliminating the bottom 50% by total score

## Features

- Clean, intuitive interface with gradient design
- Add/remove topics dynamically
- Systematic rating system across five key criteria
- Automatic scoring and ranking
- Sequential elimination of lower-scoring topics
- Visual feedback showing kept vs. eliminated topics
- Next steps guidance for selected topics
- Reset functionality to start over

## Technology Stack

- Vue 3
- Tailwind CSS
- Vite

## Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/catherinepope/sequential-elimination.git
   cd sequential-elimination
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

## Building for Production

To create a production build:

```bash
npm run build
```

This creates an optimized production build in the `dist` folder.

## Deployment

### Netlify

This app is configured for Netlify deployment with the included `netlify.toml` file:

- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **Node version**: 18

Simply connect your GitHub repository to Netlify for automatic deployments on every push.

## How to Use

1. **Enter Topics**: Start by listing all potential topics you're considering for your article
2. **Rate Each Topic**: Evaluate each topic on the five criteria using a 1-10 scale
3. **Review Results**: The tool automatically eliminates the bottom 50% and shows you the top-ranked topics
4. **Make Your Decision**: Use the ranked results and suggested next steps to choose your final topic

## License

MIT
