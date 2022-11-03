const usersRouter = require('express').Router();
const users = require('../resources/users');

usersRouter.get('/', (req, res) => {
  res.json(users);
});

// not needed
/*usersRouter.post('/', (req, res) => {
  const { username, password } = req.body;

  if (!password || password.length < 3) {
    return res.status(400).json({
      error: 'invalid password',
    });
  }

  const existingUser = users.find((u) => u.username === username);
  if (existingUser) {
    return res.status(400).json({
      error: 'username is already in use',
    });
  }

  const user = {
    username: username,
    password: password,
  };

  users = users.concat(user);

  res.status(201).json(user);
});*/

module.exports = usersRouter;
