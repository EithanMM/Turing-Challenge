const addUser = (name, email, password) => {
	return Promise.resolve({
		customer: {
			customer_id: 89146,
			name: 'Personq1',
			email: 'pq1@unexsistent.com',
			address_1: null,
			address_2: null,
			city: null,
			region: null,
			postal_code: null,
			shipping_region_id: 1,
			credit_card: null,
			day_phone: null,
			eve_phone: null,
			mob_phone: null
		},
		accessToken:
			'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21lcl9pZCI6ODkxNDYsIm5hbWUiOiJQZXJzb25xMSIsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTU2ODk0MzAwOCwiZXhwIjoxNTY5MDI5NDA4fQ.IMAW2wBSNI-1GgKe1cTab1GTNZDiKtpZ_2uDM9jREqI'
	});
};

const generateShoppingCartId = () => {
	return Promise.resolve('1xh7q2ze08k0rgd9ed');
};

const loginUser = (email, password) => {
	return Promise.resolve({
		customer: {
			customer_id: 89146,
			name: 'Personq1',
			email: 'pq1@unexsistent.com',
			address_1: null,
			address_2: null,
			city: null,
			region: null,
			postal_code: null,
			shipping_region_id: 1,
			credit_card: null,
			day_phone: null,
			eve_phone: null,
			mob_phone: null
		},
		accessToken:
			'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21lcl9pZCI6ODkxNDYsIm5hbWUiOiJQZXJzb25xMSIsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTU2ODk0MzAwOCwiZXhwIjoxNTY5MDI5NDA4fQ.IMAW2wBSNI-1GgKe1cTab1GTNZDiKtpZ_2uDM9jREqI'
	});
};

const addProductToShoppingCart = (cart_id, product_id, attributes) => {
	return Promise.resolve({
		item_id: 2,
		name: "Arc d'Triomphe",
		attributes,
		product_id,
		price: '14.99',
		quantity: 1,
		image: 'arc-d-triomphe.gif',
		subtotal: '14.99'
	});
};

const getListProductsFromShoppingCart = async (categorie_id, page_number) => {
	return Promise.resolve({
		item_id: 40352,
		name: 'Galileo',
		attributes: 'S',
		product_id: 22,
		image: 'galileo.gif',
		price: '14.99',
		quantity: 2,
		subtotal: '29.98'
	});
};

const removeSingleProductFromCart = (item_id) => {
	return Promise.resolve({ status: 200 });
};

const wipeOutCart = (cart_id) => {
	return Promise.resolve({ status: 201 });
};

const getAllProdcuts = (page = undefined, limit = undefined) => {};

module.exports = {
	addUser,
	generateShoppingCartId,
	addProductToShoppingCart,
	getAllProdcuts,
	loginUser,
	getListProductsFromShoppingCart,
	removeSingleProductFromCart,
	wipeOutCart
};
