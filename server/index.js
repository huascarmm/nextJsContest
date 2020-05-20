// This file doesn't go through babel or webpack transformation.
// Make sure the syntax and sources this file requires are compatible with the current node version you are running
// See https://github.com/zeit/next.js/issues/1245 for discussions on Universal Webpack or universal Babel
const { createServer } = require('http');
const { parse } = require('url');
const express = require('express')
const { join } = require('path');
const next = require('next');

const routes = require('./router.module')

const PORT = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = routes.getRequestHandler(app)

app.prepare().then(() => {
	const server = express();
	server.get('/service-worker.js', (req, res) => {
		app.serveStatic(req, res, join(process.env.PWD, '.next/static', '/service-worker.js'));
	});
	server.get('*', (req, res) => {
		return handle(req, res)
	})
	server.listen(PORT, err => {
		if (err) throw err
		console.log(`> Ready on http://localhost:${PORT}`)
	})
});
