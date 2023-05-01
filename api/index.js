const express = require('express');

// import router for notes
const noteRouter = require('./notes');

const app = express();

app.use('/notes', noteRouter);

module.exports = app;