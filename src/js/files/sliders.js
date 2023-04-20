/*
Документация слайдера: https://swiperjs.com/
Сниппет(HTML): swiper
*/
import Swiper, { Navigation, Pagination, Thumbs } from 'swiper';

Swiper.extendDefaults({
	a11y: {
	    prevSlideMessage: 'Предыдущий слайд',
	    nextSlideMessage: 'Следующий слайд',
	    firstSlideMessage: 'Первый слайд',
	    lastSlideMessage: 'Последний слайд',
	    paginationBulletMessage: 'Перейти к слайду №{{index}}'
	},
});

// Инициализация слайдеров
function initSliders() {
	if (document.querySelector('.c-media-slider')) {
		new Swiper('.c-media-slider', {
			modules: [Navigation],
			slidesPerView: "auto",
			spaceBetween: 16,
			navigation: {
				prevEl: '.c-media-slider__button-prev',
				nextEl: '.c-media-slider__button-next',
			},
			breakpoints: {
				768: {
					spaceBetween: 40,
				},
				992: {
					slidesPerView: 1,
					spaceBetween: 70,
				},
			},
			on: {

			}
		});
	}


	let aboutInit = false;
	let aboutSwiper;
	function aboutCard() {
		if (window.innerWidth < 1200) {
			if (!aboutInit) {
				aboutInit = true;
				aboutSwiper = new Swiper(".s-about__slider", {
					modules: [Pagination],
					slidesPerView: "auto",
					spaceBetween: 0,
					pagination: {
						el: '.s-about__slider-pagination',
						clickable: true,
					},
				});
			}
		} else if (aboutInit) {
			aboutSwiper.destroy();
			aboutInit = false;
		}
	}

	aboutCard();
	window.addEventListener("resize", function(){
		aboutCard();
	});
}
window.addEventListener("load", function (e) {
	// Запуск инициализации слайдеров
	initSliders();
});