const express = require('express');
const bodyParser = require('body-parser');

const tradingViewRouter = require('./routes/tradingViewRoutes');

const app = express();


// 1) MIDDLEWARES

// app.use(express.json());
app.use(bodyParser.text());


// 3) ROUTES

app.use('/api/v1/tradingView', tradingViewRouter);

module.exports = app;

