// app/models/User.js
var mysql = require('mysql');
var configDB = require('../../config/connection.js');
var connection = mysql.createConnection(configDB);


// Aqui, o que pode intrigar, é este "cb", para "retorno de chamada".
// Na verdade, é apenas uma função, nada mais, que será usado mais tarde
// para fazer algo como "findByEmailAndPassword (datas, function (xx, xx) {})"

exports.findByEmailAndPassword = function(datas, cb) {
	var email = datas.email;
	var password = datas.password;

	// Aqui eu escapo dos dados que envie para evitar qualquer coisa
	// é injeção SQL
	
	connection.query('SELECT * FROM users WHERE email = ? AND password = ? ', [email, password], function(err, row) {
		
		if (err) {
			console.log(err);
			cb('Erro com o banco de dados.', undefined);
		} else {
			
			if(row && row.length == 1) {
				cb(false, row)	
			} else {
				
				cb("Erro de usuário ou senha", undefined)
			}
		}
	});
}