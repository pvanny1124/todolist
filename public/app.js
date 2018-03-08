/* global $ */

$(document).ready(function(){
    $.getJSON('/api/todos') //only need 'api/todos' since we're already on the rest of the directory.
        .then(addTodos);
    $('#todoInput').keypress(function(event){ 
        if(event.which == 13){ //every key has a different 'number' associated with it. Enter happens to be 13
            //event.which holds this number
            createTodo();
        }
    });
    
    $('.list').on('click', 'li', function(){
        updateTodo($(this));
    });
    
     $('.list').on('click', 'span', function(event){ //second parameter selects on spans! need to select the ul thats already on the page
        //because you wont get functionality on start of load since there are no li elements initially
        //i.e event delegation
        event.stopPropagation();
        removeTodo($(this).parent()); //pass in the li which has the id value
        
    });
    
});

function createTodo(){
    //send request to post todo
    var userInput = $('#todoInput').val();
    $.post('/api/todos/', {name: userInput})
        .then(function(newTodo){
            $('#todoInput').val(''); //clear input upon user enter.
            addTodo(newTodo);
        })
        .catch(function(err){
            console.log(err);
        });
}

function addTodo(todo){
        var newTodo = $('<li class="task">' + todo.name + '<span>X</span></li>');
        newTodo.data('id', todo._id);
        newTodo.data('completed', todo.completed);
        if(todo.completed){
            newTodo.addClass('done');
        }
        $('.list').append(newTodo);
}

function addTodos(todos){
    todos.forEach(function(todo){
        addTodo(todo);
    });
}

function removeTodo(todo){
    //send delete request. can only use ajax for this
        var id = todo.data('id');
        console.log(id);
        var deleteUrl = '/api/todos/' + id;
        $.ajax({
            method: 'DELETE',
            url: deleteUrl
        }).then(function(data){
            //delete LI from DOM
            todo.remove();
        }).catch(function(err){
            console.log(err);
        });
}

function updateTodo(todo){
    var updateUrl = '/api/todos/' + todo.data('id');
    var isDone = !todo.data('completed');
    var updateData = {completed: isDone}; //nullify isDone to reverse the boolean
    $.ajax({
       method: 'PUT',
       url: updateUrl,
       data: updateData
    }).then(function(updatedTodo){
        todo.toggleClass('done');
        todo.data('completed', isDone);
    });
    
}