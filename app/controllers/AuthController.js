var UserModel = require('../models/User');


exports.signin = function(req, res) {
	// GET sur /signin
	var datas = '';

	// Se eu tiver coisas na minha sessão flash, coloco isso
	// datas, que eu transferir para minha visão depois (views/auth/signin.ejs)
	if(req.session && req.session.flash) {
		datas = req.session.flash;
		req.session.flash = null;
	}

	// Affichage de la vue signin
	res.render('auth/signin', datas);
}


exports.perform_signin = function(req, res) {
	// POST sur /signin
	// ICI Eu prefiro fazer um redirecionamento, para
	// Evita isso ao fazer "F5", ele retorna o formulário
	UserModel.findByEmailAndPassword(req.body, function(err, row) {
		var message = '';
		if (err) {
			
			var datas = {};
			datas.email = req.body.email;
			datas.password = req.body.password;
			datas.message = err;

			
			req.session.flash = datas;

			
			res.redirect('/signin')
		} else {
			req.session.user = row[0];
			res.redirect('/user');
		}
	});
}

exports.logout = function(req, res) {
	// GET sur /logout
	req.session.user = null;
	res.redirect('/');
}
