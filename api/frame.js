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
        <meta property="fc:frame:button:1" content="🎮 Play Game" />
        <meta property="fc:frame:button:1:action" content="launch_frame" />
        <meta property="fc:frame:button:1:target" content="${baseUrl}" />
      </head>
      <body>
        <h1>Tic Tac Toe on Celo</h1>
        <p>Click the button above to start playing!</p>
      </body>
    </html>
  `;

  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 'public, max-age=300, s-maxage=300');
  res.status(200).send(html);
}