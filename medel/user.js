var bcrypt = require('bcrypt');
var _ = require('underscore');

module.exports = function(sequalize , DataTypes){

	return	sequalize.define('user' , {

		email : {
			type: DataTypes.STRING,
			allowNull: false,
			unique:true,
			validate:{
				isEmail: true
			}
		} , 
		salt :{
			type : DataTypes.STRING
		},
		password_hash : {
			type : DataTypes.STRING
		},
		password : {

			type : DataTypes.VIRTUAL,
			allowNull: false,
			validate:{
				len: [7,100]
			},
			set : function(data){
			var salt = bcrypt.genSaltSync(10);
			var hashedPassword = bcrypt.hashSync(data,salt);
			this.setDataValue('password' , data);
			this.setDataValue('salt' , salt);
			this.setDataValue('password_hash',hashedPassword);
		}
		} 
		

	} ,{ 
		hooks : {
			beforeValidate : function(user , options){
				if(typeof user.email === 'string'){
					user.email = user.email.toLowerCase();
				}
			}
		},
		instanceMethods :{
			toPublicJSON : function(){
				var json  = this.toJSON();
				return _.pick(json , 'id' , 'email' , 'createdAt' , 'updatedAt');
			}
		}
		});
}