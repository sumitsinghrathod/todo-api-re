var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore')
var app = express();
app.use(bodyParser.json());

var PORT = process.env.PORT || 3000;
var todos = [{
	id: 1,
	description: 'Meet mom for lunch',
	completed: true
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
	console.log(todoId);
	console.log("Matched todos before>>>>>>>>>>>" + _.findWhere(todos , {id: todoId}));
	var matchedTodos = _.findWhere(todos , {id: todoId});
	console.log("Matched todos>>>>>>>>>>>" + matchedTodos);
	res.json(matchedTodos);
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

	var searchTodos = req.query;
	console.log(searchTodos);
	var searchedTodos = _.where(todos , {completed : false});
	console.log(searchedTodos);
	if(searchTodos.hasOwnProperty('completed') && searchTodos.completed == 'false')
		return res.json(searchedTodos);
	else 
		return res.json("Bad request");


//	res.json(todos);
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

app.delete('/todos/:id' , function(req , res) {
	var body = _.pick(req.body , 'id');
	var todoId = parseInt(req.params.id , 10);
	var matchedTodos = _.findWhere(todos , {id: todoId});
	if(!matchedTodos)
		return res.status(404).json({"error":"Data not found"});
	else{
		todos = _.without(todos , matchedTodos);
		res.json(matchedTodos);
	}
	


});

app.put('/todos/:id' , function(req , res){
	var todoId = parseInt(req.params.id , 10);
	var matchedTodos = _.findWhere(todos , {id: todoId});
	if(!matchedTodos)
		return res.status(404).send();
	var body = _.pick(req.body , 'description' , 'completed');
	var validAttributes = {

	};
	if(body.hasOwnProperty('completed') && _.isBoolean(body.completed))
		validAttributes.completed = body.completed;
	else if(body.hasOwnProperty('completed'))
		return res.status(404).send();
	if(body.hasOwnProperty('description') && _.isString(body.description))
		validAttributes.description = body.description;
	else if(body.hasOwnProperty('description'))
		return res.status(404).send();

	_.extend(matchedTodos , validAttributes);
	res.json(matchedTodos);

});
app.listen(PORT , function(){
console.log('Express is listening on port' + PORT);
});