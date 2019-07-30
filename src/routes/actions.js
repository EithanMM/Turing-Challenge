const express = require('express');
const pagination = require('pagination');
const {
	getAllDepartments,
	getCategoriesByDepartment,
	getProductsByCategorie,
	searchProduct,
	pageIndexCreation,
	getAllCategories
} = require('../../utils/e-comerceAPI');
const router = express.Router();

router.get('/departments', async (req, res) => {
	const departments = await getAllDepartments();
	if (req.user === undefined) {
		res.render('departments', { departments });
	} else {
		res.render('departments', { user: req.user.customer, departments });
	}
});

router.get('/categories', async (req, res) => {
	const categories = await getAllCategories();
	if (req.user === undefined) {
		res.render('categories', { categories: categories.rows });
	} else {
		res.render('categories', { user: req.user.customer, categories: categories.rows });
	}
});

router.get('/categories/:department_id', async (req, res) => {
	const categoriesByDepartment = await getCategoriesByDepartment(req.params.department_id);
	if (req.user === undefined) {
		res.render('categories', { categories: categoriesByDepartment });
	} else {
		res.render('categories', { user: req.user.customer, categories: categoriesByDepartment });
	}
});

router.get('/products', (req, res) => {
	res.render('products');
});

router.get('/products/:category_id', async (req, res) => {
	const products = await getProductsByCategorie(req.params.category_id, req.query.page, 8);
	var paginator = new pagination.SearchPaginator({
		current: req.query.page,
		rowsPerPage: 10,
		totalResult: products.count
	});

	var range = pageIndexCreation(paginator.getPaginationData().pageCount);
	objectArray = [];

	range.forEach((element) => {
		objectArray.push({ currentPage: element, category_id: req.params.category_id });
	});

	if (req.user === undefined) {
		res.render('products', { pageInfo: objectArray, products: products.rows });
	} else {
		res.render('products', {
			user: req.user.customer,
			pageInfo: objectArray,
			products: products.rows
		});
	}
});

router.post('/search', async (req, res) => {
	var result;
	if (req.body.switch !== undefined) {
		result = await searchProduct(req.body.searchBar, req.body.switch);
	}

	result = await searchProduct(req.body.searchBar);

	if (req.user === undefined) {
		if (result.count > 0) {
			res.render('search', { item: result.rows });
		} else {
			res.render('search', { errorMessage: 'The product that you searched do not exists in this store.' });
		}
	} else {
		if (result.count > 0) {
			res.render('search', { user: req.user.customer, item: result.rows });
		} else {
			res.render('search', {
				user: req.user.customer,
				errorMessage: 'The product that you searched do not exists in this store.'
			});
		}
	}
});

module.exports = router;
