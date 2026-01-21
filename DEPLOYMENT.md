# Wafedeen Championship Live Scoring System

A real-time leaderboard application for tracking championship scores with live updates from Google Sheets.

## 🚀 Quick Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/YOUR_REPO)

### Prerequisites

1. **Google Apps Script Setup** (Backend):
   - Open your Google Sheet
   - Go to **Extensions → Apps Script**
   - Copy the code from `scripts/Code.gs`
   - Deploy as **Web App**:
     - Click **Deploy → New Deployment**
     - Type: **Web App**
     - Who has access: **Anyone**
   - Copy the deployment URL (ends with `/exec`)

2. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)

### Deployment Steps

#### Option 1: Deploy via Vercel Dashboard

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```

2. **Import to Vercel**:
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your repository
   - Configure environment variables:
     - `NEXT_PUBLIC_APPS_SCRIPT_URL`: Your Apps Script URL

3. **Deploy**: Click "Deploy" and wait for build to complete

#### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Add environment variable
vercel env add NEXT_PUBLIC_APPS_SCRIPT_URL production
# Paste your Apps Script URL when prompted

# Deploy to production
vercel --prod
```

### Environment Variables

Set the following environment variable in Vercel:

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_APPS_SCRIPT_URL` | Google Apps Script Web App URL | `https://script.google.com/.../exec` |

**To add in Vercel Dashboard**:
1. Go to your project
2. Settings → Environment Variables
3. Add `NEXT_PUBLIC_APPS_SCRIPT_URL`
4. Paste your Apps Script URL
5. Select "Production", "Preview", and "Development"
6. Save

### Google Sheet Structure

Your Google Sheets should have these tabs:

1. **Countries** (with columns):
   - `Country` - Country name
   - `Score` - Total score
   - `Flag` - Emoji flag

2. **Player LB** (with columns):
   - `Name` - Player name
   - `Country` - Player's country
   - `Score` - Player score

3. **Form Responses 1** (optional, for raw data):
   - `Timestamp`
   - `Player Name`
   - `Country`
   - `Result` (Win/Lose/Tie)

### Local Development

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Edit .env.local and add your Apps Script URL

# Run development server
npm run dev
```

Open [http://localhost:3000/leaderboard](http://localhost:3000/leaderboard)

### Tech Stack

- **Frontend**: Next.js 16 (App Router), React, TailwindCSS
- **Animation**: Framer Motion
- **Data Fetching**: SWR (real-time polling every 2s)
- **Backend**: Google Apps Script
- **Deployment**: Vercel

### Features

- ✅ Real-time score updates (2-second polling)
- ✅ Responsive design
- ✅ Animated leaderboard transitions
- ✅ Country and player rankings
- ✅ Flag display support
- ✅ Error handling with user feedback

### Troubleshooting

**"Connection Error" on deployed site**:
1. Verify Apps Script URL is correct in Vercel environment variables
2. Ensure Apps Script is deployed with "Anyone" access
3. Check Apps Script logs for errors
4. Redeploy Vercel after changing environment variables

**Build fails on Vercel**:
1. Check build logs in Vercel dashboard
2. Ensure all dependencies are in `package.json`
3. Verify Node.js version compatibility

**Data not updating**:
1. Check that your Google Sheet has the correct tab names
2. Verify column headers match expected names
3. Test the Apps Script URL directly in your browser

### Support

For issues, check:
- Vercel deployment logs
- Google Apps Script execution logs
- Browser console for frontend errors

## License

MIT
