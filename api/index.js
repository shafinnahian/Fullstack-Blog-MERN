const express = require('express');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const app = express();
const jwt = require('jsonwebtoken');

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.json());    //https://chat.openai.com/share/c30c3176-1090-4b60-9e73-2c6ea50d2ec4

mongoose.connect('mongodb+srv://shafinnahian:tqwgPlPnpUE0G2Eu@cluster0.a5ymt04.mongodb.net/?retryWrites=true&w=majority');

const salt = bcrypt.genSaltSync(10);
const tokenSalt = 'asdfdsfghfghjrty';

app.post('/register', async (req, res) => {   // {post: to send information with a post request}
    const {username, password} = req.body;
    try{                    //https://chat.openai.com/share/be780ae0-3592-446c-9be0-a32781e28b12
        const userDoc = await User.create({
            username, 
            password: bcrypt.hashSync(password, salt)});
        res.json(userDoc);
    } catch(e){
        res.status(400).json(e);
    }
    
    // res.json({requestData:{username, password}});
        //res.json({requestData: {username, password}}); is sending a JSON response to the client 
        //with a specific JSON structure containing the username and password fields within a requestData object.
});

app.post('/login', async (req, res) => {
    const {username, password} = req.body;
    const userDoc = await User.findOne({username}); // Checking if User (from database) has element 'username' with the correct value.
    const passOk = bcrypt.compareSync(password, userDoc.password);    // Checking unsalted password. Press on both passwords to understand the difference 
                                                                    //(userDoc.password is from registration)
    if (passOk){
        // logged in
        jwt.sign({username, id:userDoc._id}, tokenSalt, {}, (err, token) => {
            if (err) {
                console.error(err); // Log JWT signing error
                res.status(500).json('Internal Server Error');
            } else res.cookie('token', token).json('ok');
        });
    } else {
        res.status(400).json('Wrong credentials');
    }
})

app.listen(4000);
//tqwgPlPnpUE0G2Eu
//mongodb+srv://shafinnahian:tqwgPlPnpUE0G2Eu@cluster0.a5ymt04.mongodb.net/?retryWrites=true&w=majority