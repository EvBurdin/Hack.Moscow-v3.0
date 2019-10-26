const { User } = require('../../../models/Index');

function dismissProtectedFields(user) {
  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    fullName: user.fullName,
    photo: user.photo,
    email: user.email,
    group: user.group,
    username: user.username,
  };
}
module.exports = {
  async userRegister(req, res) {
    console.log('registering user');
    const { username, password } = req.body;
    // const newUser =  User.create({ username });
    User.register(username, password, (e) => {
      if (e) {
        res.status(409);
        res.send('false');
      } else {
        console.log(`user ${req.user} registered!`);
        res.send('true');
      }
    });
  },
  async userLogin(req, res) {
    console.log(`User ${req.user.username} loged in`);
    res.json(dismissProtectedFields(req.user));
  },
  async getCurrentUser(req, res) {
    let { user } = req;
    const families = await user.getFamilys({
      joinTableAttributes: [],
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });
    user = dismissProtectedFields(user);
    user.Families = families;
    res.json(user);
  },
  async userLogout(req, res) {
    req.logout();
    req.session.destroy();
    res.send('false');
  },
};
