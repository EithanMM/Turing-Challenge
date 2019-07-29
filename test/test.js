const {
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
} = require('../../utils/e-comerceAPI');

/************************* TEST SECTION ***************************/
/*****************************************************************/

/************************ TEST I ********************************/
/************** SHOULD GET ALL PRODUCTS *************************/

// getAllProdcuts(2, 4)
// 	.then((result) => {
// 		console.log(result);
// 	})
// 	.catch((e) => {
// 		console.log(e);
// 	});

/************************ TEST II ********************************/
/************** SHOULD GET THE CATEGORIE BY PRODUCT ID **************************/

// getCategorieByProdcut(1)
// 	.then((result) => {
// 		console.log(result);
// 	})
// 	.catch((e) => {
// 		console.log(e);
// 	});

/************************ TEST III ********************************/
/************** SHOULD GET A CATEGORY BY ID **************************/

// getCategorieById(1)
// 	.then((result) => {
// 		console.log(result);
// 	})
// 	.catch((e) => {
// 		console.log(e);
// 	});

/************************ TEST IV ********************************/
/************** SHOUL GET ALL CATEGORIES **************************/

// getAllCategories()
// 	.then((result) => {
// 		console.log(result);
// 	})
// 	.catch((e) => {
// 		console.log(e);
// 	});

/************************ TEST V ********************************/
/************** SHOUL ADD AN CUSTOMER **************************/

// addUser('b', 'b@gmail.com', '123')
// 	.then((result) => {
// 		console.log(result);
// 	})
// 	.catch((e) => {
// 		console.log(e);
// 	});

/************************ TEST VI ********************************/
/************** SHOULD GET ALL DEPARTMENTS ***********************/

// getAllDepartments()
// 	.then((result) => {
// 		console.log(result);
// 	})
// 	.catch((e) => {
// 		console.log(e);
// 	});

/************************ TEST VII ********************************/
/************** SHOULD A DEPARTMENT BY ID *************************/

// getDepartmentById('1')
// 	.then((result) => {
// 		console.log(result);
// 	})
// 	.catch((e) => {
// 		console.log(e);
// 	});

/************************ TEST VIII ********************************/
/************** SHOULD ALL CATEGORIES OF AN DEPARTMENT *************/

// getCategoriesByDepartment(1)
// 	.then((result) => {
// 		console.log(result);
// 	})
// 	.catch((e) => {
// 		console.log(e);
// 	});

/************************ TEST XI ********************************/
/************** SHOULD GET ONE OR MORE PRODUCTS ******************/

// searchProduct('Lorraine', 'off')
// 	.then((result) => {
// 		console.log(result);
// 	})
// 	.catch((e) => {
// 		console.log(e);
// 	});

/************************ TEST X ********************************/
/************** SHOULD GET ALL PRODUCTS BY DEPARTMENT ID ********/

// getProductsByDepartment(1)
// 	.then((result) => {
// 		console.log(result);
// 	})
// 	.catch((e) => {
// 		console.log(e);
// 	});

/************************ TEST XI ********************************/
/************** SHOULD LOGIN AN EXISTING CUSTOMER *****************/

// loginUser('b@gmail.com', '123')
// 	.then((result) => {
// 		console.log(result);
// 	})
// 	.catch((e) => {
// 		console.log(e);
// 	});

/************************ TEST XII ********************************/
/************** SHOULD GET A PRODUCT BY ID *************************/

// getProductById(5)
// 	.then((result) => {
// 		console.log(result);
// 	})
// 	.catch((e) => {
// 		console.log(e);
// 	});

/************************ TEST XIII ********************************/
/************** SHOULD GENERATE CART ID TOKEN ***********************/

// generateShoppingCartId()
// 	.then((result) => {
// 		console.log(result);
// 	})
// 	.catch((e) => {
// 		console.log(e);
// 	});

/************************ TEST XIV ********************************/
/************** SHOULD GET THE SIZES OF A PRODUCT ******************/

// getProductSizes(1)
// 	.then((result) => {
// 		console.log(result);
// 	})
// 	.catch((e) => {
// 		console.log(e);
// 	});

/************************ TEST XV ********************************/
/************** SHOULD ADD THE PRODUCT TO THE CART ***************/

// addProductToShoppingCart('1xh7q2ze08jym4pjbu', '1', 'XS')
// 	.then((result) => {
// 		console.log(result);
// 	})
// 	.catch((e) => {
// 		console.log(e);
// 	});

/************************ TEST XVI ********************************/
/************** SHOULD SAVE A PRODCUT FOR LATER *******************/

// saveProductForLater(40320)
// 	.then((result) => {
// 		console.log(result);
// 	})
// 	.catch((e) => {
// 		console.log(e);
// 	});

/************************ TEST XVII ********************************/
/************** SHOULD GET ALL PRODUCTS BY CATEGORIE ***************/
//support pagenumber and limit.
// getProductsByCategorie(1, 1, 10)
// 	.then((result) => {
// 		console.log(result);
// 	})
// 	.catch((e) => {
// 		console.log(e);
// 	});

/************************ TEST XVIII ********************************/
/************** SHOULD GET ALL PRODUCTS ****************************/

// getListProductsFromShoppingCart('1xh7q2ze08jynh3gsy')
// 	.then((result) => {
// 		console.log(result);
// 	})
// 	.catch((e) => {
// 		console.log(e);
// 	});

/************************ TEST XIX ********************************/
/************** SHOUD REMOVE A PRODUCT FROM THE CART **************/

// removeSingleProductFromCart('40408')
// 	.then((result) => {
// 		console.log(result);
// 	})
// 	.catch((e) => {
// 		console.log(e);
// 	});

/************************ TEST XX ********************************/
/************** SHOULD CLEAN THE ENTIRE CART *********************/

// wipeOutCart('1xh7q2ze08jyny76gp')
// 	.then((result) => {
// 		console.log(result);
// 	})
// 	.catch((e) => {
// 		console.log(e);
// 	});

/****************** END OF TEST ********************************/
