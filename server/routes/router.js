const express = require('express');
const route = express.Router();


const services = require('../services/render')
const controller = require('../controller/controller')

// get routes
route.get('/', services.homeRouter)
route.get('/add-user', services.add_user)
route.get('/update-user', services.update_user)

// API (Application Programming Interface)
route.post('/api/users', controller.create);
route.get('/api/users', controller.Return);
route.put('/api/users/:id', controller.update);
route.delete('/api/users/:id', controller.delete);

module.exports = route