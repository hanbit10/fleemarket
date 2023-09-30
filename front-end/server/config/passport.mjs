import passportLocal from 'passport-local';
const LocalStrategy = passportLocal.Strategy;
import bcrypt from 'bcryptjs';

import User from '../api/models/user.model.mjs'


const customFields = {
    usernameField: 'email', 
    passwordField: 'password', 
};

const verifyCallback = async (email, password, done) => {
  // Match user
  await User.findOne({
    email: email
  }).then(user => {
    if (!user) {
      return done(null, false, { message: 'That email is not registered' });
    }

    // Match password
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) throw err;

      if (isMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Password incorrect' });
      }
    });
  });
}

// LocalStrategy(PassportJS)
const strategy = new LocalStrategy(customFields, verifyCallback);


export default function (passport) {
  passport.use(strategy);

  // After success of login store the user information into session 
  passport.serializeUser((user, done) => {
    process.nextTick(() => {
      return done(null, user);
    })
  });

  // Deserialize user info through the info from session
  passport.deserializeUser((userId, done) => {
    User.findById(userId)
        .then((user) => {
          done(null, user);
        })
        .catch(err => done(err))
  });
};

