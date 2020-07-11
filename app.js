const express = require('express');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
const cookieSession = require('cookie-session');

const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const passportSetup = require('./config/passport-setup');
const keys = require('./config/keys');

//View Engine
app.set('view engine', 'ejs');

//connect to DB
mongoose.connect(
  keys.mongoDB.dbURI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
  () => {
    console.log('DB connected...');
  }
);

//cookie session
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000, //one day
    keys: [keys.session.cookieKey],
  })
);

//initialize passport session
app.use(passport.initialize());
app.use(passport.session());

//Routes
app.get('/', (req, res) => {
  res.render('home');
});

app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

//Server
app.listen(7000, () => console.log('Server started on port 7000...'));
