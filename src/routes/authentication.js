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
	removeSingleProductFromCart,
	wipeOutCart,
	getProductsFromShoppingCart
} = require('../../utils/e-comerceAPI');

const { isLoged } = require('../lib/sessionKeeper');
const router = express.Router();

router.get('/signin', async (req, res) => {
	var publicObject = req.app.get('publicObject');
	let cartLenght = 0;

	const productsInCart = await getProductsFromShoppingCart(publicObject.shopCartId);

	productsInCart.forEach((element) => {
		cartLenght += element.quantity;
	});

	res.render('login/signin', {
		success: req.flash('success'),
		error: req.flash('error'),
		itemsAdded: cartLenght,
		money: publicObject.subtotal
	});
});

router.post('/signin', (req, res, next) => {
	passport.authenticate('local.signin', {
		//proceso de autenticacion
		successRedirect: '/select/1',
		failureRedirect: '/signin',
		failureFlash: true
	})(req, res, next);
});

router.get('/signup', async (req, res) => {
	var publicObject = req.app.get('publicObject');
	let cartLenght = 0;

	/*This means that the customer is using the public account. */
	if (publicObject.status === 'active') {
		const productsInCart = await getProductsFromShoppingCart(publicObject.shopCartId);

		productsInCart.forEach((element) => {
			cartLenght += element.quantity;
		});

		res.render('login/signup', {
			success: req.flash('success'),
			error: req.flash('error'),
			itemsAdded: cartLenght,
			money: publicObject.money
		});
	}
});

router.post(
	'/signup',
	passport.authenticate('local.signup', {
		successRedirect: '/select/1',
		failureRedirect: '/signup',
		failureFlash: true
	})
);

router.get('/signout', isLoged, async (req, res) => {
	var publicObject = req.app.get('publicObject');
	const status = await wipeOutCart(req.user.shopCartId);

	if (status.message === 'success') {
		req.logOut();
		publicObject.status = 'active';
		publicObject.subTotal = '0.00';
		res.redirect('/signin');
	}
});

router.get('/index/cart/:id', async (req, res) => {
	var publicObject = req.app.get('publicObject');
	let cartLenght = 0;

	const product = await getProductById(req.params.id);

	if (!product) res.redirect('/index/1', { error: req.flash('error', product.error.message) });
	const sizes = await getProductSizes(req.params.id);

	if (req.user === undefined) {
		const productsInCart = await getProductsFromShoppingCart(publicObject.shopCartId);

		productsInCart.forEach((element) => {
			cartLenght += element.quantity;
		});

		res.render('purchase/product', {
			product,
			sizes,
			money: publicObject.subtotal,
			itemsAdded: cartLenght,
			discount: product.discounted_price
		});
	} else {
		const productsInCart = await getProductsFromShoppingCart(req.user.shopCartId);

		productsInCart.forEach((element) => {
			cartLenght += element.quantity;
		});

		res.render('purchase/product', {
			user: req.user,
			product,
			sizes,
			money: req.user.subtotal,
			itemsAdded: cartLenght,
			discount: product.discounted_price
		});
	}
});

router.post('/index/cart/add', async (req, res) => {
	var publicObject = req.app.get('publicObject');
	const order = req.body;
	let totalAmountMoney = 0;

	if (publicObject.status === 'active') {
		for (let i = 0; i < parseInt(order.Quantity); i++) {
			await addProductToShoppingCart(publicObject.shopCartId, order.Id, order.sizeSend);
		}
		const productsInCart = await getProductsFromShoppingCart(publicObject.shopCartId);

		productsInCart.forEach((element) => {
			totalAmountMoney += parseFloat(element.subtotal);
		});

		publicObject.subtotal = totalAmountMoney.toFixed(2);

		res.redirect('/select/1');
	}

	if (publicObject.status === 'inactive') {
		for (let i = 0; i < parseInt(order.Quantity); i++) {
			await addProductToShoppingCart(req.user.shopCartId, order.Id, order.sizeSend);
		}
		const productsInCart = await getProductsFromShoppingCart(req.user.shopCartId);

		productsInCart.forEach((element) => {
			totalAmountMoney += parseFloat(element.subtotal);
		});

		req.user.subtotal = totalAmountMoney.toFixed(2);

		res.redirect('/select/1');
	}
});

router.post('/charge', isLoged, async (req, res) => {
	var publicObject = req.app.get('publicObject');
	let cartLenght = 0;

	const productsInCart = await getProductsFromShoppingCart(req.user.shopCartId);

	productsInCart.forEach((element) => {
		cartLenght += element.quantity;
	});

	await stripe.customers
		.create({
			email: req.body.stripeEmail,
			source: req.body.stripeToken
		})
		.then((customer) =>
			stripe.charges.create({
				amount: parseInt(req.user.subtotal.replace('.', '')),
				description: req.body.description,
				currency: 'usd',
				customer: customer.id
			})
		)
		.then(async (charge) => {
			generateEmail(req.body.stripeEmail, productsInCart, req.user.subtotal);

			await wipeOutCart(req.user.shopCartId);
			publicObject.subtotal = '0.00';
			req.user.subtotal = '0.00';

			res.render('purchase/successpayment', {
				user: req.user.customer,
				money: req.user.subtotal,
				itemsAdded: 0
			});
		});
});

router.get('/shopCart', async (req, res) => {
	var publicObject = req.app.get('publicObject');
	let productsInCart;
	let cartLenght = 0;
	let totalAmountMoney = 0;

	if (publicObject.status === 'active') {
		productsInCart = await getProductsFromShoppingCart(publicObject.shopCartId);

		productsInCart.forEach((element) => {
			cartLenght += element.quantity;
		});
	}

	if (publicObject.status === 'inactive') {
		productsInCart = await getProductsFromShoppingCart(req.user.shopCartId);

		productsInCart.forEach((element) => {
			cartLenght += element.quantity;
		});
	}

	if (req.user === undefined) {
		res.render('purchase/payment', {
			product: productsInCart,
			publicKey: process.env.STRIPE_PUBLI_KEY,
			money: publicObject.subtotal,
			subTotal: publicObject.subtotal,
			itemsAdded: cartLenght,
			subTotalModified: publicObject.subtotal.toString().replace('.', '')
		});
	} else {
		res.render('purchase/payment', {
			user: req.user,
			product: productsInCart,
			publicKey: process.env.STRIPE_PUBLI_KEY,
			money: req.user.subtotal,
			subTotal: req.user.subtotal,
			itemsAdded: cartLenght,
			subTotalModified: req.user.subtotal.toString().replace('.', '')
		});
	}
});

router.get('/deleteProduct/:item_id', async (req, res) => {
	if (req.params.item_id) {
		var publicObject = req.app.get('publicObject');
		let productsInCart;
		let totalAmountMoney = 0;

		const productRemoved = await removeSingleProductFromCart(req.params.item_id);

		if (publicObject.status === 'active') {
			productsInCart = await getProductsFromShoppingCart(publicObject.shopCartId);

			productsInCart.forEach((element) => {
				totalAmountMoney += parseFloat(element.subtotal);
			});

			publicObject.subtotal = totalAmountMoney.toFixed(2);
		}

		if (publicObject.status === 'inactive') {
			productsInCart = await getProductsFromShoppingCart(req.user.shopCartId);

			productsInCart.forEach((element) => {
				totalAmountMoney += parseFloat(element.subtotal);
			});

			req.user.subtotal = totalAmountMoney.toFixed(2);
		}

		if (productRemoved.message === 'success') {
			res.redirect('/shopcart');
		} else {
			res.redirect('/shopcart');
		}
	}
});

module.exports = router;
