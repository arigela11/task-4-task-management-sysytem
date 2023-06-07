const express = require('express')
const bcrypt = require('bcryptjs')
const router = express.Router();
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth')
//Item model

const User = require('../../models/user')

// @route post api/auth
//@desc authenticate user
//@access Public

router.post('/', (req, res) => {
    const {email, password} = req.body;
    if(!email || !password) {
        res.status(400).json({msg: 'please enter all fields'})
    }
    User.findOne({email})
        .then(user => {
            if(!user) return res.status(400).json({msg: 'user does not exist'});
                bcrypt.compare(password, user.password)
                    .then(isMatch => {
                        if(!isMatch) return res.status(400).json({msg: 'invalid credientials'})
                        jwt.sign(
                            {id: user.id},
                            config.get('jwtSecret'),
                           {expiresIn: 3600},
                           (err, token) => {
                               if(err) throw err;
                               res.json({
                                token,
                                user: {
                                    id: user.id,
                                    name: user.name,
                                    email: user.email
                                }
                            }) 
                           } 
                        )
                    })
            })
    })

// @route get api/user
//@desc get user data
//@access Public

router.get('/user', auth, (req, res) => {
    User.findById(req.user.id)
        .select('-password')
        .then(user => res.json(user));
})

module.exports = router;