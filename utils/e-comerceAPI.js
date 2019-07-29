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

const searchProduct = (product_name, all_words = undefined) => {
	return new Promise((resolve, reject) => {
		if (product_name === undefined) {
			return reject({ error: { status: 400, message: 'Must provide a product to search' } });
		} else {
			var url = '';
			var url = '';
			if (all_words === 'on') {
				url = 'https://backendapi.turing.com/products/search?query_string=' + product_name + '&all_words=on';
			} else {
				url = 'https://backendapi.turing.com/products/search?query_string=' + product_name + '&all_words=off';
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

			if (response.statusCode === 200) {
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
const pageIndexCreation = (last_value, category_id) => {
	let result = [];
	for (var i = 1; i <= last_value; i++) {
		result.push(i);
	}
	return result;
};
/********************************************************/
module.exports = {
	getAllDepartments,
	getDepartmentById,
	getCategoriesByDepartment,
	getAllCategories,
	getCategorieById,
	getCategorieByProdcut,
	getAllProdcuts,
	getProductById,
	getProductsByCategorie,
	getProductSizes,
	searchProduct,
	getProductsByDepartment,
	addUser,
	loginUser,
	obtainUser,
	generateShoppingCartId,
	addProductToShoppingCart,
	getListProductsFromShoppingCart,
	saveProductForLater,
	removeSingleProductFromCart,
	wipeOutCart,

	pageIndexCreation
};
