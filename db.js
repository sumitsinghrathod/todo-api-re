var Sequalize = require('sequelize');
var sequelize = process.env.NODE_ENV || 'development'
if(sequalize == 'production'){
	sequalize = new Sequalize(process.env.DATABASE_URL{
		dialect: 'postgres'
	});
}
else {
	sequalize = new Sequalize(undefined , undefined , undefined ,{
	'dialect' : 'sqlite',
	'storage' : __dirname + '/data/dev_todo.sqlite'

});
}

var db  = {};
db.todo = sequalize.import(__dirname + '/medel/todo.js');
db.sequalize = sequalize;
db.Sequalize = Sequalize;

module.exports = db;