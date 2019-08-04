const request = require('request');
// const curl = require('curlrequest');
/******************* DEPARTMENTS  *********************/

const getAllDepartments = () => {
	return new Promise((resolve, reject) => {
		const url = 'https://backendapi.turing.com/departments';
		request({ url, json: true }, (error, { body }) => {
			if (error) reject(error);

			resolve(body);
		});
	});
};

const getDepartmentById = (id) => {
	return new Promise((resolve, reject) => {
		const url = 'https://backendapi.turing.com/departments/' + parseInt(id);
		request({ url, json: true }, (error, { body }) => {
			if (error) reject(error);

			resolve(body);
		});
	});
};

const getCategoriesByDepartment = (department_id) => {
	return new Promise((resolve, reject) => {
		const url = 'https://backendapi.turing.com/categories/inDepartment/' + parseInt(department_id);
		request({ url, json: true }, (error, { body }) => {
			if (error) reject(error);

			resolve(body);
		});
	});
};
/********************************************************/
/******************* CATEGORIES  *********************/

const getAllCategories = () => {
	return new Promise((resolve, reject) => {
		const url = 'https://backendapi.turing.com/categories';
		request({ url, json: true }, (error, { body }) => {
			if (error) reject(error);

			resolve(body);
		});
	});
};

const getCategorieById = (id) => {
	return new Promise((resolve, reject) => {
		const url = 'https://backendapi.turing.com/categories/' + parseInt(id);
		request({ url, json: true }, (error, { body }) => {
			if (error) reject(error);

			resolve(body);
		});
	});
};

const getCategorieByProdcut = (product_id) => {
	return new Promise((resolve, reject) => {
		const url = 'https://backendapi.turing.com/categories/inProduct/' + parseInt(product_id);
		request({ url, json: true }, (error, { body }) => {
			if (error) reject(error);

			resolve(body);
		});
	});
};

/********************************************************/

/******************* PRODUCTS  *********************/

const getAllProdcuts = (page = undefined, limit = undefined) => {
	return new Promise((resolve, reject) => {
		var url = '';

		if (page === undefined && limit === undefined) {
			url = 'https://backendapi.turing.com/products';
		} else if (page !== undefined && limit !== undefined) {
			if (isNaN(page)) return reject({ error: { status: 400, message: 'The page must be a number' } });
			if (isNaN(limit)) return reject({ error: { status: 400, message: 'The limit must be a number' } });

			url = 'https://backendapi.turing.com/products?page=' + parseInt(page) + '&limit=' + parseInt(limit);
		} else if (page !== undefined) {
			if (isNaN(page)) return reject({ error: { status: 400, message: 'The page must be a number' } });
			url = 'https://backendapi.turing.com/products?page=' + parseInt(page);
		}

		request({ url, json: true }, (error, { body }) => {
			if (error) reject(error);

			resolve(body);
		});
	});
};

const searchProduct = (product_name, all_words = undefined, page) => {
	return new Promise((resolve, reject) => {
		if (product_name === undefined) {
			return reject({ error: { status: 400, message: 'Must provide a product to search' } });
		} else {
			var url = '';
			if (all_words === 'on') {
				url =
					'https://backendapi.turing.com/products/search?query_string=' +
					product_name +
					'&all_words=on' +
					'&page=' +
					page;
			} else {
				url =
					'https://backendapi.turing.com/products/search?query_string=' +
					product_name +
					'&all_words=off' +
					'&page=' +
					page;
			}
		}

		request({ url, json: true }, (error, { body }) => {
			if (error) reject(error);

			resolve(body);
		});
	});
};

const getProductsByDepartment = (department_id) => {
	return new Promise((resolve, reject) => {
		const url = 'https://backendapi.turing.com/products/inDepartment/' + parseInt(department_id);
		request({ url, json: true }, (error, { body }) => {
			if (error) reject(error);

			resolve(body);
		});
	});
};

const getProductsByCategorie = (category_id, page = undefined, limit = undefined) => {
	return new Promise((resolve, reject) => {
		var url = '';
		if (page === undefined && limit === undefined) {
			url = 'https://backendapi.turing.com/products/inCategory/' + parseInt(category_id);
		} else if (page !== undefined && limit !== undefined) {
			if (isNaN(page)) return reject({ error: { status: 400, message: 'The page must be a number' } });
			if (isNaN(limit)) return reject({ error: { status: 400, message: 'The limit must be a number' } });

			url =
				'https://backendapi.turing.com/products/inCategory/' +
				parseInt(category_id) +
				'?page=' +
				parseInt(page) +
				'&limit=' +
				parseInt(limit);
		} else if (page !== undefined) {
			if (isNaN(page)) return reject({ error: { status: 400, message: 'The page must be a number' } });
			url =
				'https://backendapi.turing.com/products/inCategory/' +
				parseInt(category_id) +
				'?page=' +
				parseInt(page);
		}

		request({ url, json: true }, (error, { body }) => {
			if (error) reject(error);

			resolve(body);
		});
	});
};

