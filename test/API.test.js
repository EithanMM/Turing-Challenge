jest.mock('../utils/toMock');
const API = require('../utils/e-comerceAPI');
const toMock = require('../utils/toMock');

/************************* TEST SECTION ***************************/
/*****************************************************************/

/************************ TEST I ********************************/
/************** SHOULD GET ALL PRODUCTS *************************/

test('Should get all products, filter by page and quanatity', async () => {
	const response = await API.getAllProdcuts(2, 4);
	expect(response.rows.length).toBe(4);
});

/************************ TEST II ********************************/
/************** SHOULD GET THE CATEGORIE BY PRODUCT ID **************************/

test('Should get the category by product ID', async () => {
	const response = await API.getCategorieByProdcut(1);
	expected = {
		category_id: expect.any(Number),
		department_id: expect.any(Number),
		name: expect.any(String)
	};
	expect(response[0]).toEqual(expected);
});

/************************ TEST III ********************************/
/************** SHOULD GET A CATEGORY BY ID **************************/

test('Should get a category by ID', async () => {
	const response = await API.getCategorieById(1);
	const expected = {
		category_id: expect.any(Number),
		name: expect.any(String),
		description: expect.any(String),
		department_id: expect.any(Number)
	};
	expect(response).toEqual(expected);
});

/************************ TEST IV ********************************/
/************** SHOULD GET ALL CATEGORIES **************************/

test('Should get all categories', async () => {
	const response = await API.getAllCategories();
	expect(response.count).toBe(7);
});

/************************ TEST V ********************************/
/************** SHOUL ADD AN CUSTOMER **************************/

test('Should add a new customer', async () => {
	let name = 'Personq1';
	let email = 'pq1@unexsistents.com';
	let password = '123';

	const error = {
		code: expect.any(String),
		message: expect.any(String),
		field: expect.any(String),
		status: expect.any(String)
	};

	const response = await toMock.addUser(name, email, password);
	expect(response.error).not.toEqual(error);
});

/************************ TEST VI ********************************/
/************** SHOULD GET ALL DEPARTMENTS ***********************/

test('Should get all departments', async () => {
	const response = await API.getAllDepartments();

	const expected = {
		department_id: expect.any(Number),
		name: expect.any(String),
		description: expect.any(String)
	};

	expect(response[0]).toEqual(expect.objectContaining(expected));
});

/************************ TEST VII ********************************/
/************** SHOULD A DEPARTMENT BY ID *************************/

test('Should get a department by ID', async () => {
	const response = await API.getDepartmentById(1);
	const obj = {
		department_id: expect.any(Number),
		name: expect.any(String),
		description: expect.any(String)
	};
	expect(response).toEqual(obj);
});

/************************ TEST VIII ********************************/
/************** SHOULD ALL CATEGORIES OF AN DEPARTMENT *************/

test('Should get all the categoires by an department ID', async () => {
	const response = await API.getCategoriesByDepartment(1);
	expect(response.length).toBeGreaterThan(0);
});

/************************ TEST XI ********************************/
/************** SHOULD GET ONE OR MORE PRODUCTS ******************/

test('Should get one or more products', async () => {
	const response = await API.searchProduct('Lorraine', 'off', 1);
	expect(response.count).toBeGreaterThanOrEqual(1);
});

/************************ TEST X ********************************/
/************** SHOULD GET ALL PRODUCTS BY DEPARTMENT ID ********/

test('Should get all products by apartment ID', async () => {
	const response = await API.getProductsByDepartment(1);
	expect(response.count).toBeGreaterThan(0);
});

/************************ TEST XI ********************************/
/************** SHOULD LOGIN AN EXISTING CUSTOMER *****************/

test('Should login an existing customer', async () => {
	let email = 'b@gmail.com';
	let password = '123';
	const response = await toMock.loginUser(email, password);
	expect(response.customer).not.toBeUndefined();
});

/************************ TEST XII ********************************/
/************** SHOULD GET A PRODUCT BY ID *************************/

test('Should get a product by ID', async () => {
	const response = await API.getProductById(5);
	let error = {
		code: expect.any(String),
		message: expect.any(String),
		status: expect.any(String)
	};

	expect(response).not.toEqual(error);
});

/************************ TEST XIII ********************************/
/************** SHOULD GENERATE CART ID TOKEN ***********************/

test('Should generate cart ID token', async () => {
	const response = await toMock.generateShoppingCartId();
	expect(response).not.toBeUndefined();
});

/************************ TEST XIV ********************************/
/************** SHOULD GET THE SIZES OF A PRODUCT ******************/
test('Should get the size of a product', async () => {
	const response = await API.getProductSizes(1);
	let obj = {
		attribute_name: expect.any(String),
		attribute_value_id: expect.any(Number),
		attribute_value: expect.any(String)
	};
	expect(response[0]).toEqual(obj);
});

/************************ TEST XV ********************************/
/************** SHOULD ADD THE PRODUCT TO THE CART ***************/

test('Should add a product to a cart', async () => {
	const response = await toMock.addProductToShoppingCart('1xh7q2ze08jym4pjbu', '1', 'XS');
	expect(response).not.toBeUndefined();
});

/************************ TEST XVI ********************************/
/************** SHOULD GET ALL PRODUCTS BY CATEGORIE ***************/
test('should get all products by categorie', async () => {
	const response = await API.getProductsByCategorie(1, 1, 10);
	expect(response.rows.length).toEqual(10);
});

/************************ TEST XVII ********************************/
/************** SHOULD GET ALL PRODUCTS FROM CART ******************/

test('Should get all products from shopping cart', async () => {
	const response = await toMock.getListProductsFromShoppingCart('11xh7q2ze08jynh3gsy');
	let obj = {
		item_id: expect.any(Number),
		name: expect.any(String),
		attributes: expect.any(String),
		product_id: expect.any(Number),
		image: expect.any(String),
		price: expect.any(String),
		quantity: expect.any(Number),
		subtotal: expect.any(String)
	};

	expect(response).toEqual(obj);
});

/************************ TEST XIX ********************************/
/************** SHOUD REMOVE A PRODUCT FROM THE CART **************/
test('Should remove a product from the cart', async () => {
	const response = await toMock.removeSingleProductFromCart('40408');
	expect(response.status).toBe(200);
});

/************************ TEST XX ********************************/
/************** SHOULD CLEAN THE ENTIRE CART *********************/
test('Should clean the entire cart', async () => {
	const response = await toMock.wipeOutCart('1xh7q2ze08jyny76gp');
	expect(response.status).toBe(201);
});

/****************** END OF TEST ********************************/
