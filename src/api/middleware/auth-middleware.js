const User = require('../users/users-model');
const { JWT_SECRET } = require('../../secrets')
const jwt = require('jsonwebtoken')

async function checkUsernameFree(req, res, next){
    try{
        const users = await User.findBy({ username: req.body.username })
        if (!users.length){
            next()
        }
        else {
            next({ message: 'username taken', status: 422 })
        }
    } catch(err) {
        next(err)
    }
}

 function checkCredentials(req, res, next){
    const { username, phoneNumber, password } = req.body
    if (!username || !phoneNumber || !password ){
        next({ message: 'username, phone number, and password required', status: 422 })
    } else {
        next()
    }
}

function checkLoginCredentials(req, res, next){
    const { username, password } = req.body
    if (!username || !password ){
        next({ message: 'username, phone number, and password required', status: 422 })
    } else {
        next()
    }
}

async function checkUsernameExists(req, res, next){
    try {
        const users = await User.findBy({ username: req.body.username })
        if (users.length){
            req.user = users[0]
            next()
        } else{
            next({ "message": "invalid entry", status: 401 })
        }
    } catch (err) {
        next(err)
    }
}

async function restricted(req, res, next){
    const token = req.headers.authorization
  
    if(!token){
      return next({ status: 401, message: 'token required'})
    }
  
    jwt.verify(token, JWT_SECRET, (err) => {
      if(err){
        next({ status: 401, message: 'token invalid'})
      } else {
        next()
      }
    })
}

async function validateUserId(req, res, next) {
    // DO YOUR MAGIC
    let { id } = req.params
    // let result = await Users.getById(id);
    // if(result == null){
    //   res.status(404).json({  message: 'This user could not be found'});
    // } else {
    //   req.user = result
    // }
  
    try {
      const user = await User.findById(id);
      if(!user){
        res.status(404).json({  message: 'user not found'});
      } else {
        req.user = user;
        next()
      } 
    }catch(err) {
      res.status(500).json({
        message: 'Problem finding user'
      })
    }
  }

module.exports = {
    checkUsernameFree,
    checkCredentials,
    checkUsernameExists,
    validateUserId,
    checkLoginCredentials,
    restricted
}