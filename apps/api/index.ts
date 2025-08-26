import http from 'http';

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello from API!');
});

server.listen(8080, () => {
  console.log('API server running at http://localhost:8080');
});
