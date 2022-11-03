const loginRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const { SECRET } = require('../utils/config');
const users = require('../resources/users');

loginRouter.post('/', (req, res) => {
  const { username, password } = req.body;

  const user = users.find((u) => u.username === username);

  if (!(user && user.password === password)) {
    return res.status(401).json({
      error: 'invalid username or password',
    });
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  };

  const token = jwt.sign(userForToken, SECRET);

  res.status(200).send({ token, username: user.username });
});

module.exports = loginRouter;
