import * as httpProxy from 'http-proxy';
import * as http from 'http';

const seleniumProxy = httpProxy.createProxyServer({
  target: 'https://selenium-release.storage.googleapis.com'
});

const chromeProxy = httpProxy.createProxyServer({
  target: 'https://chromedriver.storage.googleapis.com'
});

const githubApiProxy = httpProxy.createProxyServer({
  target: 'https://api.github.com'
});
const githubProxy = httpProxy.createProxyServer({
  target: 'https://github.com'
});

const proxy = http.createServer((request, response) => {
  let header = request.headers['host'];
  console.log(header);
  if (header.startsWith('selenium')) {
    seleniumProxy.web(request, response);
  } else if (header.startsWith('chromedriver')) {
    chromeProxy.web(request, response);
  } else if (header.startsWith('api.github')) {
    githubApiProxy.web(request, response);
  } else if (header.startsWith('github.com')) {
    githubProxy.web(request, response);
  } else if (header.match('amazonaws.com')) {
    let amazonProxy = httpProxy.createProxyServer({
      ssl: false,
      secure: false,
      target: header
    });
  }
});
proxy.listen(8080);
