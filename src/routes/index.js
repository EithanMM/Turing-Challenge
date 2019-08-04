const express = require('express');
const pagination = require('pagination');
const {
	generateShoppingCartId,
	getAllProdcutsById,
	getProductsFromShoppingCart,
	pageIndexCreation
} = require('../../utils/e-comerceAPI');

const router = express.Router();
//Ruta de inicio.
/** Si queda tiempo cambiarlo por algo mas fresa */
router.get('/', async (req, res) => {
	var publicObject = req.app.get('publicObject');
	let cartLenght = 0;

	publicObject.status = 'none';
	publicObject.shopCartId = '';
	publicObject.subtotal = '0.00';
	res.render('presentation', { presentationState: 'yes', money: publicObject.subtotal, itemsAdded: cartLenght });
});

router.get('/select/:id', async (req, res) => {
	/* Llammamos al objeto publico*/
	var publicObject = req.app.get('publicObject');
	let cartLenght = 0;

	/* First time we run the application, this block will execute and only once. */
	if (publicObject.status === 'none') {
		const cartID = await generateShoppingCartId();
		publicObject.shopCartId = cartID.cart_id;
		publicObject.status = 'active';
	}

	if (publicObject.status === 'inactive') {
		const productsInCart = await getProductsFromShoppingCart(req.user.shopCartId);

		productsInCart.forEach((element) => {
			cartLenght += element.quantity;
		});
	}

	if (publicObject.status === 'active') {
		const productsInCart = await getProductsFromShoppingCart(publicObject.shopCartId);

		productsInCart.forEach((element) => {
			cartLenght += element.quantity;
		});
	}

	const products = await getAllProdcutsById(req.params.id);
	const quantities = products.quantities;

	var paginator = new pagination.SearchPaginator({
		current: req.params.id,
		rowsPerPage: products.rowsPerPage,
		totalResult: products.count
	});

	var range = pageIndexCreation(paginator.getPaginationData().pageCount);
	if (req.user === undefined) {
		res.render('index', {
			result: products.rows,
			range,
			quantities,
			itemsAdded: cartLenght,
			money: publicObject.subtotal
		});
	} else {
		res.render('index', {
			user: req.user,
			result: products.rows,
			success: req.flash('success'),
			error: req.flash('error'),
			range,
			quantities,
			itemsAdded: cartLenght,
			money: req.user.subtotal
		});
	}
});

module.exports = router;
