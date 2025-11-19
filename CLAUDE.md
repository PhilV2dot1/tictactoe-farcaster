# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **vanilla JavaScript Tic-Tac-Toe game** deployed as a Farcaster Frame mini-app on Celo blockchain. The entire application (HTML, CSS, JavaScript) is contained in a single file (`public/index.html`) with no build tools or frameworks. It supports both free play mode and on-chain mode where games are recorded on the Celo blockchain.

**Production URL:** https://tictactoe-farcaster.vercel.app

## Architecture

```
public/index.html              # Entire app - 1101 lines (HTML + CSS + JS)
public/manifest.json           # Farcaster manifest with accountAssociation
public/.well-known/farcaster.json  # Account association for Farcaster
api/frame.js                   # Vercel serverless function for Frame endpoint
vercel.json                    # Routing config for manifest files
```

**Key Architecture Points:**
- No build step - pure HTML/CSS/JS served directly
- Farcaster Frame SDK loaded via ESM import from CDN
- Ethers.js loaded via UMD bundle from CDN
- All game logic, AI, blockchain interaction in single script tag
- State management via single global `gameState` object

## Technology Stack

- **Farcaster Frame SDK:** v0.0.5 (imported from esm.sh)
- **Ethers.js:** v5.7.2 (UMD bundle from jsdelivr CDN)
- **Blockchain:** Celo Mainnet (Chain ID: 42220 / 0xa4ec)
- **Smart Contract:** 0xa9596b4a5A7F0E10A5666a3a5106c4F2C3838881
- **RPC:** https://forno.celo.org
- **Deployment:** Vercel with serverless functions

## Development Commands

```bash
# Local development
vercel dev
# App runs at http://localhost:3000

# Deploy (via Git push)
git push origin main
# Auto-deploys via Vercel GitHub integration
```

**Testing:**
- Frame Validator: https://warpcast.com/~/developers/frames
- Test in Warpcast mobile app for full Farcaster context
- Contract on Celo Explorer: https://explorer.celo.org/mainnet/address/0xa9596b4a5A7F0E10A5666a3a5106c4F2C3838881

## Critical Implementation Details

### 1. Farcaster SDK Initialization (CRITICAL!)

**Location:** Lines 414-436 in `public/index.html`

```javascript
import sdk from 'https://esm.sh/@farcaster/frame-sdk@0.0.5';

// MUST call ready() synchronously WITHOUT await
sdk.actions.ready({});

window.farcasterSDK = sdk;
window.farcasterReady = true;

// Context retrieved asynchronously (non-blocking)
sdk.context.then(context => {
    window.farcasterContext = context;
}).catch(e => {
    console.log('Not in Farcaster frame');
});
```

**Why this matters:** Awaiting `sdk.actions.ready()` causes the Farcaster splash screen to persist indefinitely with "Ready not called" error. The call must be synchronous, then context is retrieved separately via promise.

### 2. Multi-Wallet Connection System

**Location:** Lines 489-790 in `public/index.html`

The app supports multiple wallets with smart auto-detection:

**Supported Wallets:**
- Farcaster Wallet (native in Farcaster app)
- MetaMask
- Coinbase Wallet
- Rabby Wallet
- Trust Wallet
- Brave Wallet
- TokenPocket
- Generic Web3 wallets

**Connection Flow:**

1. **Auto-Detection** (`detectWallets()`): Detects all available wallet providers
   - Checks if running in Farcaster context (`window.farcasterSDK`)
   - Detects `window.ethereum` provider
   - Supports EIP-6963 for multiple providers (`window.ethereum.providers`)
   - Identifies wallet type (MetaMask, Coinbase, etc.)

2. **Priority System** (`getProviderPriority()`):
   - Farcaster Wallet: 100 (highest)
   - MetaMask: 80
   - Coinbase Wallet: 75
   - Rabby Wallet: 70
   - Trust Wallet: 65
   - Brave Wallet: 60
   - Generic Web3: 50

