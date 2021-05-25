const User = require('../models/User')
const router = require('express').Router();
const bcrypt =require('bcrypt')

//Register
router.post('/register', async (req,res) => {
    
    try{
        //gen new password
        //create new user
        console.log("users file start")
        console.log(req.body.name)
        console.log(req.body.email)

        const newUser = new User(
            {
                Username : req.body.name,
                email : req.body.email,
                password : req.body.password,
            }
        )

        //save user and respond
        const user = await newUser.save()
        console.log("users file run")
        res.status(200).json("User details saved")
    }
    catch(e){
        console.log("users file run error")
        console.log(e)
        res.status(500).json(e);
    }
})

//Login
router.post('/login',async(req,res) => {

    try{

        //find user in db
            const user = await User.findOne({Username: req.body.username})
            console.log(user)
            !user && res.status(400).json("wrong pass or id")

        // validate password
            const validPassword = await req.body.password===user.password            
            !validPassword && res.status(400).json("wrong pass or id")

        //send response
        res.status(200).json({_id :user.id ,Username : user.Username})

    }
    catch(e){
        res.status(500).json(e)}

})



module.exports = router;