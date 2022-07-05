const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../../models/User');


//get all users;
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    res.send(users);
  } catch (err) {
    res.status(500).send(err);
    console.log(err);
  }
});

// Create User;
router.post('/', async (req, res) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      favoriteFood: req.body.favoriteFood,
    });
    res.status(201).send(newUser);
  } catch (err) {
    res.status(500).send(err);
    console.log(err);
  }
});

//User Login;
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ 
      where: { 
        email: req.body.email 
      } 
    });
    const user = data.get({ plain: true });

    if (user) {
      const validPassword = await bcrypt.compare(req.body.password, user.password);
      // console.log('valid password: ', validPassword);
      if (validPassword) {
        req.session.save(() => {
        req.session.user_id = userData.id;
        req.status(201).send('Login Successful');
      })
      } else {
        res.json({ message: 'Incorrect password' });
      }
    } else {
      res.json({ message: 'Incorrect email' });
    }
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

//log out user, end session;
router.post('/logout', (req, res) => {
  req.session.destroy();
  res.json({ message: 'user has logged out' });
  console.log(req.session);
});

module.exports = router;