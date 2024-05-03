const path = require("path");
const fs = require("fs");
const http = require("http");
const url = require("url");

const server = http.createServer((req, res) => {
  const parseUrl = url.parse(req.url);

  let pathname = `.${parseUrl.pathname}`;
  if (pathname.charAt(pathname.length - 1) === "/") {
    pathname += "index.html";
  }

  let extname = path.extname(pathname);
  let contentType = "text/html";

  switch (extname) {
    case ".js":
      contentType = "text/javascript";
      break;
    case ".css":
      contentType = "text/css";
      break;
    case ".png":
      contentType = "image/png";
      break;
    case ".jpg":
      contentType = "image/jpg";
      break;
    case ".wav":
      contentType = "audio/wav";
      break;
    case ".json":
      contentType = "application/json";
      break;
  }

  fs.readFile(pathname, (err, data) => {
    if (err) {
      if (err.code == "ENOENT") {
        res.writeHead(404);
        res.end("File not found");
      } else {
        res.writeHead(500);
        res.end(`Internal server error ${err.code}`);
      }
    } else {
      res.writeHead(200, { "Content-type": contentType });
      res.end(data);
    }
  });
});

server.listen(3000, () => {
  console.log(`Server is listing at 3000`);
});
