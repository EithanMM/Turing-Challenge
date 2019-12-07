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
		totalResult: products.count,
		pageLinks: 6
	});

		var lastPage = paginator.getPaginationData().pageCount - 1;
		var currentPage = paginator.getPaginationData().current;
		var totalPageNumber = pageIndexCreation(lastPage); //[1,...,12]
		var range; //array result to send
		var previousPage;
		var nextPage;

		//check if we can move one page backwards
		if((currentPage - 1)!= 0) {
			previousPage = currentPage - 1;
		} else { previousPage = currentPage; }

		//check if we can move one page forward
		if((currentPage + 1) <= lastPage) {
			nextPage = currentPage + 1;
		} else { nextPage = currentPage }

		// if the length of the group is lower than the max pageCount number
		if(currentPage + 2 < lastPage) {
			if(currentPage === 1) {
				range = totalPageNumber.slice(currentPage - 1, currentPage + 2);
			} else {
				range = totalPageNumber.slice(currentPage - 2, currentPage + 1);
			}
		}

		//check if the sum of the last page with the current is withing the range of 3
		if( (lastPage - currentPage) <= 2 ) {
				//we obtain the page number before the current page number
				range = totalPageNumber.slice(lastPage - 3, lastPage);
			}

	if (req.user === undefined) {
		res.render('index', {
			result: products.rows,
			range,
			previousPage,
			currentPage,
			nextPage,
			previousPage: currentPage - 1,
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
			previousPage,
			currentPage,
			nextPage,
			quantities,
			itemsAdded: cartLenght,
			money: req.user.subtotal
		});
	}
});

module.exports = router;
