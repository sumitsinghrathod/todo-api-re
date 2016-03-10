var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var todos = [{
	id: 1,
	description: 'Meet mom for lunch',
	completed: false
},{
	id: 2,
	description: 'Goto Market',
	completed: false
},{
	id: 3 ,
	description: 'Getting 3rd todos',
	completed: false
}];

app.get('/' ,function(req , res){
	res.send('Todo API Root');

});

app.get('/todos/:id' , function(req , res) {
	//res.send('requesting for param id' + req.params.id);
	var matchedTodos;
	todos.forEach(function(todo){
		if(todo.id === parseInt(req.params.id)){
			//matchedTodos = todo;
			res.json(todo);
		}

	});
	// if(matchedTodos)
	// 	res.json(matchedTodos);
	// else 
	// 	res.status(404).send();

});

app.get('/todos' ,function(req , res){
	res.json(todos);
});
app.listen(PORT , function(){
console.log('Express is listening on port' + PORT);
});