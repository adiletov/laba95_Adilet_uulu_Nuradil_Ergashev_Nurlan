const express = require('express');
const app = express();
const port = 8080;

const mongoose = require('mongoose');
const cors = require('cors');

const config = require('./config');
const users = require('./router/Users');
const cocktails = require('./router/Cocktails');

app.use(cors());
app.use(express.json());
app.use(express.static('public'));


const run = async () => {
    await mongoose.connect(config.database, config.options);
    app.use('/users', users);
    app.use('/cocktails', cocktails);
    app.listen(port)
};


run().catch(e => {
    console.error(e)
});

