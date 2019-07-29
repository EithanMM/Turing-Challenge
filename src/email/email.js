const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENGRID_API_KEY);

const generateEmail = (email, productsInCart, subTotal) => {
	const resp = buildEmailContent(productsInCart, subTotal);

	const msg = {
		to: email,
		from: 'eithan.mndez@gmail.com',
		subject: 'Sending with Twilio SendGrid is Fun',
		text: 'and easy to do anywhere, even with Node.js',
		html: resp
	};
	sendPaymentEmail(msg);
};

const buildEmailContent = (productsList, subTotal) => {
	var header =
		'<html lang="en">' +
		'<head>' +
		'<meta charset="UTF-8">' +
		'<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">' +
		'<script src="https://kit.fontawesome.com/0fc59622db.js"></script>' +
		'<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">' +
		'<style>' +
		'table{ font-family: arial, sans-serif; border-collapse: collapse; width: 30%; }, td, th{  border: 1px solid #dddddd; text-align: left; padding: 8px; }, tr:nth-child(even){  background-color: #dddddd; }' +
		'</style>' +
		'</head>';

	var body =
		'<div class="container">' +
		'<body>' +
		'<header class="w3-container w3-teal">' +
		'<h1>E-commerce Application - Payment Details</h1>' +
		'</header>' +
		'<table>' +
		'<thead class="thead-dark">' +
		'<th scope="col">Product</th>' +
		'<th scope="col">Price</th>' +
		'</thead>' +
		'<tbody>';
	productsList.forEach((element) => {
		body += '<tr><td>' + element.name + '</td><td>' + element.price + '</td></tr>';
	});
	body +=
		'</tbody>' +
		'</table>' +
		'<hr>' +
		'<div class="row">' +
		'<div class="col-md-2">' +
		'<h3>Subtotal:</h3>' +
		'</div>' +
		'<div class="col-md-2">' +
		'<h3>$' +
		subTotal +
		'</h3>' +
		'</div>' +
		'</div>' +
		'</body>' +
		'</div>';

	var footer =
		'<div class="container">' +
		'<hr>' +
		'<p>This is not a real payment, only a simulation, and its only for test purposes.</p>' +
		'</div>';
	const html = header + body + footer;
	return html;
};

const sendPaymentEmail = (options) => {
	sgMail.send(options);
};

module.exports = { generateEmail };
