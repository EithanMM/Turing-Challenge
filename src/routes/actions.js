const express = require('express');
const pagination = require('pagination');
const router = express.Router();
const {
	getAllDepartments,
	getCategoriesByDepartment,
	getProductsFromShoppingCart,
	getProductsByCategorie,
	searchProduct,
	getAllProductsFromCategoryById,
	getAllProductsThatMatchSearch,
	pageIndexCreation,
	getAllCategories
} = require('../../utils/e-comerceAPI');

router.get('/departments', async (req, res) => {
	var publicObject = req.app.get('publicObject');
	let cartLenght = 0;

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

	const departments = await getAllDepartments();

	if (req.user === undefined) {
		res.render('departments', {
			departments,
			itemsAdded: cartLenght,
			money: publicObject.subtotal
		});
	} else {
		res.render('departments', {
			user: req.user.customer,
			departments,
			itemsAdded: cartLenght,
			money: req.user.subtotal
		});
	}
});

router.get('/categories', async (req, res) => {
	var publicObject = req.app.get('publicObject');
	let cartLenght = 0;

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

	const categories = await getAllCategories();
	if (req.user === undefined) {
		res.render('categories', {
			categories: categories.rows,
			itemsAdded: cartLenght,
			money: publicObject.subtotal
		});
	} else {
		res.render('categories', {
			user: req.user.customer,
			categories: categories.rows,
			itemsAdded: cartLenght,
			money: req.user.subtotal
		});
	}
});

router.get('/categories/:department_id', async (req, res) => {
	var publicObject = req.app.get('publicObject');
	let cartLenght = 0;

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

	const categoriesByDepartment = await getCategoriesByDepartment(req.params.department_id);
	if (req.user === undefined) {
		res.render('categories', {
			categories: categoriesByDepartment,
			itemsAdded: cartLenght,
			money: publicObject.subtotal
		});
	} else {
		res.render('categories', {
			user: req.user.customer,
			categories: categoriesByDepartment,
			itemsAdded: cartLenght,
			money: req.user.subtotal
		});
	}
});

router.get('/products', (req, res) => {
	res.render('products');
});

router.get('/productsFromCategory/:category_id', async (req, res) => {
	var publicObject = req.app.get('publicObject');
	let cartLenght = 0;

	const productsFromCategorie = await getAllProductsFromCategoryById(req.params.category_id, req.query.page);
	const quantities = productsFromCategorie.quantities;

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

	var paginator = new pagination.SearchPaginator({
		current: req.query.page,
		rowsPerPage: productsFromCategorie.rowsPerPage,
		totalResult: productsFromCategorie.count
	});

	var range = pageIndexCreation(paginator.getPaginationData().pageCount, req.params.category_id);

	if (req.user === undefined) {
		res.render('products', {
			result: productsFromCategorie.rows,
			range,
			quantities,
			itemsAdded: cartLenght,
			money: publicObject.subtotal
		});
	} else {
		res.render('products', {
			user: req.user.customer,
			result: productsFromCategorie.rows,
			range,
			quantities,
			itemsAdded: cartLenght,
			money: req.user.subtotal
		});
	}
});

router.get('/search/:page_number', async (req, res) => {
	var publicObject = req.app.get('publicObject');
	let cartLenght = 0;
	let productsFromSearch;

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

	if (req.body.searchBar !== undefined) {
		publicObject.searchWord = req.body.searchBar;

		if (req.body.switch !== undefined) {
			//switch: On
			productsFromSearch = await getAllProductsThatMatchSearch(
				req.body.searchBar,
				req.body.switch,
				req.params.page_number
			);
		} else {
			//Switch: Off
			productsFromSearch = await getAllProductsThatMatchSearch(
				req.body.searchBar,
				undefined,
				req.params.page_number
			);
		}
	} else {
		// Empty searchBar but with wanna keep looking through the pages.
		if (req.body.switch !== undefined) {
			//switch: On
			productsFromSearch = await getAllProductsThatMatchSearch(
				publicObject.searchWord,
				req.body.switch,
				req.params.page_number
			);
		} else {
			//Switch: Off
			productsFromSearch = await getAllProductsThatMatchSearch(
				publicObject.searchWord,
				undefined,
				req.params.page_number
			);
		}
	}

	const quantities = productsFromSearch.quantities;

	var paginator = new pagination.SearchPaginator({
		current: req.params.page_number,
		rowsPerPage: productsFromSearch.rowsPerPage,
		totalResult: productsFromSearch.count
	});

	// var range = pageIndexCreation(paginator.getPaginationData().pageCount, req.params.page_number);

	// let lastPage = paginator.getPaginationData().pageCount;
	// let currentPage = paginator.getPaginationData().current;
	// let totalPageNumber = pageIndexCreation(lastPage);
	// var range;

	// // if the length of the group is lower than the max pageCount number
	// if(currentPage + 5 < lastPage) {
	// 	range = totalPageNumber.slice(currentPage - 1, currentPage + 5);
	// } else {
	// 	//if the length of the group is higher than the max pageCount number
	// 	//obtain the element of the position when we substract 8 elements from the total lenght of the array 
	// 	let lowerLimit = totalPageNumber[lastPage - 8];

	// 	// here we obtain the numbers of the array, from the lower limit, to the max posible limit.
	// 	range = totalPageNumber.slice(lowerLimit, totalPageNumber[lastPage - 2]);
	// 	//here we decrease the last range in 1, to gain the real limit of the items obtained
	// 	lastPage = lastPage - 1;
	// }

	if (req.user === undefined) {
		if (productsFromSearch.count === 0) {
			res.render('search', {
				errorMessage: 'The product that you searched do not exists in this store.',
				itemsAdded: cartLenght,
				money: publicObject.subtotal
			});
		} else {
			res.render('search', {
				item: productsFromSearch.rows,
				itemsAdded: cartLenght,
				range,
				quantities,
				money: publicObject.subtotal
			});
		}
	} else {
		if (productsFromSearch.count === 0) {
			res.render('search', {
				user: req.user,
				errorMessage: 'The product that you searched do not exists in this store.',
				itemsAdded: cartLenght,
				money: publicObject.subtotal
			});
		} else {
			res.render('search', {
				user: req.user,
				item: productsFromSearch.rows,
				itemsAdded: cartLenght,
				range,
				quantities,
				money: publicObject.subtotal
			});
		}
	}
});

