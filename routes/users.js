const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require("../models/User");


/* GET users listing. */
router.post('/register', function(req, res, next) {

  const {username, password } = req.body;
    bcrypt.hash(password, 10, function(err, hash) {
        const user = new User({
            username,
            password :hash
        });
        const promise = user.save();
        promise.then((data)=>{
            res.json(data);
        }).catch((err)=>{
            res.json(err);
        });
    });

});

module.exports = router;
