var mongoose = require('mongoose');
mongoose.set('debug', true); //tells us where connection is failing at any given point
mongoose.connect("mongodb://localhost/todo-api");

mongoose.Promise = Promise; //allows us to use Promise syntax

//like this:

// db.Todo.find().then().catch();

//instead of using a callback function like this
// db.Todo.find(function(){
// })

module.exports.Todo = require('./todo');