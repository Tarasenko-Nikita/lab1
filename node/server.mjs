import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = http.createServer((req, res) => {
	const parsed_url = new URL(req.url, `http://${req.headers.host}`);
	const pathname = parsed_url.pathname;
	let file_path;
	let contentType;
	let status;
	if (pathname === '/') {
		file_path = path.join(__dirname, 'public', 'index.html');
		contentType = 'text/html; charset=utf-8';
		status = 200;
	} else if (pathname === '/about') {
		file_path = path.join(__dirname, 'public', 'about.html');
		contentType = 'text/html; charset=utf-8';
		status = 200;
	} else if (pathname === '/styles.css') {
		file_path = path.join(__dirname, 'public', 'styles.css');
		contentType = 'text/css; charset=utf-8';
		status = 200;
	} else {
		file_path = path.join(__dirname, 'public', '404.html');
		status = 404;
		contentType = 'text/html; charset=utf-8';
	}
	fs.readFile(file_path, 'utf-8', (err, content) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end('404 Not Found');
        } else {
            res.writeHead(status, { 'Content-Type': contentType });
            res.end(content);
        }
    });
});
	
	const port = 3001;
	server.listen(port, () => {
		console.log('Сервер запущено');
	});