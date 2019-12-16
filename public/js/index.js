$(document).ready(function () {

	/*Function to hide or show buttons in the index page.*/
	function seeProducts() {
		var size = $('.selector').children('option').length;
		var options = $('.selector').children('option');

		 for(let i = 0; i< size; i++) {
			if(options[i].value == 0) { $('#btn-see-product-'+i+'').hide(); } 
			else { $('#btn-out-of-stock-'+i+'').hide(); }
		 }

		$('.selector').hide();

		/* Animations */
		$('.js-animation-1').addClass('animated fadeInRightBig');

		$('.svg-cart-logo').hover(function () {
			//handleIn
			$('.js--animation-4').addClass('animated heartBeat');
		}, function () {
			//handleOut
			$('.js--animation-4').removeClass('animated heartBeat');
		});

	}

	//|| (window.innerWidth > 576 && window.innerWidth < 768)
	if (window.innerWidth < 576 ) {
		/*Function to trigger the sticky navigation bar */
		$('.js--section-index').waypoint(function (direction) {
			if (direction == "down") {
				$('header').addClass('sticky');
			}
			else {
				$('header').removeClass('sticky');
			}
		}, {
			offset: '20%' //this function will trigger 60px before it hits 'js--section-features'
		});
	}

	//transition for page changing
	$('.js--page-number').click(function () {
		var obj = $('.js-animation-1');
		obj.addClass('js-shade-1');
		obj.addClass('animated fadeOutDown')
	});



	$('.js-search-icon').click(function() {
		alert("toque el icono de busqueda");
	})



	seeProducts();

});


