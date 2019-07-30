const express = require('express');
const passport = require('passport');
const pagination = require('pagination');
const { generateEmail } = require('../email/email');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const {
	getAllProdcuts,
	getProductById,
	getProductSizes,
	addProductToShoppingCart,
	getListProductsFromShoppingCart,
	saveProductForLater,
	removeSingleProductFromCart,
	wipeOutCart
} = require('../../utils/e-comerceAPI');
const { isLoged } = require('../lib/sessionKeeper');
const router = express.Router();

router.post('/signin', (req, res, next) => {
	passport.authenticate('local.signin', {
		//proceso de autenticacion
		successRedirect: '/index/1',
		failureRedirect: '/signin',
		failureFlash: true
	})(req, res, next);
});

router.post(
	'/signup',
	passport.authenticate('local.signup', {
		successRedirect: '/index/1',
		failureRedirect: '/signup',
		failureFlash: true
	})
);

router.get('/signin', (req, res) => {
	res.render('loggin/signin', { success: req.flash('success'), error: req.flash('error') });
});

router.get('/signup', (req, res) => {
	res.render('loggin/signup', { success: req.flash('success'), error: req.flash('error') });
});

router.get('/index/:id', isLoged, async (req, res) => {
	const products = await getAllProdcuts(req.params.id);
	var paginator = new pagination.SearchPaginator({
		current: req.params.id,
		rowsPerPage: 20,
		totalResult: products.count
	});
	var range = paginator.getPaginationData().range;

	res.render('index', {
		user: req.user.customer,
		result: products.rows,
		range,
		success: req.flash('success')
	});
});

router.get('/index/cart/:id', isLoged, async (req, res) => {
	const product = await getProductById(req.params.id);
	if (!product) {
		res.redirect('/index/1', { error: req.flash('error', product.error.message) });
	}
	//console.log(product);
	const sizes = await getProductSizes(req.params.id);
	res.render('purchase/product', { user: req.user.customer, product, sizes });
});

router.post('/index/cart/purchase', isLoged, async (req, res) => {
	const order = req.body;
	const productAdded = await addProductToShoppingCart(req.user.shopCartId, order.Id, order.sizeSend);

	// //return an array of objects - each object is a product asociated to the cart.
	const saveProduct = await saveProductForLater(productAdded[0].item_id);
	//this variable will store the subTotal of all the products.
	let subTotal = 0;

	const productsInCart = await getListProductsFromShoppingCart(req.user.shopCartId);

	productsInCart.forEach((element) => {
		subTotal += parseFloat(element.price);
	});

	subTotal = Math.floor(subTotal * 100) / 100;

	if (saveProduct.message === 'success') {
		res.render('purchase/payment', {
			user: req.user.customer,
			product: productsInCart,
			publicKey: process.env.STRIPE_PUBLI_KEY,
			subTotal,
			//  I removed the . from the subTotal, so stripe can recognize it.
			subTotalModified: subTotal.toString().replace('.', '')
		});
	} else {
		res.render('purchase/product', {
			user: req.user.customer,
			product: await getProductById(productAdded[0].product_id),
			sizes: await getProductSizes(productAdded[0].product_id)
		});
	}
});

router.post('/charge', isLoged, async (req, res) => {
	const productsInCart = await getListProductsFromShoppingCart(req.user.shopCartId);
	let subTotal = 0;

	productsInCart.forEach((element) => {
		subTotal += parseFloat(element.price);
	});

	subTotal = Math.floor(subTotal * 100) / 100;

	await stripe.customers
		.create({
			email: req.body.stripeEmail,
			source: req.body.stripeToken
		})
		.then((customer) =>
			stripe.charges.create({
				amount: parseInt(req.body.subTotal),
				description: req.body.description,
				currency: 'usd',
				customer: customer.id
			})
		)
		.then((charge) => {
			generateEmail(req.body.stripeEmail, productsInCart, subTotal);
			res.render('purchase/successpayment', { user: req.user.customer });
		});

	await wipeOutCart(req.user.shopCartId);
});

router.get('/signout', isLoged, (req, res) => {
	req.logOut();
	res.redirect('/signin');
});

router.get('/shopCart', isLoged, async (req, res) => {
	let subTotal = 0;
	const productsInCart = await getListProductsFromShoppingCart(req.user.shopCartId);

	productsInCart.forEach((element) => {
		subTotal += parseFloat(element.price);
	});

	subTotal = Math.floor(subTotal * 100) / 100;

	res.render('purchase/payment', {
		user: req.user.customer,
		product: productsInCart,
		publicKey: process.env.STRIPE_PUBLI_KEY,
		subTotal,
		subTotalModified: subTotal.toString().replace('.', '')
	});
});

router.get('/deleteProduct/:item_id', isLoged, async (req, res) => {
	if (req.params.item_id) {
		const productRemoved = await removeSingleProductFromCart(req.params.item_id);
		if (productRemoved.message === 'success') {
			res.redirect('/shopcart');
		} else {
			res.redirect('/shopcart');
		}
	}
});

module.exports = router;
