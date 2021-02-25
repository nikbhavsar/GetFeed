const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

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

app.get('/', (req, res) => res.send('API Running'));

//Define Routes

app.use('/api/users', require('./routes/api/users'));

app.use('/api/auth', require('./routes/api/auth'));

app.use('/api/profile', require('./routes/api/profile'));

app.use('/api/category', require('./routes/api/category'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
