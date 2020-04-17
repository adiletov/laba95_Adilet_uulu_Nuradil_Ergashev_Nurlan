const mongoose = require('mongoose');
const config = require('./config');
const User = require('./models/User');
const Cocktail = require('./models/Cocktail');
const {nanoid} = require('nanoid');


const run = async () => {
    await mongoose.connect(config.database, config.options);

    const connection = mongoose.connection;
    const collections = await connection.db.collections();

    for (let collection of collections) {
        await collection.drop();
    }


    const [admin, user] = await User.create(
        {
            fullName: 'Admin',
            username: 'admin',
            role: 'admin',
            password: 'admin123',
            token: nanoid(),
        },
        {
            fullName: 'User',
            username: 'user',
            password: 'user123',
            token: nanoid(),
        }
    );

    await Cocktail.create(
        {
            userId: user._id,
            title: 'Mojito',
            recipes: 'Mix this classic cocktail for a party using fresh mint, white rum, sugar, zesty lime and cooling soda water. Play with the quantities to suit your taste',
            ingredients: JSON.stringify([
                {name: 'juice of lime', amount: '1 '},
                {name: 'granulated sugar', amount: '1 tsp'},
                {name: 'small handful', amount: '1'},
                {name: 'white rum', amount: '60ml'},
                {name: 'soda water', amount: '1 tsp'}
            ]),
            publish: false,
            image: 'mojito.jpg'
        },
        {
            userId: user._id,
            title: 'Rhubarb gin',
            recipes: 'Use seasonal rhubarb to make a G&T with a difference, or top with soda water for a refreshing summertime drink in glorious pink',
            ingredients: JSON.stringify([
                {name: 'pink rhubarb stalks', amount: '1 kg'},
                {name: 'caster sugar', amount: '400g'},
                {name: ' gin', amount: '800ml'},
            ]),
            publish: false,
            image: 'gin.jpg'
        },
        {
            userId: user._id,
            title: 'Espresso martini',
            recipes: 'Learn how to make this classic coffee cocktail. Our easy recipe uses freshly brewed espresso, a dash of coffee liqueur and a simple sugar syrup',
            ingredients: JSON.stringify([
                {name: 'golden caster sugar', amount: '100 g'},
                {name: 'ice', amount: '1'},
                {name: 'vodka', amount: '100ml'},
                {name: 'freshly brewed espresso coffee', amount: '50ml'},
                {name: 'coffee liqueur', amount: '50ml'},
                {name: 'coffee beans (optional)', amount: '4'},
            ]),
            publish: false,
            image: 'martini.jpg'
        },
    );

    await connection.close();
};


run().catch(error => {
    console.log(error)
    console.error('Something went wrong');
});