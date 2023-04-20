import { gsap, ScrollTrigger, Draggable } from "gsap/all.js";
gsap.registerPlugin(ScrollTrigger, Draggable, InertiaPlugin); 

import Swiper, { Navigation, Pagination, Thumbs, EffectCreative, EffectFade } from 'swiper';



let automationSection = document.querySelector("[data-automation-slide]");
let currentSlide =  Number(automationSection.getAttribute("data-automation-slide"));
let buttons = document.querySelectorAll(".s-automation__bar-button");
let buttonsPrev = document.querySelectorAll(".s-automation__bar-btn.is-prev");
let buttonsNext = document.querySelectorAll(".s-automation__bar-btn.is-next");
let buttonsBar = document.querySelectorAll(".s-automation__bar-button-item");
let slideBackgrounds = document.querySelectorAll(".s-automation__bg-item");
let slideContents = document.querySelectorAll(".s-automation__content-item");

if(buttons.length){

	function prevAutomationSlide(){
		let prevSlide = currentSlide-1;

		if(prevSlide >= 0){
			buttonsPrev[currentSlide].classList.remove("is-active");
			buttonsPrev[prevSlide].classList.add("is-active");

			buttonsNext[currentSlide].classList.remove("is-active");
			buttonsNext[prevSlide].classList.add("is-active");

			buttonsBar[currentSlide].classList.remove("is-active");
			buttonsBar[prevSlide].classList.add("is-active");

			slideBackgrounds[currentSlide].classList.remove("is-active");
			slideBackgrounds[prevSlide].classList.add("is-active");

			slideContents[currentSlide].classList.remove("is-active");
			slideContents[prevSlide].classList.add("is-active");


			automationSection.setAttribute("data-automation-slide", prevSlide);

			currentSlide--;
		} else if(prevSlide < 0){
			currentSlide = 0;
			prevSlide = buttonsBar.length-1;

			buttonsPrev[currentSlide].classList.remove("is-active");
			buttonsPrev[prevSlide].classList.add("is-active");

			buttonsNext[currentSlide].classList.remove("is-active");
			buttonsNext[prevSlide].classList.add("is-active");

			buttonsBar[currentSlide].classList.remove("is-active");
			buttonsBar[prevSlide].classList.add("is-active");

			slideBackgrounds[currentSlide].classList.remove("is-active");
			slideBackgrounds[prevSlide].classList.add("is-active");

			slideContents[currentSlide].classList.remove("is-active");
			slideContents[prevSlide].classList.add("is-active");

			automationSection.setAttribute("data-automation-slide", prevSlide);
			currentSlide = prevSlide;
		}
	}
	function nextAutomationSlide(){
		// console.clear();
		let nextSlide = currentSlide+1;

		if(nextSlide < buttonsBar.length){
			buttonsPrev[currentSlide].classList.remove("is-active");
			buttonsPrev[nextSlide].classList.add("is-active");

			buttonsNext[currentSlide].classList.remove("is-active");
			buttonsNext[nextSlide].classList.add("is-active");

			buttonsBar[currentSlide].classList.remove("is-active");
			buttonsBar[nextSlide].classList.add("is-active");

			slideBackgrounds[currentSlide].classList.remove("is-active");
			slideBackgrounds[nextSlide].classList.add("is-active");

			slideContents[currentSlide].classList.remove("is-active");
			slideContents[nextSlide].classList.add("is-active");


			automationSection.setAttribute("data-automation-slide", nextSlide);

			currentSlide++;
		} else if(nextSlide == buttonsBar.length){
			currentSlide = buttonsBar.length-1;
			nextSlide = 0;
			buttonsPrev[currentSlide].classList.remove("is-active");
			buttonsPrev[nextSlide].classList.add("is-active");

			buttonsNext[currentSlide].classList.remove("is-active");
			buttonsNext[nextSlide].classList.add("is-active");

			buttonsBar[currentSlide].classList.remove("is-active");
			buttonsBar[nextSlide].classList.add("is-active");

			slideBackgrounds[currentSlide].classList.remove("is-active");
			slideBackgrounds[nextSlide].classList.add("is-active");

			slideContents[currentSlide].classList.remove("is-active");
			slideContents[nextSlide].classList.add("is-active");

			automationSection.setAttribute("data-automation-slide", nextSlide);
			currentSlide = 0;
		}
	}
	
	buttonsPrev.forEach((button, idx) => {
		if(button){
			button.addEventListener("click", function(e){
				e.preventDefault();
				prevAutomationSlide();
			})
		}
	})
	buttonsNext.forEach((button, idx) => {
		if(button){
			button.addEventListener("click", function(e){
				e.preventDefault();
				nextAutomationSlide();
			})
		}
	})
	let mm = gsap.matchMedia();
	mm.add("(min-width: 768px)", () => {
		buttons.forEach((button, idx) => {
			Draggable.create(button, {
				type:"y",
				bounds: button.parentNode,
				inertia: true,
				minDuration: 1,
				overshootTolerance: 0,
				throwResistance: 0, // число (по умолчанию 1000), которое определяет степень сопротивления или трения при отпускании мыши/касания
				// autoScroll: 0,
				edgeResistance: 1, //выход за границы
				// dragResistance: 0, // число от 0 до 1, определяющее степень сопротивления, постоянно применяемого к элементу при его перетаскивании
				snap: function(value) {
					return 0;
				},
				onMove: function(e) {
					// Назад
					if(this.minY == this.y){
						let _this = this;

						setTimeout(function(){
							_this.endDrag();
							prevAutomationSlide()
						}, 200);

					}

					// Вперед
					if(this.maxY == this.y){
						let _this = this;

						setTimeout(function(){
							_this.endDrag();

							nextAutomationSlide()
						}, 200);

					}
				}
			});
		});
	});
	
	// Для мобильных
	var automationBar = new Swiper(".s-automation__bar-slider", {
		spaceBetween: 45,
		slidesPerView: "auto",
		centeredSlides: true,
		speed: 700,
		on: {
			slideChange: function (swiper) {
				if(currentSlide > swiper.activeIndex){
					prevAutomationSlide();
				} else{
					nextAutomationSlide();
				}
				// console.log(swiper.activeIndex);
			},
		},
		
	});
}
