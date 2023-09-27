const express = require('express');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const User = require('./models/User');
const Post = require('./models/Post');
const bcrypt = require('bcryptjs');
const app = express();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const uploadMiddleware = multer({ dest: 'uploads/' })
const fs = require('fs'); // from filesystem to rename

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.json());    //https://chat.openai.com/share/c30c3176-1090-4b60-9e73-2c6ea50d2ec4
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));

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
            } else res.cookie('token', token).json({
                id: userDoc._id,
                username,
            });
        });
    } else {
        res.status(400).json('Wrong credentials');
    }
})

app.get('/profile', (req, res) => {
    const {token} = req.cookies;
    jwt.verify(token, tokenSalt, {}, (err, info) => {
        if (err) throw err;
        res.json(info);
    });
})

app.post('/logout', (req, res) => {
    res.cookie('token','').json('ok');  // assigning cookie 'token' to an empty strings - clearing cookie
});

app.post('/post', uploadMiddleware.single('file'), async (req, res) => {
    const {originalname, path} = req.file;
    const parts = originalname.split('.');
    const extension = parts[parts.length - 1];  // taking the image format e.g. webp, png
    const newPath = path+'.'+extension;
    fs.renameSync(path, newPath);    // to rename and put the proper format e.g image -> image.webp
    
    const {token} = req.cookies;
    jwt.verify(token, tokenSalt, {}, async (err, info) => {
        if (err) throw err;
        const {title, summary, content} = req.body;
        const postDoc = await Post.create({
            title,
            summary,
            content,
            cover: newPath,
            author: info.id,
        });
        res.json(postDoc)
        // res.json(info);
    });

    
}); //https://www.npmjs.com/package/multer (why uploadMiddleware.single('file')? )

app.get('/post', async (req, res) => {
    res.json(await Post.find()
                        .populate('author', ['username'])
                        .sort({createdAt: -1})
                        );
})

app.listen(4000);
//tqwgPlPnpUE0G2Eu
//mongodb+srv://shafinnahian:tqwgPlPnpUE0G2Eu@cluster0.a5ymt04.mongodb.net/?retryWrites=true&w=majority