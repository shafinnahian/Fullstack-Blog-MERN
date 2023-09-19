const express = require('express');
const cors = require('cors')
const app = express();

app.use(cors());
app.use(express.json());

app.post('/register', (req, res) => {
    const {username, password} = req.body;
    res.json({requestData: {username, password}});
});

app.listen(4000);
//kJLGNSh0Bk6D1WOm
//mongodb+srv://shafinnahian:kJLGNSh0Bk6D1WOm@cluster0.gw3qxyb.mongodb.net/?retryWrites=true&w=majority