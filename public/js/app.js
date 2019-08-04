function updateQuantiy() {
	var range = document.getElementsByName('quantitySend')[0].value;
	document.getElementById('quantityLabel').textContent = range;
}

function doSomething() {
	var cartImage = $('#cartImg');
	var mainImage = $('#mainImage');
	if (cartImage) {
		var clonedImage = mainImage.clone();
		clonedImage.addClass('zoom').appendTo('body');
		setTimeout(function() {
			$('.zoom').remove();
		}, 1000);
	} else {
		alert('No detecto la imagen del carrito');
	}
}

function doClick(word) {
	var stock = document.getElementById('stock').textContent;
	var quantity = document.getElementById('quantity').value;
	if (word === 'up') {
		if (parseInt(stock) > parseInt(quantity)) {
			var res = parseInt(quantity) + 1;
			document.getElementById('quantity').value = res;
		}
	} else {
		if (parseInt(quantity) > 1) {
			var res = parseInt(quantity) - 1;
			document.getElementById('quantity').value = res;
		}
	}
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