3. **Smart Selection** (`selectBestProvider()`):
   - In Farcaster context: Always auto-selects Farcaster wallet (no UI)
   - Outside Farcaster with single wallet: Auto-selects detected wallet
   - Outside Farcaster with multiple wallets: Shows wallet selector modal
   - Returns highest priority wallet or Promise if showing modal

4. **Wallet Selector UI** (Optional - shown only when needed):
   - Modal overlay with wallet options
   - Recommended badge on highest priority wallet
   - Wallet-specific icons
   - Close on overlay click or close button

5. **Connection** (`connectWallet()`):
   - Calls `selectBestProvider(true)` to allow manual selection
   - Awaits Promise if modal is shown
   - Requests accounts from selected provider
   - Creates Ethers.js provider
   - Switches to Celo network if needed
   - Connects to smart contract

**Key Implementation Points:**
- Uses `window.ethereum` directly (NOT `sdk.wallet.ethProvider`)
- In Farcaster, `window.ethereum` IS the Farcaster wallet
- Provider reference stored during connection for network switching
- Wallet name stored in `gameState.walletName` for UI display
- Dynamic wallet icon based on provider type

**Backward Compatibility:**
- Fully compatible with existing code
- No breaking changes to Farcaster functionality
- Falls back to simple connection if only one wallet detected

### 3. Smart Contract Integration

**Contract ABI** (simplified for tracking games):
```javascript
"function startGame() external"
"function endGame(uint8 result) external"  // 1=win, 2=lose, 3=draw
"function getPlayerStats(address) external view returns (uint256 gamesPlayed, uint256 wins, uint256 losses, uint256 draws, ...)"
"function totalGamesPlayed() external view returns (uint256)"
```

**On-Chain Game Flow:**
1. User clicks "Start Game" → calls `contract.startGame()` (writes to blockchain)
2. Wait for transaction confirmation
3. User plays game locally (AI opponent)
4. Game ends → calls `contract.endGame(resultCode)` (writes to blockchain)
5. Reload stats from `contract.getPlayerStats(address)`

**Gas Requirements:** Users need CELO for gas fees. App shows warning if balance < 0.01 CELO.

### 4. Game State Management

```javascript
let gameState = {
    mode: 'free' | 'chain',      // Free play or on-chain mode
    connected: false,             // Wallet connected?
    provider: null,               // Ethers.js provider
    contract: null,               // Contract instance
    address: null,                // User wallet address
    board: [0,0,0,0,0,0,0,0,0],  // 0=empty, 1=X(player), 2=O(AI)
    active: false,                // Game in progress?
    processing: false,            // Transaction pending? (prevents concurrent ops)
    gameStartedOnChain: false,    // On-chain game initiated?
    stats: { games, wins, losses, draws }  // Local stats (free mode)
};
```

**Processing Flag:** Critical for preventing concurrent blockchain transactions. Always check and set before async operations.

### 5. Farcaster Meta Tags (Required)

**Location:** Lines 8-30 in `public/index.html`

```html
<!-- Open Graph -->
<meta property="og:title" content="Tic Tac Toe on Celo" />
<meta property="og:image" content="https://tictactoe-farcaster.vercel.app/frame-preview.png" />

<!-- Farcaster Frame -->
<meta property="fc:frame" content="vNext" />
<meta property="fc:frame:image" content="https://tictactoe-farcaster.vercel.app/frame-preview.png" />
<meta property="fc:frame:image:aspect_ratio" content="1:1" />

<!-- Mini App Sharing -->
<meta name="fc:miniapp" content='{"version":"1","imageUrl":"...","button":{"title":"Play Tic Tac Toe","action":{"type":"launch_miniapp","url":"..."}}}' />

<!-- Manifest Link -->
<link rel="manifest" href="/.well-known/farcaster.json" />
```

### 6. Manifest Files

Two manifests exist:
- **`public/manifest.json`** - Static manifest (currently used)
- **`public/.well-known/farcaster.json`** - Account association manifest

