const loginRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const { SECRET } = require('../utils/config');
const users = require('../resources/users');

loginRouter.post('/', (req, res) => {
  const { username, password } = req.body;

  const user = users.find((u) => u.uid === username);

  if (!(user && user.password === password)) {
    return res.status(401).json({
      error: 'invalid username or password',
    });
  }

  const userForToken = {
    username: user.uid,
    id: user.uid,
  };

  const token = jwt.sign(userForToken, SECRET);

  res.status(200).send({ token, username: user.uid });
});

module.exports = loginRouter;
