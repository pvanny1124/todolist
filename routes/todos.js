var express = require('express');
var router = express.Router(); //allows us to break our routes into modular chunks
//we'll require them back in the main app.js
var db = require('../models');
var helpers = require('../helpers/todos');

//Using helper functions located in the helpers folder, we
//are able to dry up the code substantially

//we can combine get and post into one with .route
router.route('/')
    .get(helpers.getTodos)
    .post(helpers.createTodo)

//same thing with the put/delete restful routes!
router.route('/:todoId')
    .get(helpers.getTodo)
    .put(helpers.updateTodo)
    .delete(helpers.deleteTodo)

module.exports = router;