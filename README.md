# Wafedeen Championship Live Scoring System

A real-time leaderboard system built with Next.js, polling data from a Google Apps Script backend.

## Features

- **Live Leaderboards**: Tracks top countries and players with real-time updates.
- **Easy Backend**: Powered by a simple Google Apps Script.
- **Animations**: Smooth reordering animations using Framer Motion.
- **Responsive UI**: "TV-first" design that adapts to mobile.

## Setup Instructions

### 1. Google Sheets & Script Setup

1. Open your Google Sheet.
2. Go to **Extensions** > **Apps Script**.
3. Clear any existing code and paste the content of `scripts/Code.gs` (found in this repo).
4. Click **Deploy** (blue button top right) > **New deployment**.
5. **Select type**: Web app.
6. **Description**: "v1".
7. **Execute as**: Me.
8. **Who has access**: **Anyone** (Important: This allows the website to read the data).
9. Click **Deploy**.
10. Copy the **Web App URL** (it ends in `/exec`).

### 2. Sheet Structure

Ensure your Google Sheet has the following tabs:

- **CleanData**:
  - Columns: `player_name`, `country`, `game`, `result`, `points` (optional, calculated if missing).
  - Logic: Win (+1), Tie (0), Lose (-1).
- **Countries**:
  - Columns: `country`, `flag` (URL or Emoji).

### 3. Frontend Configuration

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Paste your Web App URL:

```env
NEXT_PUBLIC_APPS_SCRIPT_URL=https://script.google.com/macros/s/.../exec
```

### 4. Run Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000/leaderboard](http://localhost:3000/leaderboard).

## Deployment (Vercel)

1. Push to GitHub.
2. Import project in Vercel.
3. Add `NEXT_PUBLIC_APPS_SCRIPT_URL` in Vercel Settings.

## Stack

- **Framework**: Next.js 14+ (App Router)
- **Styling**: TailwindCSS
- **Animations**: Framer Motion
- **Backend**: Google Apps Script
