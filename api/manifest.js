// api/manifest.js - Génère le manifest dynamiquement
export default function handler(req, res) {
  const manifest = {
    accountAssociation: {
      header: "eyJmaWQiOjQ5MTM1MCwidHlwZSI6ImF1dGgiLCJrZXkiOiIweGYxOTM1NmFEQmZiMjcwZDc5MmIwZkExMjBlNzQ0RTQ3OTI2QTA2ZDAifQ",
      payload: "eyJkb21haW4iOiJ0aWN0YWN0b2UtZmFyY2FzdGVyLnZlcmNlbC5hcHAifQ",
      signature: "zFnACQ0gQhrO5W0fXKaOZrZLm+nA3bbRaTggccsFGvpa3Adz+jk1bj92ykervVFI4JzJ8O+ibG/G4CcynA9c7xw="
    },
    frame: {
      version: "next",
      name: "Tic Tac Toe",
      iconUrl: "https://tictactoe-farcaster.vercel.app/icon.png",
      homeUrl: "https://tictactoe-farcaster.vercel.app",
      imageUrl: "https://tictactoe-farcaster.vercel.app/frame-preview.png",
      buttonTitle: "Play Now",
      splashImageUrl: "https://tictactoe-farcaster.vercel.app/frame-preview.png",
      splashBackgroundColor: "#FCFF52",
      webhookUrl: "https://tictactoe-farcaster.vercel.app/api/frame"
    }
  };

  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'public, max-age=300');
  res.status(200).json(manifest);
}