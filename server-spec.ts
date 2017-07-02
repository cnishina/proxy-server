import * as path from 'path';
import * as request from 'request';

/**
 * Downloads the binary with the request options. If the response returns with
 * a 200 status code, stop the request and resolve the spec as done. If the
 * connection results in something other than a 200 status code, stop the
 * request and resolve the spec as a failure.
 * 
 * @param requestOptions - options for the request.
 * @param specDone - jasmine done
 */
let makeRequest = (requestOptions, specDone) => {
  let req = request(requestOptions as request.CoreOptions & request.RequiredUriUrl).on('response', (response) => {
    if (response.statusCode !== 200) {
      req.end();
      specDone.fail('did not get http status code of 200');
    } else {
      req.end();
      specDone();
    }
  });
}

/**
 * Extends the request core options type to allow for proxy key
 */
export interface Options extends request.CoreOptions {
  proxy: any;
  rejectUnauthorized: boolean;
  [key: string]: any;
}

describe('test proxy server', () => {
  let proxy = 'http://127.0.0.1:8080';
  let options: Options = {
    method: 'GET',
    followRedirect: true,
    timeout: 10000,
    maxRedirects: 50,
    proxy: proxy,
    strictSSL: false,
    rejectUnauthorized: false
  };

  // describe('for selenium standalone server', () => {
  //   beforeEach(() => {    
  //     options['url'] = 'https://selenium-release.storage.googleapis.com/2.53/selenium-server-standalone-2.53.1.jar';
  //   });

  //   it('should download the binary', done => {
  //     makeRequest(options, done);
  //   });
  // });

  // describe('for chromedriver', () => {
  //   beforeEach(() => {
  //     options['url'] = 'https://chromedriver.storage.googleapis.com/2.29/chromedriver_mac64.zip';
  //   });

  //   it('should download the binary', done => {
  //     makeRequest(options, done);
  //   });
  // });
  
  describe('for geckodriver', () => {
    beforeEach(() => {
      options['url'] = 'http://github.com/mozilla/geckodriver/releases/download/v0.16.1/geckodriver-v0.16.1-macos.tar.gz'
    });

    it('should download the binary', done => {
      makeRequest(options, done);
    });
  });
});






// attempt with http
// var req = http.request({
//   host: 'localhost',
//   port: '8000',
//   path: '/2.53/selenium-server-standalone-2.53.1.jar',
//   method: 'GET',
//   headers: {
//     host: 'selenium-release.storage.googleapis.com'
//   }
//   // agent: agent
//   // ,
//   // followRedirect: true
// }, (resp) => {
//   console.log(resp);
//   resp.setEncoding('utf8');
//   resp.on('data', (chunk) => {
//     console.log('response: ' + chunk);
//   });
// });
//
// req.end();
// 