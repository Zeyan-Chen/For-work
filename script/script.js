(function ($) {
	/* =============== Selector */
	let navbar = document.querySelector('.navbar');

	/* =============== Navbar fixed */
	$(window).bind('scroll', function (params) {
		let navHeight = $(window).height() - 50
		if ($(window).scrollTop() > navHeight) {
			navbar.classList.add('fixed')
		} else {
			navbar.classList.remove('fixed')
		}
	});

	/* =============== Page Move */
	let buttons = Array.from(document.querySelectorAll('.nav-item a'));
	let scrollY = null;

	buttons.forEach(function (button) {
		console.log(button)
		button.addEventListener('click', setScroll)
	})

	function setScroll(e) {
		e.preventDefault();
		let index = buttons.indexOf(this)
		scrollY = $($(this).attr('data-page')).offset().top - 50;
		// scrollY = window.innerHeight;
	}

	function render() {
		if (scrollY != null) {
			let move = (scrollY - window.scrollY) / 10;
			window.scrollTo(0, window.scrollY + move);
			if (Math.abs(scrollY - window.scrollY) < 50) { scrollY = null; } 
		}
		requestAnimationFrame(render)
	}

	render()



	/* =============== Scroll */
	var controller = new ScrollMagic.Controller();

	new ScrollMagic.Scene({ triggerElement: '.skill-right', triggerHook: 1 })
		.setClassToggle('.skill-right', 'bounceInRight')
		.addTo(controller);

	new ScrollMagic.Scene({ triggerElement: '.skill-left', triggerHook: 1 })
		.setClassToggle('.skill-left', 'bounceInLeft')
		.addTo(controller);

	new ScrollMagic.Scene({ triggerElement: '.resume-title', triggerHook: 1 })
		.setClassToggle('.resume-title', 'bounceInDown')
		.addTo(controller);

	new ScrollMagic.Scene({ triggerElement: '.timeline', triggerHook: 1 })
		.setClassToggle('.timeline', 'bounceInDown')
		.addTo(controller);

	new ScrollMagic.Scene({ triggerElement: '.achieve-left', triggerHook: 1 })
		.setClassToggle('.achieve-left', 'bounceInLeft')
		.addTo(controller);

	new ScrollMagic.Scene({ triggerElement: '.achieve-right', triggerHook: 1 })
		.setClassToggle('.achieve-right', 'bounceInRight')
		.addTo(controller);

	new ScrollMagic.Scene({ triggerElement: '.card-columns', triggerHook: 1 })
		.setClassToggle('.card-columns', 'fadeInLeft')
		.addTo(controller);

	/* =============== 圖表 */
	$('.pie').each(function (index, element) {
		var num = +($(this).text());
		var chart = '<svg viewBox="0 0 32 32"><circle class="circle" r="16" cx="16" cy="16" style="stroke-dasharray: 10 100" /></svg>';
		$(this).html(chart);
		$(this).find('.circle').css('stroke-dasharray', num + ' 100');
		$(this).append('<span>' + num + '%</span>');
	});

	// let page1 = $('#page1').offset().top;
	// let page2 = $('#page2').offset().top;
	// let page3 = $('#page3').offset().top;

	// $('.btn-1').on('click', function (e) {
	// 	e.stopPropagation();
	// 	$('html, body').stop().animate({
	// 		scrollTop: page1
	// 	}, 1000);
	// 	return false;
	// });

	// $('.btn-2').on('click', function (e) {
	// 	e.stopPropagation();
	// 	$('html, body').stop().animate({
	// 		scrollTop: page2
	// 	}, 1000);
	// 	return false;
	// });

	// $('.btn-3').on('click', function (e) {
	// 	e.stopPropagation();
	// 	$('html, body').stop().animate({
	// 		scrollTop: page3
	// 	}, 1000);
	// 	return false;
	// });
	/* =============== 置頂 */
	//     // $('.ring_bar').click(function(e){
	//     //   e.preventDefault();
	//     //  $('html, body').animate({
	//     //     scrollTop: 0
	//     //   }, 1000);                   
	//     // });

})($);