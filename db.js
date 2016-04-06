var Sequalize = require('sequelize');
var sequalize = new Sequalize(undefined , undefined , undefined ,{
	'dialect' : 'sqlite',
	'storage' : __dirname + '/data/dev_todo.sqlite'

});

var db  = {};
db.todo = sequalize.import(__dirname + '/medel/todo.js');
db.sequalize = sequalize;
db.Sequalize = Sequalize;

module.exports = db;