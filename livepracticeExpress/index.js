import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const FILE_DIR = path.join(__dirname, 'public');

console.log("FILE_DIR:", FILE_DIR);

app.get("/images", (req, res) => {
  res.send(`<ul>
    <li>Download <a href="/download/hut.jpg">Hut Image</a>.</li>
    <li>Download <a href="/download/lake.jpg">Lake Image</a>.</li>
    <li>Download <a href="/download/nature.jpg">Nature Image</a>.</li>
  </ul>`);
});


app.get("/download/:imgName", (req, res, next) => {
  const { imgName } = req.params;
  res.download(path.join(FILE_DIR, imgName), (err) => {
    if (err) {
      if (err.status !== 404) return next(err);
      res.status(404).send("Can't find that file, sorry!");
    }
  });
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
