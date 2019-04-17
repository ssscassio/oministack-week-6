const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

// Creates a express application
const app = express();

// Enable Cross Origin Resource Sharing (CORS) for all origins
app.use(cors());

// Create a http server (https://nodejs.org/api/http.html#http_class_http_server)
const server = require('http').Server(app);
// Bind http server to socket (https://socket.io/docs/server-api/#Server)
const io = require('socket.io')(server);

// Register a handler to the connection with client event
// Ref: https://socket.io/docs/server-api/#Event-%E2%80%98connection%E2%80%99
io.on('connection', socket => {
  // Register a handler to the connectRoom event at the client
  // Ref: https://socket.io/docs/server-api/#socket-on-eventName-callback
  socket.on('connectRoom', box => {
    // Add the client to the box's socket room
    socket.join(box);
  });
});

// Define Mongodb server Uri. TODO: Use process.env to remove credentials from code
const uri =
  'mongodb+srv://oministack:oministack@cluster0-1kwmk.mongodb.net/test?retryWrites=true';

// Connect to mongodb Atlas cloud service
mongoose.connect(uri, { useNewUrlParser: true });

/*--------------- Middleware --------------*/
// Add to `req` the io connection with the client
app.use((req, res, next) => {
  req.io = io;
  return next();
});
// Parse incoming requests with Json payloads
app.use(express.json());
// Parse incoming requests with urlencoded payloads
app.use(express.urlencoded({ extended: true }));
// Add path to resolve files
app.use('/files', express.static(path.resolve(__dirname, '..', 'temp')));
// End points
app.use(require('./routes'));

// Start server
server.listen(process.env.PORT || 3333);
