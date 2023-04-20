import Swiper, { Navigation, Pagination, Thumbs, EffectCreative, EffectFade } from 'swiper';


var whatBackground = new Swiper(".s-what__bg", {
	modules: [Pagination, EffectFade],
	spaceBetween: 0,
	effect: 'fade',
	allowTouchMove: false,
	initialSlide: 1,
});


var whatSlidesNavigation = new Swiper(".s-what__slides-nav", {
	modules: [Thumbs],
	spaceBetween: 16,
	slidesPerView: "auto",
	breakpoints: {
    // when window width is >= 320px
    1387: {
      spaceBetween: 32,
    },
  }
});

var whatSlides = new Swiper(".s-what__slides", {
	modules: [Pagination, EffectCreative, Thumbs],
	spaceBetween: 0,
	slidesPerView: "auto",
	centeredSlides: true,
	watchSlidesProgress: true,
	loop: true,
	thumbs: {
		swiper: whatSlidesNavigation,
	},
	pagination: {
    el: '.s-what__slides-pagination',
    type: 'bullets',
		clickable: true,
  },

	effect: 'creative',
	creativeEffect: {
		limitProgress: 2,
		prev: {
			scale: 0,
			translate: ["135%", 0, 0],
		},
		next: {
			scale: 0.9,
			translate: ["135%", 0, 0],
		},
		progressMultiplier: 0.9,
	},
});



// Шторы
$(document).on("click", ".js-what_curtains_btn", function(e){
	e.preventDefault();
	let btn = $(this);
	console.log(btn);

	if(btn.hasClass("is-active")){
		btn.removeClass("is-active");
		btn.find(".s-what__card-button-descr").html("Завешаны");
		$(".s-what__curtains-1").css("animation", "whatCurtainsClose 2s steps(24) forwards");
		$(".s-what__curtains-1-2").css("animation", "whatCurtainsClose 2s steps(24) forwards");
		if($(".swiper-slide-active  .js-what_sleep_btn").hasClass("is-active")){
			$(".s-what__curtains").addClass("is-sleep");
		} else{
			$(".s-what__curtains").removeClass("is-sleep");
		}
	} else{
		btn.addClass("is-active");
		btn.find(".s-what__card-button-descr").html("Раскрыты");
		$(".s-what__curtains-1").css("animation", "whatCurtains 2s steps(24) forwards");
		$(".s-what__curtains-1-2").css("animation", "whatCurtains 2s steps(24) forwards");
		if($(".swiper-slide-active .js-what_sleep_btn").hasClass("is-active")){
			$(".s-what__curtains").addClass("is-sleep");
		} else{
			$(".s-what__curtains").removeClass("is-sleep");
		}
	}
});
// Сон
$(document).on("click", ".js-what_sleep_btn", function(e){
	e.preventDefault();
	let btn = $(this);
	
	if(btn.hasClass("is-active")){
		btn.removeClass("is-active");
		$(".s-what__curtains").removeClass("is-sleep");
		if($(".swiper-slide-active .js-what_light_btn").hasClass("is-active")){
			whatBackground.slideTo(1, 400);
			$(".s-what").attr("data-slide", 1);
		} else{
			whatBackground.slideTo(0, 400);
			$(".s-what").attr("data-slide", 0);
		}
	} else{
		btn.addClass("is-active");
		$(".s-what__curtains").addClass("is-sleep");
		if($(".swiper-slide-active  .js-what_light_btn").hasClass("is-active")){
			whatBackground.slideTo(3, 400);
			$(".s-what").attr("data-slide", 3);
		} else{
			whatBackground.slideTo(2, 400);
			$(".s-what").attr("data-slide", 2);
		}
	}
});
// Свет
$(document).on("click", ".js-what_light_btn", function(e){
	e.preventDefault();
	let btn = $(this);

	if(btn.hasClass("is-active")){
		btn.removeClass("is-active");
		btn.find(".s-what__card-button-descr").html("Выключен");
		if($(".swiper-slide-active  .js-what_sleep_btn").hasClass("is-active")){
			whatBackground.slideTo(2, 400);
			$(".s-what").attr("data-slide", 2);
		} else{
			whatBackground.slideTo(0, 400);
			$(".s-what").attr("data-slide", 0);
		}
		
	} else{
		btn.addClass("is-active");
		btn.find(".s-what__card-button-descr").html("Включен");
		if($(".swiper-slide-active  .js-what_sleep_btn").hasClass("is-active")){
			whatBackground.slideTo(3, 400);
			$(".s-what").attr("data-slide", 3);
		} else{
			whatBackground.slideTo(1, 400);
			$(".s-what").attr("data-slide", 1);
		}
		
	}
});