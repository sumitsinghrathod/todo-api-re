var Require  = require('sequelize');
var sequelize = new Require(undefined , undefined , undefined , {
	'dialect' : 'sqlite',
	'storage' : __dirname +'/basic-sqlite-database.sqlite'
});

var Todos = sequelize.define('todo' , {
	description : {
		type: Require.STRING,
		allowNull : false,
		validate : {
			//isEmpty: false,
			len : [1 , 250]
		}
	},
	completed: {
		type : Require.BOOLEAN,
		defaultValue : false
	}


});

sequelize.sync().then(function(){
	Todos.create({
		 description: "meet me for lunch",
		completed : false

	}).then(function(todo){
		console.log('Table created');
		console.log(todo);
	}).catch(function(e){
		console.log(e);
	});

console.log('Database Synced');

});