// This file doesn't go through babel or webpack transformation.
// Make sure the syntax and sources this file requires are compatible with the current node version you are running
// See https://github.com/zeit/next.js/issues/1245 for discussions on Universal Webpack or universal Babel
const { createServer } = require("http");
const { parse } = require("url");
const express = require("express");
const { join } = require("path");
const next = require("next");

const routes = require("./router.module");

const PORT = process.env.PORT ? process.env.PORT : 7000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = routes.getRequestHandler(app);

const { exec } = require("child_process");

const testPerformance = process.argv[2] === "test";

app.prepare().then(() => {
  const server = express();
  server.get("/service-worker.js", (req, res) => {
    app.serveStatic(
      req,
      res,
      join(process.env.PWD, ".next/static", "/service-worker.js")
    );
  });
  server.get("*", (req, res) => {
    return handle(req, res);
  });
  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${PORT}`);
    if (testPerformance) {
      console.log("testing performace");
      exec("yarn performance", (error, stdout, stderr) => {
        if (error) {
          console.log(`error: ${error.message}`);
        }
        if (stderr) {
          console.log(`stderr: ${stderr}`);
        }
        console.log(`stdout: ${stdout}`);
        process.exit(0);
      });
    }
  });
});
