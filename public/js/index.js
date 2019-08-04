function seeProducts() {
	var selector = document.getElementById('selector');
	var size = document.getElementById('selector').length;
	selector.style.visibility = 'hidden';
	var options = selector.options;

	for (var i = 0; i < size; i++) {
		if (options[i].innerHTML === '0') {
			document.getElementById('displayLabel-' + i).style.display = 'visible';
			document.getElementById('btnSeeProduct-' + i).style.display = 'none';
		} else {
			document.getElementById('btnSeeProduct-' + i).style.display = 'visible';
			document.getElementById('displayLabel-' + i).style.display = 'none';
		}
	}
}

seeProducts();
