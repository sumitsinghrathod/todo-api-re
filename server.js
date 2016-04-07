var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');
var db  = require('./db.js')
var app = express();
app.use(bodyParser.json());

var PORT = process.env.PORT || 3000;
// var todos = [{
// 	id: 1,
// 	description: 'Meet mom for lunch',
// 	completed: true
// },{
// 	id: 2,
// 	description: 'Goto Market Meet',
// 	completed: false
// },{
// 	id: 3 ,
// 	description: 'Getting 3rd todos mom',
// 	completed: false
// }];

app.get('/' ,function(req , res){
	res.send('Todo API Root');

});

app.get('/todos/:id' , function(req , res) {
	//res.send('requesting for param id' + req.params.id);
	 var todoId = parseInt(req.params.id , 10);
	// console.log(todoId);
	// console.log("Matched todos before>>>>>>>>>>>" + _.findWhere(db.todo , {id: todoId}));
	// var matchedTodos = _.findWhere(db.todo , {id: todoId});
	// console.log("Matched todos>>>>>>>>>>>" + matchedTodos);
	// res.json(matchedTodos);
	db.todo.findById(todoId).then(function(todo){
		if(!!todo)
			res.json(todo);
		else
			res.status(404).send();

	}, function(e){
		res.status(500).json(e);

	});
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

	var query = req.query;
	var where = {};
	if(query.hasOwnProperty('completed') && query.completed === 'false'){
		where.completed = false;
	}
	else if(query.hasOwnProperty('completed') && query.completed === 'true'){
		where.completed = true;
	}
	if(query.hasOwnProperty('q') && query.q.length >0){
		where.description = {
			$like : '%' + query.q + '%',
		}
	}

	db.todo.findAll({
		where: where
	}).then(function(todo){
		res.json(todo);

	}, function(e){
		res.status(500).json(e);
	});


	// console.log(searchTodos);
	// var searchedTodos = _.where(todos , {completed : false});
	// console.log(searchedTodos);
	// if(searchTodos.hasOwnProperty('completed') && searchTodos.completed == 'false')
	// 	return res.json(searchedTodos);
	// else if(searchTodos.hasOwnProperty('completed') && searchTodos.completed == 'true'){
	// 	searchedTodos = _.where(todos , {completed : true});
	// 	return res.json(searchedTodos);
	// }
	
	//  if(searchTodos.hasOwnProperty('q') && searchTodos.q.length>0){
	// 	var filterTodos = _.filter(todos , function(todo){
	// 			console.log("filteredTodos >>>>>>>>>>>>>>" + todo.description.indexOf(req.query.q) > -1);
	// 		return todo.description.indexOf(req.query.q) > -1;

	// 	});
	

	// res.json(filterTodos);
		
	// }
	


	//res.json(searchTodos);
});

app.post('/todos' , function(req , res){
	var body = _.pick(req.body , 'description' , 'completed' ,'id');

	db.todo.create(body).then(function(todo){
		console.log('Collection created>>>>>>>>>>' + todo);
		res.json(todo.toJSON());
	} , function(e){
		console.log("Error occured>>>>>>" + e);
		res.status(400).json(e);
	});
	// console.log("Completed Value >>>>>>>>>" + _.isBoolean(body.completed));
	// // if(!_.pick(body) , 'description' , 'completed')
	// // 	return res.send('Bad data request');
	// //console.log("completed boolean test>>>>>>>>" + _.isBoolean(body.completed));
	// if(!_.isBoolean(body.completed) || !_.isString(body.description)){
	// 	console.log("completed boolean test>>>>>>>>" + _.isBoolean(body.completed));
	// 	return res.status(400).send();
	// }
	// todos.push(body);
	// console.log(body);
	// res.json(body);

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

db.sequalize.sync().then(function(){
	app.listen(PORT , function(){
		console.log('Database Synced and starting Express Server');
		console.log('Express is listening on port' + PORT);
	});

});
