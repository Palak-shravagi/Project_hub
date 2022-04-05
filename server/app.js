const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
require('./db/conn');
app.use(express.json());
constUser = require('./models/userSchema');

app.use(require('./router/auth'));

//middleware
const middleware = (req, res, next) => {
    console.log("hello middleware");
    next();
};

const DB = process.env.DATABASE;
const PORT = process.env.PORT;

mongoose.connect(DB).then(() => {
    console.log("DB Connected");
}).catch((err) => console.log(err));


app.get('/', (req, res) => {
    res.send(`hello world`);
});

app.get('/about', middleware, (req, res) => {
    console.log(`hello middleware from about`);
    res.send(`hello world from about`);
});

app.get('/contact', (req, res) => {
    res.send(`hello world from contact`);
});

app.get('/login', (req, res) => {
    res.send(`hello world from login`);
});

// app.get('/register', (req, res) => {
//     res.send(`hello world register`);
// });

app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
});