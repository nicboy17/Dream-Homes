const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const uri = process.env.NODE_ENV === 'dev' ? process.env.MONGO_URI + '/pineapple' : process.env.MONGO_URI + '/test';

mongoose.connect(uri, { useNewUrlParser: true })
    .then(() => console.log('MongoDB successfully connected'))
    .catch(err => console.log(err));