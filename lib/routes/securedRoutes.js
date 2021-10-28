'use strict'

const express = require('express');
const dataModules = require('../models');
const bearerAuth = require('../middleware/bearer.js')
const permissions = require('../middleware/acl.js')
const secureRouter = express.Router();
const { handleGetAll, handleGetOne, handleCreate, handleUpdate, handleDelete } = require('./crudRoutes.js')

secureRouter.param('model', (req, res, next) => {
  const modelName = req.params.model;
  if (dataModules[modelName]) {
    req.model = dataModules[modelName];
    next();
  } else {
    next('Invalid Model');
  }
});

secureRouter.get('/:model', bearerAuth, handleGetAll)
secureRouter.get('/:model:id', bearerAuth, handleGetOne)
secureRouter.post('/:model', bearerAuth, permissions('create'), handleCreate)
secureRouter.put('/:model:id', bearerAuth, permissions('update'), handleUpdate)
secureRouter.patch('/:model:id', bearerAuth, permissions('update'), handleUpdate)
secureRouter.delete('/:model:id', bearerAuth, permissions('delete'), handleDelete)


module.exports = secureRouter;