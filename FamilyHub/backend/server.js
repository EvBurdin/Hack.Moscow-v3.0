// require('./workers/Worker.js');

const express = require('express');
const redis = require('redis');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);

const client = redis.createClient();
require('dotenv').config();
const cookieParser = require('cookie-parser');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const cors = require('cors');
const fileUpload = require('express-fileupload');
const db = require('./models/Index');
// const sequelize = require('./dbSettings/sequelize');
const serializeUser = require('./helpers/serealize.js');
const deserializeUser = require('./helpers/deserialize.js');
const forceSchemaUpdate = require('./seeders/forceSchemaUpdate');
require('pretty-error').start();

const app = express();
const apiRouter = require('./routes/api/api');

app.use(
  fileUpload({
    createParentPath: true,
  }),
);

const corsOptions = {
  origin: 'http://localhost:8080',
  credentials: true,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(
  session({
    store: new RedisStore({ client }),
    secret: 'Insert randomized text here',
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 86400000,
    },
  }),
);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.clientId,
      clientSecret: process.env.clientSecret,
      callbackURL: 'http://134.209.82.36.nip.io:3000/auth/google/callback',
      realm: 'http://134.209.82.36.nip.io:3000',
      scope: ['profile', 'email'],
    },
    (accessToken, refreshToken, profile, done) => {
      // User.findOrCreate(profile, accessToken, refreshToken, (err, user) => done(err, user));
      db.User.findOrCreate({
        defaults: {
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          photo: profile.photos[0].value,
        },
        where: { username: profile.emails[0].value },
      }).then(([user]) => {
        const err = '';
        done(err, user);
      });
    },
  ),
);
passport.use(db.User.createStrategy());

app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
  console.log(res.req.cookies['connect.sid']);
  res.redirect(`https://auth.expo.io/@yok558/family-hub?cookies=${encodeURI(res.req.cookies['connect.sid'])}`);
});
passport.serializeUser(serializeUser);

// used to deserialize the user
passport.deserializeUser(deserializeUser);
db.sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    forceSchemaUpdate(db);
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

app.use('/api', apiRouter);

module.exports = app;
