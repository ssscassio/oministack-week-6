const express = require('express');
const cors = require('cors');

// Creates a express application
const app = express();

// Enable Cross Origin Resource Sharing (CORS) for all origins
app.use(cors());

// Create a http server (https://nodejs.org/api/http.html#http_class_http_server)
const server = require('http').Server(app);

/*--------------- Middlewares --------------*/
// Parse incoming requests with Json payloads
app.use(express.json());
// Parse incoming requests with urlencoded payloads
app.use(express.urlencoded({ extended: true }));

// End points
app.use(require('./routes'));

// Start server
server.listen(process.env.PORT || 3333);
