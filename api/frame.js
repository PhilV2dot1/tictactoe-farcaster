export default function handler(req, res) {
  const baseUrl = `https://${req.headers.host}`;
  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="${baseUrl}/og.png" />
        <meta property="fc:frame:button:1" content="Play" />
        <meta property="fc:frame:button:1:action" content="link" />
        <meta property="fc:frame:button:1:target" content="${baseUrl}" />
      </head>
      <body><h1>Redirecting...</h1></body>
    </html>
  `);
}