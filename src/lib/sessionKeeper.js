module.exports = {
	isLoged(req, res, next) {
		if (req.isAuthenticated()) next();
		else res.redirect('/signin');
	}

	//isNotLoged(req, res, next) {}
};
