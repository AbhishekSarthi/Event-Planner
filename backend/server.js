const express = require('express');
const app = express();
const path = require('path');
const crudRoutes = require('./routes/crud-routes');
const cors = require('cors');
const mongoose = require('mongoose');
const port = process.env.PORT || 8000;

// For deployment
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Origin', '127.0.0.1:8000');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET');
    res.setHeader('Access-Control-Allow-Methods', 'PATCH , DELETE');

    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
});
app.use(express.json());
// app.use(cors());

// for development
// app.use(
//     cors({
//         origin: 'http://localhost:8000',
//         methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     })
// );

app.use('/api', crudRoutes);

// DURING DEPLOYMENT
app.use(express.static(path.join(__dirname, '../frontend/build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build'));
});

mongoose.connect(
    'mongodb+srv://event:YPi9gfgpK4GnEuw5@cluster0.hqba7.mongodb.net/event?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log('connected to DB')
);
app.listen(port, () => {
    console.log(`Server Started on Port : ${port}`);
});
