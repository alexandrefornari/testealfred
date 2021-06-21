const express = require('express');

const router = require('./routes');
const config = require('../config');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', router);

const port = config.server.port;

app.listen(port)
    .on('listening', () => console.log(`Listening on ${port}`))
