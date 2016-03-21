var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore')
var app = express();
app.use(bodyParser.json());

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
	var todoId = parseInt(req.params.id , 10);

	var matchedTodos = _.findWhere(todos , {id: todoId});
	// todos.forEach(function(todo){
	// 	if(todo.id === parseInt(req.params.id)){
	// 		//matchedTodos = todo;
	// 		res.json(todo);
	// 	}

	// });
	// if(matchedTodos)
	// 	res.json(matchedTodos);
	// else 
	// 	res.status(404).send();

});

app.get('/todos' ,function(req , res){

	res.json(todos);
});

app.post('/todos' , function(req , res){
	var body = _.pick(req.body , 'description' , 'completed' ,'id');
	console.log("Completed Value >>>>>>>>>" + _.isBoolean(body.completed));
	// if(!_.pick(body) , 'description' , 'completed')
	// 	return res.send('Bad data request');
	//console.log("completed boolean test>>>>>>>>" + _.isBoolean(body.completed));
	if(!_.isBoolean(body.completed) || !_.isString(body.description)){
		console.log("completed boolean test>>>>>>>>" + _.isBoolean(body.completed));
		return res.status(400).send();
	}
	todos.push(body);
	console.log(body);
	res.json(body);

});
app.listen(PORT , function(){
console.log('Express is listening on port' + PORT);
});