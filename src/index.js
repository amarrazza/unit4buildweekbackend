const express = require('express');
const server = express();

require('dotenv').config();

const PORT = process.env.PORT;

server.listen(PORT, () => {
    console.log(`listing on port ${PORT}`);
    console.log(process.env.MESSAGE);
})

server.use('*', (req, res) => {
    res.send(`<h1>Hello Heroku!</h1>`);
})