const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Creates a express application
const app = express();

// Enable Cross Origin Resource Sharing (CORS) for all origins
app.use(cors());

// Create a http server (https://nodejs.org/api/http.html#http_class_http_server)
const server = require('http').Server(app);

// Define Mongodb server Uri. TODO: Use process.env to remove credentials from code
const uri =
  'mongodb+srv://oministack:oministack@cluster0-1kwmk.mongodb.net/test?retryWrites=true';

// Connect to mongodb Atlas cloud service
mongoose.connect(uri, { useNewUrlParser: true });

/*--------------- Middleware --------------*/
// Parse incoming requests with Json payloads
app.use(express.json());
// Parse incoming requests with urlencoded payloads
app.use(express.urlencoded({ extended: true }));

// End points
app.use(require('./routes'));

// Start server
server.listen(process.env.PORT || 3333);
