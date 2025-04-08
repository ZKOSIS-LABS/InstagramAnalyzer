const express = require("express");
const cors = require("cors");
const SocialBlade = require("socialblade");

const app = express();
const port = 5000;

const client = new SocialBlade(
  "cli_836aa07e443369674ef1381a",
  "d7f075ce44559769185d5980ad149c6c9efd163d76e933d1b925f9ec3a6f5316"
);

app.use(cors());

app.get("/api/instagram/:username", async (req, res) => {
  const username = req.params.username;
  try {
    const user = await client.instagram.user(username);
    res.json({ data: user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(
    `Proxy server running at https://instagramanalyzer-production.up.railway.app:${port}`
  );
});
