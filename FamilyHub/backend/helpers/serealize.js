function serialize(user, done) {
  return done(null, user.id);
  // where is this user.id going? Are we supposed to access this anywhere?
}
module.exports = serialize;
