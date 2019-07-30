function updateQuantiy() {
	var range = document.getElementsByName('quantitySend')[0].value;
	document.getElementById('quantityLabel').textContent = range;
}

function onlyNumbers() {
	return event.charCode === 0 || /\d/.test(String.fromCharCode(event.charCode));
}

function displayButton() {
	var stock = document.getElementById('stock').textContent;
	if (stock === '0') {
		document.getElementById('addToCartBtn').style.visibility = 'hidden';
		document.getElementById('outOfStock').style.visibility = 'visible';
	} else {
		document.getElementById('outOfStock').style.visibility = 'hidden';
		document.getElementById('addToCartBtn').style.visibility = 'visible';
	}
}

function imageChange(entrySrc) {
	document.getElementById('mainImage').src = entrySrc;
}

displayButton();
