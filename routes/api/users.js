const express = require('express')
const bcrypt = require('bcryptjs')
const router = express.Router();
const config = require('config');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose')
//Item model

const User = require('../../models/user')

// @route post api/users
//@desc Register new user
//@access Public

router.post('/', (req, res) => {
    const {name, email, password} = req.body;
    req.body.email = req.body.email.toLowerCase()
    if(!name || !email || !password) {
        res.status(400).json({msg: 'please enter all fields'})
    }
    User.findOne({email})
        .then(user => {
            if(user) return res.status(400).json({msg: 'user already registered'});
            const newUser = new User({
                name, 
                email,
                password
            })
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                //    if(err) throw err
                    newUser.password = hash
                    newUser.save() 
                        .then(user => {
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
        })
    })



module.exports = router;