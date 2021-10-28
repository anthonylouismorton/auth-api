'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const notFoundHandler = require('./error-handlers/404.js');
const errorHandler = require('./error-handlers/500.js');
const userRoutes = require('./routes/userRoute.js');
const logger = require('./middleware/logger.js');
const {router} = require('./routes/crudRoutes.js');
const securedRoutes = require('./routes/securedRoutes.js')
const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(logger);
app.use('/api/v1', router);
app.use(userRoutes);
app.use('/api/v2',securedRoutes)
app.use('*', notFoundHandler);
app.use(errorHandler);

module.exports = {
  app,
  start: port => {
    app.listen(port, () => console.log(`Listening on ${port}`));
}
}