router.post('/search/:page_number', async (req, res) => {
	var publicObject = req.app.get('publicObject');
	let cartLenght = 0;
	let productsFromSearch;

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

	if (req.body.searchBar !== undefined) {
		publicObject.searchWord = req.body.searchBar;

		if (req.body.switch !== undefined) {
			//switch: On
			productsFromSearch = await getAllProductsThatMatchSearch(
				req.body.searchBar,
				req.body.switch,
				req.params.page_number
			);
		} else {
			//Switch: Off
			productsFromSearch = await getAllProductsThatMatchSearch(
				req.body.searchBar,
				undefined,
				req.params.page_number
			);
		}
	} else {
		// Empty searchBar but with wanna keep looking through the pages.
		if (req.body.switch !== undefined) {
			//switch: On
			productsFromSearch = await getAllProductsThatMatchSearch(
				publicObject.searchWord,
				req.body.switch,
				req.params.page_number
			);
		} else {
			//Switch: Off
			productsFromSearch = await getAllProductsThatMatchSearch(
				publicObject.searchWord,
				undefined,
				req.params.page_number
			);
		}
	}

	const quantities = productsFromSearch.quantities;

	var paginator = new pagination.SearchPaginator({
		current: req.params.page_number,
		rowsPerPage: productsFromSearch.rowsPerPage,
		totalResult: productsFromSearch.count
	});

	var range = pageIndexCreation(paginator.getPaginationData().pageCount, req.params.page_number);

		// var range = pageIndexCreation(paginator.getPaginationData().pageCount, req.params.page_number);

	// let lastPage = paginator.getPaginationData().pageCount;
	// let currentPage = paginator.getPaginationData().current;
	// let totalPageNumber = pageIndexCreation(lastPage);
	// var range;

	// // if the length of the group is lower than the max pageCount number
	// if(currentPage + 5 < lastPage) {
	// 	range = totalPageNumber.slice(currentPage - 1, currentPage + 5);
	// } else {
	// 	//if the length of the group is higher than the max pageCount number
	// 	//obtain the element of the position when we substract 8 elements from the total lenght of the array 
	// 	let lowerLimit = totalPageNumber[lastPage - 8];

	// 	// here we obtain the numbers of the array, from the lower limit, to the max posible limit.
	// 	range = totalPageNumber.slice(lowerLimit, totalPageNumber[lastPage - 2]);
	// 	//here we decrease the last range in 1, to gain the real limit of the items obtained
	// 	lastPage = lastPage - 1;
	// }

	if (req.user === undefined) {
		if (productsFromSearch.count === 0) {
			res.render('search', {
				errorMessage: 'The product that you searched do not exists in this store.',
				itemsAdded: cartLenght,
				money: publicObject.subtotal
			});
		} else {
			res.render('search', {
				item: productsFromSearch.rows,
				itemsAdded: cartLenght,
				range,
				quantities,
				money: publicObject.subtotal
			});
		}
	} else {
		if (productsFromSearch.count === 0) {
			res.render('search', {
				user: req.user,
				errorMessage: 'The product that you searched do not exists in this store.',
				itemsAdded: cartLenght,
				money: publicObject.subtotal
			});
		} else {
			res.render('search', {
				user: req.user,
				item: productsFromSearch.rows,
				itemsAdded: cartLenght,
				range,
				quantities,
				money: publicObject.subtotal
			});
		}
	}
});

module.exports = router;
