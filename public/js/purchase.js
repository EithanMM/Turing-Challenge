function checkStockValue() {
	var subtotal = document.getElementById('totalLabel').textContent;
	if (subtotal === '0') {
		document.getElementById('paymentBtn').style.display = 'none';
	}
}

checkStockValue();