const getProductById = (id) => {
	return new Promise((resolve, reject) => {
		const url = 'https://backendapi.turing.com/products/' + parseInt(id);
		request({ url, json: true }, (error, { body }) => {
			if (error) reject(error);

			resolve(body);
		});
	});
};

const getProductSizes = (id) => {
	return new Promise((resolve, reject) => {
		const url = 'https://backendapi.turing.com/attributes/inProduct/' + parseInt(id);
		request({ url, json: true }, (error, { body }) => {
			if (error) reject(error);

			const sizes = [];
			body.forEach((element) => {
				if (element.attribute_name === 'Size') {
					sizes.push(element);
				}
			});

			resolve(sizes);
		});
	});
};

/********************************************************/

/******************* USERS  *********************/

const addUser = (name, email, password) => {
	return new Promise((resolve, reject) => {
		const url = 'https://backendapi.turing.com/customers';
		request.post(
			{
				url,
				json: true,
				form: {
					name,
					email,
					password
				}
			},
			(error, httpresponse, body) => {
				if (error) reject(error);
				console.log(httpresponse);
				resolve(body);
			}
		);
	});
};

const loginUser = (email, password) => {
	return new Promise((resolve, reject) => {
		const url = 'https://backendapi.turing.com/customers/login';
		request.post(
			{
				url,
				json: true,
				form: {
					email,
					password
				}
			},
			(error, { body }) => {
				if (error) reject(error);

				resolve(body);
			}
		);
	});
};

const obtainUser = (user) => {
	return new Promise((resolve, reject) => {
		const url = 'https://backendapi.turing.com/customer';
		request(
			{
				url,
				json: true,
				headers: {
					'USER-KEY': user.accessToken
				}
			},
			(error, { body }) => {
				if (error) reject(error);

				resolve(body);
			}
		);
	});
};
/********************************************************/
/******************* SHOPPING-CART  *********************/

const generateShoppingCartId = () => {
	return new Promise((resolve, reject) => {
		const url = 'https://backendapi.turing.com/shoppingcart/generateUniqueId';
		request({ url, json: true }, (error, { body }) => {
			if (error) reject(error);

			resolve(body);
		});
	});
};

const addProductToShoppingCart = (cart_id, product_id, attributes) => {
	return new Promise((resolve, reject) => {
		const url = 'https://backendapi.turing.com/shoppingcart/add';
		request.post(
			{
				url,
				json: true,
				form: {
					cart_id,
					product_id,
					attributes
				}
			},
			(error, { body }) => {
				if (error) reject(error);

				resolve(body);
			}
		);
	});
};

const saveProductForLater = (item_id) => {
	return new Promise((resolve, reject) => {
		const url = 'https://backendapi.turing.com/shoppingcart/saveForLater/' + parseInt(item_id);
		request({ url }, (error, response, body) => {
			if (error) reject(error);

			if (response.statusCode === 200) {
				resolve({ message: 'success' });
			}

			if (response.statusCode === 400) {
				resolve({ message: 'failure' });
			}
		});
	});
};

const getListProductsFromShoppingCart = (cart_id) => {
	return new Promise((resolve, reject) => {
		const url = 'https://backendapi.turing.com/shoppingcart/getSaved/' + cart_id;
		request({ url, json: true }, (error, { body }) => {
			if (error) reject(error);

			resolve(body);
		});
	});
};

/* this one returns teh sub total of everything in the cart */
const getProductsFromShoppingCart = (cart_id) => {
	return new Promise((resolve, reject) => {
		const url = 'https://backendapi.turing.com/shoppingcart/' + cart_id;
		request({ url, json: true }, (error, { body }) => {
			if (error) reject(error);

			resolve(body);
		});
	});
};

const removeSingleProductFromCart = (item_id) => {
	return new Promise((resolve, reject) => {
		const url = 'https://backendapi.turing.com/shoppingcart/removeProduct/' + parseInt(item_id);
		request.delete({ url }, (error, response, body) => {
			if (error) reject(error);

			if (response.statusCode === 200) {
				resolve({ message: 'success' });
			}

			if (response.statusCode === 400) {
				resolve({ message: 'failure' });
			}
		});
	});
};

