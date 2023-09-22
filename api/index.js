const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());    //https://chat.openai.com/share/c30c3176-1090-4b60-9e73-2c6ea50d2ec4

app.post('/register', (req, res) => {   // {post: to send information with a post request}
    const {username, password} = req.body;
    res.json({requestData:{username, password}});
        //res.json({requestData: {username, password}}); is sending a JSON response to the client 
        //with a specific JSON structure containing the username and password fields within a requestData object.
});

app.listen(4000);
//tqwgPlPnpUE0G2Eu
//mongodb+srv://shafinnahian:tqwgPlPnpUE0G2Eu@cluster0.a5ymt04.mongodb.net/?retryWrites=true&w=majority