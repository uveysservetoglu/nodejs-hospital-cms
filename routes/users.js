const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");

/* GET users listing. */
router.post('/register', (req, res) => {
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

router.post('/login', (req, res)=>{

    const {username, password} = req.body;

    User.findOne({
        username
    }, (err, user)=>{

       if(err)
           throw err;

       if(!user){
           res.json({
               status: false,
               message: "Böyle Bir kullanıcı bulunamadı."
           });
       }else{
           bcrypt.compare(password, user.password).then((result)=>{

               if(!result){
                   res.json({
                       status: false,
                       message: "Girdiğiniz şifre hatalı."
                   });
               }else{

                   const payload = {
                       username
                   };

                   const token = jwt.sign(
                           payload,
                           req.app.get("api_secret_key"),
                           { expiresIn : 720 }
                       );

                   res.json({
                       status: true,
                       token
                   });
               }
           });
       }

    });

});

module.exports = router;
