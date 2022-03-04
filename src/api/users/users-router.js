const router = require('express').Router();
const { JWT_SECRET } = require('../../secrets');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('./users-model');
const { checkCredentials, checkLoginCredentials, checkUsernameExists, checkUsernameFree, validateUserId } = require('../middleware/auth-middleware');

router.post('/register', checkCredentials, checkUsernameFree, (req, res, next) => {
    const { username, phoneNumber, password } = req.body;
    const hash = bcrypt.hashSync(password, 8);
    User.add({ username, phoneNumber, password: hash })
        .then(newUser => {
            res.status(201).json(newUser)
        }).catch(next)
    
})

router.post('/login', checkLoginCredentials, checkUsernameExists, (req, res, next) => {
  
    if (bcrypt.compareSync(req.body.password, req.user.password)){
      const token = buildToken(req.user)
      res.json({
        message: `welcome, ${req.user.username}`,
        token
      });
    } else {
      next({ status: 401, message: 'invalid credentials'})
    }
  });
  
  router.get('/:id', validateUserId, (req, res, next) => {
      let { id } = req.params;
      User.findById(id)
        .then(user => {
            res.json(user)
        }).catch(next)
  })

  router.put('/:id', validateUserId, checkCredentials, (req, res, next) => {
    // RETURN THE FRESHLY UPDATED USER OBJECT
    // this needs a middleware to verify user id
    // and another middleware to check that the request body is valid
    let { id } = req.params;
    User.update(id, req.body)
      .then(updatedUser => {
        res.json(updatedUser)
      }).catch(next)
  });
  
  
  function buildToken(user){
    const payload = {
      subject: user.id,
      username: user.username
    }
    const options = {
      expiresIn: '1d',
    }
    return jwt.sign(payload, JWT_SECRET, options)
  }
  

module.exports = router;