const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { loginUser, addUser, generateShoppingCartId } = require('../../utils/e-comerceAPI');

passport.use(
	'local.signin',
	new LocalStrategy(
		{
			usernameField: 'Email',
			passwordField: 'Password',
			passReqToCallback: true
		},
		async (req, email, password, done) => {
			const user = await loginUser(email, password);

			if (user.error !== undefined) {
				return done(null, false, req.flash('error', user.error.message));
			} else {
				var publicObject = req.app.get('publicObject');
				const loggedUser = {
					...user,
					shopCartId: publicObject.shopCartId,
					subtotal: publicObject.subtotal
				};
				req.success = req.flash('success', 'Welcome ' + user.customer.name);
				publicObject.status = 'inactive';
				done(null, loggedUser);
			}
		}
	)
);

passport.use(
	'local.signup',
	new LocalStrategy(
		{
			usernameField: 'Email',
			passwordField: 'Password',
			passReqToCallback: true
		},
		async (req, email, password, done) => {
			const newUser = await addUser(req.body.Name, email, password);
			if (newUser.error) {
				return done(null, false, req.flash('error', newUser.error.message));
			}
			var publicObject = req.app.get('publicObject');
			const loggedUser = {
				...newUser,
				shopCartId: publicObject.shopCartId,
				subtotal: publicObject.subtotal
			};
			req.success = req.flash('success', 'Welcome ' + newUser.customer.name);
			publicObject.status = 'inactive';
			done(null, loggedUser);
		}
	)
);

passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser(async (user, done) => {
	done(null, user);
});
