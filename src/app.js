const express = require("express");
const http = require("http");
const middleware = require("./middleware/index");
require("dotenv/config");

const app = express();

// allows cross-origin requests
middleware.useCors(app);

// For json parsing
middleware.useBodyParser(app);

// for logging purposes
middleware.useMorgan(app);

// setting headers
middleware.setHeaders(app);

// connect to mongo database
middleware.mongoConnection();

// Graphql Setup
middleware.setUpGraphql(app);

const server = http.createServer(app);

setImmediate(() => {
  server.listen(8081, () => {
    console.log("Listening on port 8081");
  });
});
