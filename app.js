const express = require('express');
const config = require('config');
const { GRAwardsController } = require('./src/controller/GRAwardsController');
const app = express();
const serverPort = config.get('webserver.port');

app.get('/awards/winners', (new GRAwardsController).findAll);

app.listen(serverPort, () => {
    console.log(`Running server on port: ${serverPort}`);
});