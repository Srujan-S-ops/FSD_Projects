const http = require('http');

const users = [{ id: 1, name: 'Asha' }];

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'GET' && url.pathname === '/users') {
    res.writeHead(200);
    return res.end(JSON.stringify(users));
  }

  if (req.method === 'POST' && url.pathname === '/users') {
    let body = '';
    for await (const chunk of req) body += chunk;

    try {
      const user = { id: users.length + 1, ...JSON.parse(body) };
      users.push(user);
      res.writeHead(201);
      return res.end(JSON.stringify(user));
    } catch {
      res.writeHead(400);
      return res.end(JSON.stringify({ error: 'Invalid JSON' }));
    }
  }

if (url.pathname === '/') {
    res.writeHead(200);
    return res.end('Welcome to User API');
}

  res.writeHead(404);
  res.end(JSON.stringify({ error: 'Not found' }));
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});