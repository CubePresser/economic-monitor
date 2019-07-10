const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const controllers = require('./controllers');

const port = process.env.PORT || 8000;

const app = express();

app.use(morgan('dev'));

app.use(bodyParser.json());

app.use('/', controllers);

app.use((err, req, res) => {
    console.error(err);
    res.status(500).send({
        error: "Server error. Try again later."
    });
});

app.use((req, res) => {
    res.status(404).send({
        error: "Requested resource " + req.originalUrl + " does not exist"
    });
});

app.listen(port, () => {
    console.log("== Server is running on port", port);
});