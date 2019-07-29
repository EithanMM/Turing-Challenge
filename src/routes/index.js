const express = require('express');
const pagination = require('pagination');
const { getAllProdcuts } = require('../../utils/e-comerceAPI');

const router = express.Router();
//Ruta de inicio.
/** Si queda tiempo cambiarlo por algo mas fresa */
router.get('/', async (req, res) => {
	res.render('presentation');
});

router.get('/select/:id', async (req, res) => {
	const products = await getAllProdcuts(req.params.id);
	var paginator = new pagination.SearchPaginator({
		current: req.params.id,
		rowsPerPage: 20,
		totalResult: products.count
	});
	var range = paginator.getPaginationData().range;
	res.render('index', { result: products.rows, range: range });
});

module.exports = router;
