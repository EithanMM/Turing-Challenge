const express = require('express');
const handlebars = require('express-handlebars');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const path = require('path');

const app = express();

require('./lib/passport');

app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, '../public')));
app.engine(
	'.hbs',
	handlebars({
		defaultLayout: 'main',
		layoutsDir: path.join(app.get('views'), 'layouts'),
		partialsDir: path.join(app.get('views'), 'partials'),
		extname: '.hbs'
	})
);

app.set('view engine', 'hbs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
	session({
		//configuramos la session
		secret: 'thisisasecret',
		resave: false, //evita que se renueve la session
		saveUninitialized: false //evita que se vuelva a establecer la session.
	})
);

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

const routesPath = require('./routes');
const actionsPath = require('./routes/actions');
const authpath = require('./routes/authentication');

app.use(routesPath);
app.use(actionsPath);
app.use(authpath);

/* We create a public object to anyone who wants to acces to the store. */
app.set('publicObject', { status: 'none', shopCartId: '', subtotal: '0.00', searchWord: '' });

app.use((req, res, next) => {
	app.locals.success = req.flash('success');
	app.locals.error = req.flash('error');
	app.locals.user = req.user;
	next();
});

module.exports = app;
