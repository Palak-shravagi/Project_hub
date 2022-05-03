const express = require('express');
const jwt = require('jsonwebtoken');
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const router = express.Router();
require('../db/conn');
const User = require('../models/userSchema');
const bcrypt = require('bcryptjs');
const authenticate = require("../middleware/authenticate");


// File Uploads
const Upload = require("../upload");
const path = require("path");

//AWS CONFIGURATIONS

// const { uploadFile } = require("../s3");
// const { getFileStream } = require("../s3");
// const fs = require("fs");
// const util = require("util");
// const unlinkFile = util.promisify(fs.unlink);
// var AWS = require('aws-sdk');


router.use(cookieParser());
router.use(express.static(__dirname + "public/"));


router.get('/', (req, res) => {
    res.send(`hello world `);
});


router.get('/LoginHome', authenticate, (req, res) => {
    console.log("login succesfully .... this is home page ");
    res.send(req.rootUser);
});

router.post('/register', async(req, res) => {
    console.log(req.body);

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
    console.log("inside login route....");
    let token;
    try {
        const { email, password } = req.body;
        console.log("inside login route if block");
        if (!email || !password) {
            console.log("inside login route if block");
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
                console.log("user error");
            } else {
                console.log("user login successfully");
                res.json({ message: "user signin successfully.." });
            }
        } else {
            res.status(400).json({ error: "invalid credential" });
            console.log("invalid credentials");
        }

    } catch (err) {
        console.log(err);
    }

})


// router.post("/resumeUpload", Upload.single("pdf"), async(req, res, next) => {
//     try {
//         console.log(req.file);
//         const stuId = "req.userID";
//         const result = await uploadFile(req.file, stuId);
//         console.log("S3 response", result);

//         fs.unlink(path.join(req.file.path), (err) => {
//             if (err) throw err;
//             console.log("file deleted from server");
//         });

//         const filter = {
//             _id: stuId,
//         };
//         stuId = stuId + path.extname(file.originalname);
//         const update = {
//             resume: stuId,
//         };
//         const user = await Student.findOneAndUpdate(filter, update);

//         res.send({
//             status: "success",
//             message: "File uploaded successfully",
//             data: req.file,
//         });
//     } catch (err) {
//         console.log(err);
//     }
// });


module.exports = router;