function auth(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(403);
    res.end();
  }
}
module.exports = auth;
