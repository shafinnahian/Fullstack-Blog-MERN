const express = require('express');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const app = express();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const salt = bcrypt.genSaltSync(10);
const saltJSON = 'asdl;kfjsdf';

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));    // need to include credentials bypass -> check LoginPage login()
app.use(express.json());
ap.use(cookieParser());

mongoose.connect('mongodb+srv://shafinnahian:kJLGNSh0Bk6D1WOm@cluster0.gw3qxyb.mongodb.net/?retryWrites=true&w=majority');

app.post('/register', async (req, res) => {
    const {username, password} = req.body;
    try{
        const userDoc = await User.create({
            username,
            password: bcrypt.hashSync(password, salt),
        });
        res.json(userDoc);
    } catch(e){
        console.log(e);
        res.status(400).json(e);
    }
});

app.post('/login', async (req, res) => {
    const {username, password} = req.body;
    const userDoc = await User.findOne({username});
    const passOk =  bcrypt.compareSync(password, userDoc.password);

    if (passOk){
        //logged in
        jwt.sign({username, id: userDoc.id}, saltJSON, {}, (err, token) => {
            if (err) throw err;
            res.cookie('token', token).json('ok');
        });
    } else {
        // not logged in
        res.status(400).json('wrong credentials')
    }
});

app.get('/profile', (req, res) => {
    const {token} = req.cookies;
    jwt.verify(token, saltJSON, {}, (err, info) => {
        if (err) throw err;
        res.json(info);
    });
});

app.listen(4000);