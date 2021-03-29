const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var cors = require('cors');
const jwt = require('jsonwebtoken');
const config = require('./config/keys');
const PORT = process.env.PORT || 5000;
const app = express();
var http = require('http').Server(app);
const options = {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    allowedHeaders: ['query'],
    credentials: true,
  },
};
const io = require('socket.io')(http, options);

app.use(cors());

// Bodyparser middleware
app.use(bodyParser.json({ limit: '50mb' }));
app.use(
  bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
    parameterLimit: 50000,
  })
);

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('MongoDB successfully connected'))
  .catch((err) => console.log(err));

//SocketIo
let connectedUsers = [];
io.use(async (socket, next) => {
  try {
    const token = socket.handshake.query.token;
    const decoded = jwt.verify(token, config.jwtSecreat);
    socket.userId = decoded.user.id;
    next();
  } catch (err) {}
});

io.on('connection', (socket) => {
  console.log('Connected: ' + socket.userId);
  if (!connectedUsers.includes(socket.userId))
    connectedUsers.push(socket.userId);

  console.log(connectedUsers);

  socket.on('login', () => {
    socket.emit('userStatus', { users: connectedUsers });
    socket.broadcast.emit('userStatus', { users: connectedUsers });
  });
  socket.on('logout', () => {
    console.log('Disconnected: ' + socket.userId);
    connectedUsers = connectedUsers.filter((item) => item !== socket.userId);
    socket.emit('userStatus', { users: connectedUsers });
    socket.broadcast.emit('userStatus', { users: connectedUsers });
  });
  socket.on('disconnect', () => {
    console.log('Disconnected: ' + socket.userId);
    connectedUsers = connectedUsers.filter((item) => item !== socket.userId);
    console.log(connectedUsers);
    socket.emit('userStatus', { users: connectedUsers });
    socket.broadcast.emit('userStatus', { users: connectedUsers });
  });
});

app.get('/', (req, res) => res.send('API Running'));

//Define Routes

app.use('/api/users', require('./routes/api/users'));

app.use('/api/auth', require('./routes/api/auth'));

app.use('/api/profile', require('./routes/api/profile'));

app.use('/api/category', require('./routes/api/category'));

app.use('/api/polls', require('./routes/api/poll'));

http.listen(PORT, () => console.log(`Server started on port ${PORT}`));
