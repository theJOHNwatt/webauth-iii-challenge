const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); 

const Users = require('../users/users-model.js');
const { validateUser } = require('../users/users-helpers.js');



router.post('/register', (req, res) => {
    let userInfo = req.body;
    const validateResult = validateUser(userInfo);

    if (validateResult.isSuccessful === true) {
        const hash = bcrypt.hashSync(userInfo.password, 12);
        userInfo.password = hash;
        
        Users.add(userInfo)
            .then(added => {
                res.status(201).json(`Added ${userInfo.username}`)
            })
            .catch(err => {
                res.status(500).json(err)
            });
    } else {
        res.status(400).json({
            message: 'Invalid information, see errors for details',
            errors: validateResults.errors
        });
    }
});


router.post('/login', (req, res) => {
    let { username, password } = req.body;

    Users.findBy({ username })
        .first()
        .then(log => {
            if (log && bcrypt.compareSync(password, log.password)) {

                const token = getJwtToken(log.username);

                res.status(200).json({
                    message: `Welcome ${log.username}! have a token...`,
                    token
        });
            } else {
                res.status(401).json({ message: 'Invalid Credentials' });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(error);
        });
    });


function getJwtToken(username) {
    const payload = {
        username,
        role: 'student' 
    };  
    const secret = process.env.JWT_SECRET || 'is it secret, is it safe?';   
    const options = {
        expiresIn: '1d'
    };  
    return jwt.sign(payload, secret, options);
}

module.exports = router;
