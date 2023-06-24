const router = require('express').Router();

const User = require('../models/User');
const bcrypt = require('bcrypt');

// Register API
router.post('/register', async(req,res)=>{
    try{
       //generate password  
       const salt = await bcrypt.genSalt(10)
       const hashedPassword = await bcrypt.hash(req.body.password,salt)

        // create new user
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        })

        const user = await newUser.save();

        res.status(200).json({
            "message": "Account Created Successfully!! Please verify your email",
            "user": user,
        })
    }
    catch(err){
        res.status(500).json(err.message);
        console.log(err)
    }
})


//  Login 


module.exports = router;