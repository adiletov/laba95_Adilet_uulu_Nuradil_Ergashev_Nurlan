const express = require('express');
const router = express.Router();

const {nanoid} = require('nanoid');
const axios = require('axios');

const User = require('../models/User');
const bcrypt = require('bcrypt');
const config = require('../config');




router.post('/sessions', async (req, res) => {
    const user = await User.findOne({username: req.body.username});
    if(!user){
        return res.status(401).send({error: 'Username or password in correct!'});
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if(!isMatch){
        return res.status(401).send({error: 'Username or password in correct!'})
    }
    try{
        await user.generationToken();
        await user.save();
        return res.send({message: 'Successful login!' , user})
    }catch (e) {
        res.status(404).send({error: 'Not found!'})
    }
});

router.post('/facebook', async (req, res) => {
    const inputToken = req.body.accessToken;
    const accessToken = config.facebook.appId + '|' + config.facebook.appSecret;
    const debugTokenUrl = `https://graph.facebook.com/debug_token?input_token=${inputToken}&access_token=${accessToken}`;

    try {
        const response = await axios.get(debugTokenUrl);
        if (response.data.data.error) {
            return res.status(401).send({message: 'Facebook token incorrect'});
        }
        if (req.body.id !== response.data.data.user_id) {
            return res.status(401).send({message: 'Wrong user ID'});
        }

        let user = await User.findOne({facebookId: req.body.id});
        if (!user) {
            const newUser = {
                fullName: req.body.name,
                username: req.body.id,
                password: nanoid(),
                facebookId: req.body.id
            };
            if (req.body.picture) {
                newUser.avatar = req.body.picture.data.url
            }
            user = new User(newUser);
        }
        await user.generationToken();
        await user.save();
        res.send({message: 'Successful login!', user})
    } catch (e) {
        res.status(404).send({error: 'Not found!'})
    }
});

router.delete('/sessions', async (req, res) => {
    const success = {message: 'Bye'};

    const token = req.get('Authorization');
    if (!token) return res.send(success);
    const user = await User.findOne({token});
    if (!user) return res.send(success);

    user.generationToken();
    await user.save();
    return res.send(success);
});




module.exports = router;