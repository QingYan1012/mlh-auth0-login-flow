// Minimal static file server for the Auth0 login demo.
// Serves ./public on http://localhost:3000 (Node standard library only, no dependencies).
const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;
const PUBLIC_DIR = path.join(__dirname, "public");

const CONTENT_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
};

const server = http.createServer((req, res) => {
  const urlPath = decodeURIComponent(req.url.split("?")[0]);
  let filePath = path.join(PUBLIC_DIR, urlPath === "/" ? "index.html" : urlPath);

  // SPA fallback: unknown paths serve index.html
  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    filePath = path.join(PUBLIC_DIR, "index.html");
  }

  const ext = path.extname(filePath);
  res.writeHead(200, { "Content-Type": CONTENT_TYPES[ext] || "application/octet-stream" });
  fs.createReadStream(filePath).pipe(res);
});

server.listen(PORT, () => {
  console.log(`Auth0 login demo running at http://localhost:${PORT}`);
  console.log("Press Ctrl+C to stop.");
});
