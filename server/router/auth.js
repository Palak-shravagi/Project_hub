const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
require('../db/conn');
const User = require('../models/userSchema');
const bcrypt = require('bcryptjs');

router.get('/', (req, res) => {
    res.send(`hello world from router js`);
});

router.post('/register', (req, res) => {
    const { name, username, email, phone, college, password, cpassword } = req.body;

    if (!name || !username || !email || !phone || !college || !password || !cpassword) {
        return res.json({ error: "plf fill the details properly :" })
    }

    User.findOne({ email: email })
        .then((userExist) => {
            if (userExist) {
                return res.status(422).json({ error: "email already exist" });
            }
            const user = new User({ name, username, email, phone, college, password, cpassword })

            user.save().then(() => {
                res.status(201).json({ message: "user registred" });
            }).catch((err) => res.status(500).json({ error: "failed to registred..." }));

        }).catch(err => { console.log(err) });
});


//login route

router.post('/login', async(req, res) => {
    console.log(req.body);
    let token;
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "please fill the required data.." });
        }

        const userLogin = await User.findOne({ email: email });

        if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password);

            token = await userLogin.generateAuthToken();
            console.log(token);
            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 275489859),
                httpOnly: true
            });


            if (!isMatch) {
                res.status(400).json({ error: "user error" });
            } else {
                res.json({ message: "user signin successfully.." });
            }
        } else {
            res.status(400).json({ error: "invalid credential" });
        }


    } catch (err) {

    }

})


module.exports = router;