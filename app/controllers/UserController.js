exports.index = function(req, res) {
	//res.render('user/index', {
	res.render('control/painel', {	
		user: req.session.user
	});
}