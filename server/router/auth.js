const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
require('../db/conn');
const User = require('../models/userSchema');
const bcrypt = require('bcryptjs');

router.get('/', (req, res) => {
    res.send(`hello world from router js`);
});

// router.post('/register', (req, res) => {
//     console.log(req.body);
//     console.log("hii")
//     const { name, username, email, phone, college, password, cpassword } = req.body;

//     if (!name || !username || !email || !phone || !college || !password || !cpassword) {
//         return res.json({ error: "plz fill the details properly :" })
//     }

//     User.findOne({ email: email })
//         .then((userExist) => {
//             if (userExist) {
//                 return res.status(422).json({ error: "email already exist" });
//             }
//             const user = new User({ name, username, email, phone, college, password, cpassword })

//             user.save().then(() => {

//             }).catch((err) => res.status(500).json({ error: "failed to registred..." }));

//         }).catch(err => { console.log(err) });
// });


router.post('/addinformation', async(req, res) => {
    console.log(req.body);
  //  console.log("hii")

    const title = req.body.title;
    const department = req.body.department;
    const domain = req.body.domain;
    const lang = req.body.lang;
    const academicYear = req.body.academicYear;
    const files = req.body.files;
    const guideName = req.body.guideName;

    if (!title ||
        !department ||
        !domain ||
        !lang ||
        !academicYear ||
        !files ||
        !guideName ) {
        console.log("Wrong ");
        return res.json({ error: "plz fill the details properly :" })
    }
    console.log(username);
    try {
        const fileD = new File({
            title:title,
            department:department,
            domain:domain,
            lang:lang,
            academicYear:academicYear,
            files:files,
            guideName :guideName
         });
        
        const success = await fileD.save();
        
        if (success) {
            console.log("data uploaded");
            return res.status(201).json({ message: "data uploaded successfully" });
        } else {
            return res.status(422).json({ message: "Error occured" });
        }
    } catch (err) {
        console.log(err);
    }
});





router.post('/register', async(req, res) => {
    console.log(req.body);
    console.log("hii")

    const name = req.body.name;
    const username = req.body.username;
    const email = req.body.email;
    const phone = req.body.phone;
    const college = req.body.college;
    const password = req.body.password;
    const cpassword = req.body.cpassword;

    if (!name || !username || !email || !phone || !college || !password || !cpassword) {
        console.log("Wrong ");
        return res.json({ error: "plz fill the details properly :" })
    }
    console.log(username);
    try {
        const user = await User.findOne({ email: email });
        if (user) {
            console.log("user found\n");
            return res.status(422).json({ error: "email already exist" });
        } else {
            console.log("NOT FOUND");
        }

        const userD = new User({ name: name, username: username, email: email, phone: phone, college: college, password: password, cpassword: cpassword });
        const success = await userD.save();
        if (success) {
            console.log("Successssss");
            return res.status(201).json({ message: "user registred" });
        } else {
            return res.status(422).json({ message: "Error occured" });
        }
    } catch (err) {
        console.log(err);
    }
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