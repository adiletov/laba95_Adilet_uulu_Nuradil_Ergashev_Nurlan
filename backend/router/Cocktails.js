const path = require('path');
const express = require('express');
const router = express.Router();

const multer = require('multer');
const {nanoid} = require('nanoid');

const config = require('../config');
const auth = require('../middleware/auth');
const Cocktail = require('../models/Cocktail');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath)
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname))
    }
});

const upload = multer({storage});


router.post('/', auth, upload.single('image'), async (req, res) => {
    const user = req.user;
    const newCocktail = {
        userId: user._id,
        title: req.body.title,
        recipes: req.body.recipes,
        ingredients: req.body.ingredients
    };
    if (req.file) {
        newCocktail.image = req.file.filename
    }

    const cocktail = new Cocktail(newCocktail);
    try {
        await cocktail.save();
        res.send({message: 'Successfully added!!!'})
    } catch (e) {
        res.status(404).send(e)
    }
});
router.post('/publish', async (req, res) => {
    const cocktail = await Cocktail.findOne({_id: req.body.id});
    if (!cocktail) {
        return res.status(401).send({error: 'No cocktail'})
    }
    cocktail.publish = !cocktail.publish;

    try {
        await cocktail.save();
        res.send({message: 'OK'})
    } catch (e) {
        res.status(401).send({error: 'Not found'})
    }
});
router.get('/', async (req, res) => {
    const cocktails = await Cocktail.find();
    res.send(cocktails)
});

router.get('/user/', auth, async (req, res) => {
    const user = req.user;
    const cocktails = await Cocktail.find({userId: user._id});
    res.send(cocktails)
});

router.delete('/remove/:id', auth, async (req, res) => {
    const cocktail = await Cocktail.findOne({_id: req.params.id});
    if (!cocktail) {
        res.status(401).send({error: 'No cocktail'})
    }
    if (req.user.role === 'admin') {
        await Cocktail.deleteOne({_id: req.params.id});
        return res.send({message: 'successfully deleted'})
    } else if (req.user.role === 'user') {
        await Cocktail.deleteOne({_id: req.params.id, userId: req.user._id});
        res.send({message: 'successfully deleted'})
    } else {
        res.status(401).send({error: 'you do not have rights'})
    }
});


module.exports = router;