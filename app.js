const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// mongoose.connect('mongodb://localhost:27017/mestodb', {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: false
// });

mongoose.connect('mongodb://localhost:27017/mestodb', {
    useNewUrlParser: true
});

app.use((req, res, next) => {
    req.user = {
        _id: '633d5d14cf2735f310ac12a6'
    };
    next();
});

app.use('/users', require('./routes/user'));
app.use('/cards', require('./routes/card'));

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
})