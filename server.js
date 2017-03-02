const PORT_NUM = process.env.PORT || 1337;

const mongoose = require('./config/mongoose');
const express = require('./config/express');

const db = mongoose();
const app = express();

app.listen(PORT_NUM);

module.exports = app;
console.log('Server running at http://localhost:' + PORT_NUM);
