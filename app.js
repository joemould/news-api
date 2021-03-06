const express = require('express');
const app = express();
const cors = require('cors');
const apiRouter = require('./routers/api.router');
const {
  handleRouteNotFound,
  handleCustomErrors,
  handlePSQLErrors,
  handleServerErrors
} = require('./controllers/errors.controllers');

app.use(cors());
app.use(express.json());

app.use('/api', apiRouter);
app.all('/*', handleRouteNotFound);

app.use(handleCustomErrors);
app.use(handlePSQLErrors);
app.use(handleServerErrors);

module.exports = app;