const wipeOutCart = (cart_id) => {
	return new Promise((resolve, reject) => {
		const url = 'https://backendapi.turing.com/shoppingcart/empty/' + cart_id;
		request.delete({ url }, (error, response, body) => {
			if (error) reject(error);

			if (response.statusCode === 200 || response.statusCode === 201) {
				resolve({ message: 'success' });
			}

			if (response.statusCode === 400) {
				resolve({ message: 'failure' });
			}
		});
	});
};

/********************************************************/
/******************* HELPERS  **************************/
//Helper
const pageIndexCreation = (last_value, category_id = undefined) => {
	let result = [];
	if (category_id !== undefined) {
		for (var i = 1; i <= last_value; i++) {
			result.push({ category: category_id, value: i });
		}
	} else {
		for (var i = 1; i <= last_value; i++) {
			result.push(i);
		}
	}
	return result;
};

const getAllProdcutsById = async (page_number) => {
	var result = { count: 0, rowsPerPage: 8, rows: [], quantities: [] };
	const products = await getAllProdcuts(page_number, result.rowsPerPage);
	result.count = products.count;
	//console.log(products.rows[0].product_id);
	for (let i = 0; i < result.rowsPerPage; i++) {
		var item = await getProductById(products.rows[i].product_id);
		result.rows.push(item);
		result.quantities.push(item.display);
	}
	return result;
};

const getAllProductsFromCategoryById = async (categorie_id, page_number) => {
	var result = { count: 0, rowsPerPage: 8, rows: [], quantities: [] };
	let tam = 0;
	const products = await getProductsByCategorie(categorie_id, page_number, result.rowsPerPage);

	/* If the rows count from the result are less than the 'rowsPerPage attribute' */
	if (products.rows.length < result.rowsPerPage) {
		tam = products.rows.length;
	} else {
		tam = result.rowsPerPage;
	}

	result.count = products.count;

	for (let i = 0; i < tam; i++) {
		var item = await getProductById(products.rows[i].product_id);
		result.rows.push(item);
		result.quantities.push(item.display);
	}
	return result;
};

const getAllProductsThatMatchSearch = async (product_name, all_words = undefined, page) => {
	var result = { count: 0, rowsPerPage: 8, rows: [], quantities: [] };
	let tam = 0;
	const products = await searchProduct(product_name, all_words, page);

	if (products.count < result.rowsPerPage) tam = products.count;
	else tam = result.rowsPerPage;

	result.count = products.count;

	for (let i = 0; i < tam; i++) {
		var item = await getProductById(products.rows[i].product_id);
		result.rows.push(item);
		result.quantities.push(item.display);
	}
	return result;
};
/********************************************************/

// getAllProductsFromCategoryById(1, 3)
// 	.then((result) => {
// 		console.log(result);
// 	})
// 	.catch((e) => {
// 		console.log(e);
// 	});

// const test = async () => {
// 	let foo;
// 	let product;
// 	//1xh7q2ze08jyuq4zf7
// 	for (var i = 0; i < 2; i++) {
// 		product = await addProductToShoppingCart('1xh7q2ze08jyuq4zf7', '2', 'S');
// 	}
// 	//await saveProductForLater(product[0].item_id);
// 	foo = await getProductsFromShoppingCart('1xh7q2ze08jyuq4zf7');
// 	console.log(foo);
// 	await wipeOutCart('1xh7q2ze08jyuq4zf7');
// };

// test();

// getAllProductsThatMatchSearch('animal', 'on', 1)
// 	.then((result) => {
// 		console.log(result);
// 	})
// 	.catch((e) => {
// 		console.log(e);
// 	});

// wipeOutCart('1xh7q2ze08jyw0vwbh')
// 	.then((result) => {
// 		console.log(result);
// 	})
// 	.catch((e) => {
// 		console.log(e);
// 	});

module.exports = {
	getAllDepartments,
	getDepartmentById,
	getCategoriesByDepartment,
	getAllCategories,
	getCategorieById,
	getAllProductsFromCategoryById,
	getCategorieByProdcut,
	getAllProdcuts,
	getAllProdcutsById,
	getProductById,
	getProductsByCategorie,
	getProductSizes,
	searchProduct,
	getProductsByDepartment,
	addUser,
	loginUser,
	obtainUser,
	generateShoppingCartId,
	getAllProductsThatMatchSearch,
	addProductToShoppingCart,
	getListProductsFromShoppingCart,
	getProductsFromShoppingCart,
	saveProductForLater,
	removeSingleProductFromCart,
	wipeOutCart,

	pageIndexCreation
};
