# Interactive Resume

A modern, interactive resume built with React, Framer Motion, and Tailwind CSS. This project creates an immersive scrolling experience where users walk through a parallax landscape while viewing resume content.

## Features

- **Interactive Parallax Scrolling**: Multi-layer parallax background with animated character walking
- **Smooth Animations**: Powered by Framer Motion for fluid transitions and motion
- **Responsive Design**: Built with Tailwind CSS for mobile-first responsive design
- **Dynamic Content Panels**: Content updates as you progress through the experience
- **Modern Stack**: React + Vite for fast development and optimized builds

## Technology Stack

- **React 18**: Modern React with hooks and functional components
- **Framer Motion**: Advanced animation library for React
- **Tailwind CSS**: Utility-first CSS framework
- **Vite**: Fast build tool and development server
- **PostCSS**: CSS processing with autoprefixer

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone or download this project
2. Navigate to the project directory
3. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Building for Production

Build the project:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Project Structure

```
├── public/                 # Static assets
│   ├── images/            # Image assets
│   └── RESUME_*.pdf       # Resume PDF files
├── src/
│   ├── App.jsx            # Main interactive resume component
│   ├── main.jsx           # React app entry point
│   └── index.css          # Global styles with Tailwind
├── package.json           # Dependencies and scripts
├── vite.config.js         # Vite configuration
├── tailwind.config.js     # Tailwind CSS configuration
└── postcss.config.js      # PostCSS configuration
```

## Customization

### Adding Your Content

1. **Profile Information**: Edit the `SECTIONS` array in `src/App.jsx`
2. **Images**: Add your images to `public/images/` and `public/images/portfolio/`
3. **Resume PDF**: Add your resume as `public/RESUME_suwaphit.pdf`
4. **Styling**: Modify colors and styling in the component or Tailwind config

### Asset Requirements

- **Profile Picture**: `public/images/profile-pic.jpg`
- **Portfolio Images**: `public/images/portfolio/*.jpg`
- **Resume PDF**: `public/RESUME_suwaphit.pdf`

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Browser Support

This project uses modern JavaScript features and CSS. Supported browsers:

- Chrome/Edge 88+
- Firefox 78+
- Safari 14+

## License

This project is open source and available under the MIT License.

## Development Notes

- The project includes development-only test components that show in development mode
- All animations are optimized for performance using Framer Motion
- The design is fully responsive and works on mobile devices
- Scroll-based animations are implemented using `useScroll` and `useTransform`
