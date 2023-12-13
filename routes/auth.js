const express = require('express')
const router = express.Router()
const app = express();
const User = require('../models/User')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
const JWT_SEC = process.env.JWT_SEC

// JWT_SEC = {JWT_SEC}

app.use(express.json());

//Route : 1 ==>  creat a User : with this api => /api/auth/signup
router.post('/signup', async (req, res) => {
    let success = false
    try {
        
        let user = User(req.body)
        let x = await User.findOne({ email : req.body.email })
        if (x) {
            return res.send({success , massage : "user already axist by this email id"})
        }
        // console.log(user.passWord)

        // hasing password
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(req.body.passWord, salt);

        //Creating a Token 
        const data = {
            user: {
                id: user.id
            }
        }
        var token = jwt.sign(data, JWT_SEC);
        success = true

        //Creating a New User 
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            passWord: hash
        })

        await user.save()
        
        success = true
        // await res.send(user);
        res.send({success , token})
    } catch (error) {
        console.error(error);
        return res.status(500).json({success, message: 'Internal Server Error' });
    }

})


//Route: 2 ==>  Creat a login page : with this api => /api/auth/login
router.post('/login', async (req, res) => {

    
    try {
        let success = false

        //Chacking Email
        
        // let user = User(email)
        
        const { email, passWord } = req.body;

        //Chacking the user is exisit
        let user = await User.findOne({email})
        if(!user){
            success = false
            res.send({success , massage : "Please enter the currect email"})
            return
        }
        
        //comper password with existing database user
        const passwordCompere = bcrypt.compareSync(passWord, user.passWord)
        if(!passwordCompere){
            success = false
            res.send({success ,massage : "Please enter the currect email"})
        }
        const data = {
            user: {
                id: user.id
            }
        }
        var token = jwt.sign(data, JWT_SEC);
        success = true
        res.json({success,token})
        
        // res.json({nice : "nice"})

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
})

//Route: 3 ==> get user data by authenticet token with this api => /api/auth/getuser

router.post('/getuser', fetchuser , async (req, res) => {

    try {
        let userId = req.user.id
        const user = await User.findById(userId).select("-passWord")
        res.send(user)
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
})


module.exports = router 