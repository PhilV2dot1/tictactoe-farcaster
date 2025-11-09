export default function handler(req, res) {
  const baseUrl = `https://${req.headers.host}`;
  
  // Handle POST requests (Frame button clicks)
  if (req.method === 'POST') {
    const { untrustedData } = req.body;
    const buttonIndex = untrustedData?.buttonIndex || 1;
    
    return res.status(200).send(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <meta property="fc:frame" content="vNext" />
          <meta property="fc:frame:image" content="${baseUrl}/frame-preview.png" />
          <meta property="fc:frame:image:aspect_ratio" content="1.91:1" />
          <meta property="fc:frame:button:1" content="🎮 Launch Game" />
          <meta property="fc:frame:button:1:action" content="link" />
          <meta property="fc:frame:button:1:target" content="${baseUrl}" />
        </head>
        <body>
          <h1>Tic Tac Toe on Celo</h1>
        </body>
      </html>
    `);
  }

  // Handle GET requests (Initial Frame load)
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Tic Tac Toe - Play on Celo</title>
        
        <!-- Open Graph -->
        <meta property="og:title" content="Tic Tac Toe on Celo" />
        <meta property="og:description" content="Play Tic Tac Toe on-chain! Free mode or compete on the blockchain leaderboard." />
        <meta property="og:image" content="${baseUrl}/frame-preview.png" />
        <meta property="og:url" content="${baseUrl}" />
        <meta property="og:type" content="website" />
        
        <!-- Twitter Card -->
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Tic Tac Toe on Celo" />
        <meta name="twitter:description" content="Play Tic Tac Toe on-chain! Free or On-Chain mode." />
        <meta name="twitter:image" content="${baseUrl}/frame-preview.png" />
        
        <!-- Farcaster Frame -->
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="${baseUrl}/frame-preview.png" />
        <meta property="fc:frame:image:aspect_ratio" content="1.91:1" />
        <meta property="fc:frame:post_url" content="${baseUrl}/api/frame" />
        
        <!-- Frame Buttons -->
        <meta property="fc:frame:button:1" content="🎯 Free Play" />
        <meta property="fc:frame:button:1:action" content="link" />
        <meta property="fc:frame:button:1:target" content="${baseUrl}" />
        
        <meta property="fc:frame:button:2" content="⛓️ On-Chain" />
        <meta property="fc:frame:button:2:action" content="link" />
        <meta property="fc:frame:button:2:target" content="${baseUrl}" />
        
        <meta property="fc:frame:button:3" content="🏆 Leaderboard" />
        <meta property="fc:frame:button:3:action" content="link" />
        <meta property="fc:frame:button:3:target" content="${baseUrl}" />
        
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            background: linear-gradient(135deg, #FCFF52 0%, #FFE55C 100%);
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            color: #1A1A1A;
            padding: 20px;
          }
          .container {
            text-align: center;
            max-width: 600px;
            background: rgba(255,255,255,0.95);
            padding: 40px;
            border-radius: 20px;
            box-shadow: 0 8px 32px rgba(0,0,0,0.1);
          }
          h1 {
            font-size: 3em;
            margin-bottom: 10px;
            color: #35D07F;
          }
          p {
            font-size: 1.2em;
            margin-bottom: 30px;
            color: #4A4A4A;
          }
          .spinner {
            border: 4px solid rgba(53, 208, 127, 0.3);
            border-top: 4px solid #35D07F;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            animation: spin 1s linear infinite;
            margin: 20px auto;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          .btn {
            display: inline-block;
            padding: 15px 30px;
            background: linear-gradient(135deg, #35D07F 0%, #2AB56F 100%);
            color: white;
            text-decoration: none;
            border-radius: 10px;
            font-weight: bold;
            margin: 10px;
            transition: transform 0.2s;
            box-shadow: 0 4px 12px rgba(53, 208, 127, 0.3);
          }
          .btn:hover {
            transform: scale(1.05);
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>🎮 Tic Tac Toe</h1>
          <p>Play on Celo Blockchain</p>
          <div class="spinner"></div>
          <p>Redirecting to game...</p>
          <a href="${baseUrl}" class="btn">Click here if not redirected</a>
        </div>
        <script>
          setTimeout(() => {
            window.location.href = '${baseUrl}';
          }, 2000);
        </script>
      </body>
    </html>
  `;

  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 'public, max-age=300, s-maxage=300');
  res.status(200).send(html);
}