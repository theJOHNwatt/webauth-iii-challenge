const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); 

const Users = require('../users/users-model.js');
const { validateUser } = require('../users/users-helpers.js');

router.post('/register', (req, res) => {

})

router.post('/login', (req, res) => {

})

function getJwtToken(username) {
    const payload = {
        username,
        role
    };

    const secret = process.env.JWT_SECRET || 'supersupersecret';

    const options ={
        expiresIn: '1d'
    };
    
    return jwt.sign(paylod, secret, options);
}


module.exports = router;
