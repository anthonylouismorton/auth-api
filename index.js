'use strict';
require('dotenv').config();
const { db } = require('./lib/models');
const app = require('./lib/server.js');
const PORT = process.env.PORT || 3001
db.sync().then(() => {
  app.start(PORT);
});
