# 🎮 Tic Tac Toe - Farcaster Frame on Celo

A fully functional Tic Tac Toe game deployed as a Farcaster Frame, powered by Celo blockchain.

## ✨ Features

- 🎯 **Free Play Mode** - Play instantly without a wallet
- ⛓️ **On-Chain Mode** - Compete on the blockchain leaderboard
- 📊 **Statistics Tracking** - Track your wins, losses, and streaks
- 🏆 **Leaderboard** - See top players on Celo
- 📱 **Mobile Optimized** - Perfect for Warpcast mobile app
- 🎨 **Modern UI** - Beautiful dark theme with animations

## 🚀 Live Demo

**Game URL**: [Your Vercel URL]
**Frame URL**: [Your Vercel URL]/api/frame

## 🏗️ Tech Stack

- **Frontend**: Pure HTML/CSS/JavaScript
- **Blockchain**: Celo Network
- **Web3**: Ethers.js v5
- **Deployment**: Vercel
- **Frame Protocol**: Farcaster Frames v2

## 📋 Prerequisites

- Node.js 18 or higher
- Git
- Vercel account (free)
- GitHub account
- Farcaster account (Warpcast)

## 🛠️ Local Development

1. Clone the repository:
```bash
git clone https://github.com/yourusername/tictactoe-farcaster.git
cd tictactoe-farcaster
```

2. Install dependencies:
```bash
npm install
```

3. Install Vercel CLI:
```bash
npm install -g vercel
```

4. Run development server:
```bash
vercel dev
```

5. Open http://localhost:3000 in your browser

## 📦 Project Structure

```
tictactoe-farcaster/
├── public/
│   ├── index.html          # Main game interface
│   └── og-image.png        # Open Graph image (1200x1200)
├── api/
│   └── frame.js            # Farcaster Frame handler
├── package.json            # NPM configuration
├── vercel.json             # Vercel deployment config
├── .gitignore             # Git ignore file
└── README.md              # This file
```

## 🚢 Deployment

### Deploy to Vercel

1. Push your code to GitHub:
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. Go to [Vercel Dashboard](https://vercel.com/dashboard)

3. Click "Add New..." → "Project"

4. Import your GitHub repository

5. Configure:
   - **Framework Preset**: Other
   - **Root Directory**: ./
   - **Build Command**: (leave empty)
   - **Output Directory**: public

6. Click "Deploy"

7. Your app will be live at: `https://your-project.vercel.app`

### Post-Deployment

1. Test your Frame at: https://warpcast.com/~/developers/frames

2. Create a cast on Warpcast with your URL

3. Share with the community!

## 🎭 Farcaster Frame Setup

The Frame will automatically work when you share your URL on Farcaster. It includes:

- **Open Graph image** - Shows game preview
- **Frame buttons** - Play Free, Play On-Chain, Leaderboard
- **Meta tags** - Proper Farcaster Frame v2 implementation

### Test Your Frame

1. Go to [Frame Validator](https://warpcast.com/~/developers/frames)
2. Enter your URL: `https://your-project.vercel.app/api/frame`
3. Check that all meta tags are correct
4. Test button interactions

## 🎮 Smart Contract

The game uses a deployed smart contract on Celo:

**Contract Address**: `0xD92BcD223Aa2A9818CbeB853b1d2beAa9eaf3008`

**Network**: Celo Mainnet (Chain ID: 42220)

**Features**:
- Start game
- Make moves
- Track statistics
- Global leaderboard
- No gas fees for reading data

## 📱 Usage

### Free Play Mode
1. Click "Start Game"
2. Click cells to place X
3. AI will automatically play O
4. Stats saved locally

### On-Chain Mode
1. Click "On-Chain" tab
2. Connect your wallet (MetaMask, Coinbase Wallet)
3. Switch to Celo network (automatic)
4. Click "Start Game" (requires transaction)
5. Play and compete on the leaderboard!

## 🔧 Configuration

### Change Contract Address

Edit `public/index.html`:

```javascript
const CONTRACT_ADDRESS = "YOUR_CONTRACT_ADDRESS";
```

### Change Network

Edit the chain configuration in `public/index.html`:

```javascript
const CELO_MAINNET_CHAIN_ID = "0xa4ec"; // Celo Mainnet
const CELO_RPC_URL = "https://forno.celo.org";
```

### Customize Frame Image

Replace `public/og-image.png` with your own:
- Dimensions: 1200x1200px (1:1 ratio)
- Format: PNG or JPG
- Max size: 10MB (but aim for <1MB)

## 🎨 Customization

### Colors

Edit CSS variables in `public/index.html`:

```css
:root {
    --primary: #8A63D2;
    --secondary: #4CAF50;
    --bg-dark: #1A1625;
    /* ... more colors */
}
```

### Game Board Size

Adjust the board container in CSS:

```css
.board-container {
    max-width: 380px; /* Change this */
}
```

## 🐛 Troubleshooting

### Frame not showing on Farcaster
- Check Frame Validator for errors
- Ensure og-image.png is accessible
- Verify meta tags in api/frame.js

### Wallet connection issues
- Check you're on Celo network
- Try different wallet (MetaMask, Coinbase Wallet)
- Check browser console for errors

### Stats not loading
- Verify contract address is correct
- Check Celo RPC is responding
- Test with Frame Validator

## 📊 Analytics

To add analytics, insert tracking code in `public/index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>

<!-- Or Plausible -->
<script defer data-domain="yourdomain.com" src="https://plausible.io/js/script.js"></script>
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [Farcaster](https://www.farcaster.xyz/) - For the Frame protocol
- [Celo](https://celo.org/) - For the blockchain infrastructure
- [Vercel](https://vercel.com/) - For hosting
- [Ethers.js](https://docs.ethers.io/) - For Web3 integration

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/tictactoe-farcaster/issues)
- **Farcaster**: [@yourusername](https://warpcast.com/yourusername)
- **Twitter**: [@yourusername](https://twitter.com/yourusername)

## 🔗 Links

- **Live App**: [Your Vercel URL]
- **Frame**: [Your Vercel URL]/api/frame
- **Contract Explorer**: [Celo Explorer](https://explorer.celo.org/mainnet/address/0xD92BcD223Aa2A9818CbeB853b1d2beAa9eaf3008)
- **Farcaster Channel**: [Your Channel]

---

Made with ❤️ for the Farcaster & Celo communities

**Play, Compete, Win! 🎮🏆**