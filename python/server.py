from http.server import HTTPServer, BaseHTTPRequestHandler
from urllib.parse import urlparse
from pathlib import Path

class MyServer(BaseHTTPRequestHandler):
    def do_GET(self):
        path = urlparse(self.path).path
        if path == "/":
            file_path = Path("public/index.html")
            status = 200
            content_type = "text/html; charset=utf-8"
        elif path == "/about":
            file_path = Path("public/about.html")
            status = 200
            content_type = "text/html; charset=utf-8"
        elif path == "/styles.css":
            file_path = Path("public/styles.css")
            status = 200
            content_type = "text/css; charset=utf-8"
        else:
            file_path = Path("public/404.html")
            status = 404
            content_type = "text/html; charset=utf-8"
        
        content = file_path.read_text(encoding="utf-8")
        self.send_response(status)
        self.send_header("Content-Type", content_type)
        self.end_headers()
        self.wfile.write(content.encode("utf-8"))
        
if __name__ == "__main__":
    server_address = ("", 3002)
    httpd = HTTPServer(server_address, MyServer)
    print("Сервер запущено")
    httpd.serve_forever()