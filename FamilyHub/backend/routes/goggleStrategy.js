const User = require('../models/User');
function afterGoogleAth(accessToken, refreshToken, profile, done) {
  return User.findOrCreate({ googleId: profile.id }, (err, user) => done(err, user));
}
