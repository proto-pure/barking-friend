import { createServer } from 'http';
import { get } from 'https';

/**
 * A simple server that proxies all requests further to `https://dog.ceo`
 */
const server = createServer((req, res) => {
  get(`https://dog.ceo${req.url}`, resp => {
    let body = [];
    console.log(req.url);
    const contentType = req.url?.includes('/api/')
      ? 'application/json'
      : 'text/html';

    resp
      .on('data', chunk => {
        body.push(chunk);
      })
      .on('end', () => {
        res.statusCode = 200;
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Content-Type', contentType);

        body = Buffer.concat(body).toString();
        res.end(body);
      });
  });
});

server.listen(8080, () => console.log('Server is running on port 8080'));
