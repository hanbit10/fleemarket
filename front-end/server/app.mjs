import dotenv from 'dotenv';
dotenv.config();
const { MONGODB_URI } = process.env;
import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
import MongoStore from 'connect-mongo';
import userRoutes from './api/routes/user.mjs'
import productCardRoutes from './api/routes/productCard.mjs';


const app = express();

// parse requests of content-type - json/urlencoded
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Passport config
import passportconfig from './config/passport.mjs';
passportconfig(passport);

// Set Express Session
app.use(session({
  secret: 'everycent secret',
  resave: true,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: MONGODB_URI, 
    collectionName: 'sessions'
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 3  // 3hours
  }
}));

// Passport initialize
app.use(passport.initialize());
app.use(passport.session());

// Set Logging (print the request log on console)
app.use(morgan('tiny'));

// set CORS
app.use(cors());


// Login -  If login success, the value of 'req.isAuthenticated' = true'
app.post('/login', passport.authenticate('local', {failureRedirect: '/loginFail'}),
  (req, res) => {
    res.json({ loggedIn: true, user: req.user });
  });

// Logout - If logout success, the value of 'req.isAuthenticated' = 'false'
app.post('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err)  { res.send(err); return next(err); }
    res.json({ loggedOut: !err });
  });
});

// Routes which should handle requests
app.use('/user', userRoutes);
app.use('/card', productCardRoutes);


app.get('/', (req, res) => {
  res.send('Home');
});

// If login fail, redirected to this url (loggedIn: false)
app.get('/loginFail', (req, res) => {
  res.json({ loggedIn: false });
})

// Error handling
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});


export default app;
