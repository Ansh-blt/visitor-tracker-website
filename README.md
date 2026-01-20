# 🎯 Visitor Tracker Website

A cool React + TypeScript website that tracks visitors and ranks them on a leaderboard, plus suggests interesting external websites to explore.

## Features

- **Visitor Tracking**: Automatically tracks and counts visits for each user
- **Leaderboard**: Ranks visitors by visit count with cool icons and stats
- **External Links**: Curated collection of interesting websites organized by category
- **Responsive Design**: Works great on desktop and mobile
- **Local Storage**: Persists visitor data between sessions

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## How It Works

- First-time visitors enter their name to join the leaderboard
- Each visit increments their visit count
- Visitors are ranked by total visits with trophy icons for top 3
- External links section provides curated websites filtered by category
- All data is stored locally in the browser

## Tech Stack

- React 18
- TypeScript
- CSS3 with gradients and animations
- Local Storage for persistence

## Project Structure

```
src/
├── components/          # React components
│   ├── VisitorForm.tsx  # Name input form
│   ├── Leaderboard.tsx  # Visitor rankings
│   └── ExternalLinks.tsx # External website links
├── types/               # TypeScript interfaces
├── utils/               # Storage utilities
├── data/                # Static data (external links)
└── App.tsx              # Main application
```

Enjoy tracking your visitors! 🚀