/*
 * Title: Program illustrating the use of https module
 * Description: The Keys are stored in ./https directory
 * Refer ./https/keyGeneration.txt file for creating the keys using openssl command
 * Self signed certificates are not accepted by browsers. You will have to accept the security risk
 * while testing using browser.
 * URL: https://localhost:3001
 * Note: Keys should not be published. Do not check-in into git repos
 */

// Dependencies
var http = require('http');
var https = require('https');
var fs = require('fs');

var config = {
  httpPort: 3000,
  httpsPort: 3001
};

// Instantiate the HTTP server
var httpServer = http.createServer(function (req, res) {
  unifiedServer(req, res);
});

// Start the HTTP server
httpServer.listen(config.httpPort, function () {
  console.log('The HTTP server is running on port ' + config.httpPort);
});

// Instantiate the HTTPS server
var httpsServerOptions = {
  'key': fs.readFileSync('./https/key.pem'),
  'cert': fs.readFileSync('./https/cert.pem')
};

var httpsServer = https.createServer(httpsServerOptions, function (req, res) {
  unifiedServer(req, res);
});

// Start the HTTPS server
httpsServer.listen(config.httpsPort, function () {
  console.log('The HTTPS server is running on port ' + config.httpsPort);
});

// All the server logic for both the http and https server
var unifiedServer = function (req, res) {
  console.log("Incoming request...");
  res.write("Hello World");
  res.end();
}