Both must have identical content. Key fields:
```json
{
  "accountAssociation": {
    "header": "base64_encoded_jwt",
    "payload": "base64_encoded_domain",
    "signature": "base64_signature"
  },
  "frame": {
    "version": "1",
    "name": "Tic Tac Toe on Celo",
    "homeUrl": "https://tictactoe-farcaster.vercel.app",
    "buttonTitle": "Play Now",
    "splashBackgroundColor": "#FCFF52",
    "webhookUrl": "https://tictactoe-farcaster.vercel.app/api/frame"
  }
}
```

**Vercel Routing:** `vercel.json` rewrites `/.well-known/farcaster.json` to serve the file with correct CORS headers.

## Common Pitfalls (Based on Git History)

### SDK Initialization
**Problem:** Using `await sdk.actions.ready()` causes export errors and splash screen to persist
**Solution:** Call synchronously: `sdk.actions.ready();` (no await)
**Evidence:** Commits beca7cd, 3e63fc1

### Wallet Provider
**Problem:** Attempting to use `sdk.wallet.ethProvider` causes connection failures
**Solution:** Use `window.ethereum` directly - Farcaster injects it automatically
**Evidence:** Commits 3e63fc1, ac01ec3, a626017

### Contract Address
**Old Contract:** 0xD92BcD223Aa2A9818CbeB853b1d2beAa9eaf3008 (had funds/betting)
**New Contract:** 0xa9596b4a5A7F0E10A5666a3a5106c4F2C3838881 (simple tracking only)
**Evidence:** Commit dbe71bc - "New simple contract"

### Share Functionality
**Evolution:** Multiple iterations to get sharing working correctly
**Current:** Copies to clipboard in Farcaster, opens Warpcast composer in standalone
**Evidence:** Commits c196ada, f3963cb, b3c1d38

### Transaction State
**Problem:** Games started but not finished on-chain leave orphaned state
**Solution:** `gameStartedOnChain` flag tracks whether `startGame()` was called
**Code:** Lines 676, 835-841

## Key Design Patterns

### State Management
- Single global `gameState` object
- Manual DOM updates (no reactivity)
- `processing` flag prevents concurrent operations
- Button disable states during async operations

### Error Handling
- Try/catch blocks with user-friendly messages
- Console logging for debugging
- Fallback behaviors (e.g., clipboard → composer for sharing)

### AI Opponent Logic
```javascript
// Priority: 1. Try to win, 2. Block player, 3. Take center, 4. Take corner, 5. Take any
// Lines 732-772 in index.html
```

### Network Switching
```javascript
// Auto-detect and switch to Celo Mainnet
// If switch fails with 4902 error, add the network
// Lines 575-596 in index.html
```

## Share Functionality

**In Farcaster Frame:**
- Copies text + URL to clipboard
- Shows: "Text copied! Open composer to paste and share"
- User manually pastes into Farcaster composer
- The `fc:miniapp` meta tag creates a clickable card

**In Standalone:**
- Opens `https://warpcast.com/~/compose?text=...&embeds[]=...`
- Pre-fills composer with stats and link

## Color Scheme
```css
Primary (Celo Green): #35D07F
Secondary (Purple): #8B5CF6
Background (Celo Yellow): #FCFF52
Text: #1A1A1A
Win: #4CAF50
Lose: #FF5252
```

## Testing Checklist

When making changes, test:
1. **Farcaster frame context** (Warpcast mobile app)
2. **Standalone mode** (direct browser access)
3. **Wallet connection flow** (both approved and rejected)
4. **Network switching** (start on non-Celo network)
5. **Free play mode** (local stats persistence)
6. **On-chain mode** (with CELO balance)
7. **Share functionality** (in both contexts)
8. **AI opponent behavior** (wins, blocks, random)

## Important URLs

- **Production:** https://tictactoe-farcaster.vercel.app
- **Frame Validator:** https://warpcast.com/~/developers/frames
- **Celo Explorer:** https://explorer.celo.org/mainnet
- **Celo Forno RPC:** https://forno.celo.org
- **Contract:** https://explorer.celo.org/mainnet/address/0xa9596b4a5A7F0E10A5666a3a5106c4F2C3838881
