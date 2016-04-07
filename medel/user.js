module.exports = function(sequalize , DataTypes){

	return	sequalize.define('user' , {

		email : {
			type: DataTypes.STRING,
			allowNull: false,
			validate:{
				isEmail: true
			}
		} , 
		password : {

			type : DataTypes.STRING,
			allowNull: false,
			validate:{
				len: [7,100]
			}
		}

	});
}