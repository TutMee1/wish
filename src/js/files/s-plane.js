import {bodyUnlock, bodyLock } from "./functions.js";

$(document).ready(function(){
	$(".s-plane__wrapper")[0].scrollLeft = 240;

	$(".s-plane__button").click(function(){
		let activeButtonCount = 0;
		let currentButton = $(this);
		let currentButtonId = parseInt(currentButton.data("system-id"));
		let currentButtonState = parseInt(currentButton.attr("data-state"));
		let buttons = $(".s-plane__button");
		// Массив комнат в которых есть система с функциями
		let selectedRoom = currentButton.data("system-in").split(',').map(function(x){return parseInt(x)});
		// Кнопки с кол-вом выбранных систем
		let openModalButtons = $(".s-plane__functions-btn");

		// Клик по кнопке системы "Домашний кинотеатр"
		if(currentButton.hasClass("for-func-6")){
			if(!currentButton.hasClass("is-select")){
				$(".s-plane__functions-btn.for-room-4.is-hidden").removeClass("is-hidden");
				$(".s-plane__option.func-6-1").addClass("is-active");
				$(".s-plane__button.for-func-6").addClass("is-select");
				$(".s-plane__room-item.for-room-4").removeClass("is-hidden");
			} else{
				$(".s-plane__functions-btn.for-room-4").addClass("is-hidden");
				$(".s-plane__option.func-6-1").removeClass("is-active");
				$(".s-plane__button.for-func-6").removeClass("is-select");
				$(".s-plane__room-item.for-room-4").addClass("is-hidden");
			}
		} else{
			// Переберимаем кнопки-функции
			let counterActiveState = 0;
			buttons.each(function(idx){
				let button = $(this);
				//Кнопка с кол-вом выбранных систем (dropdown)
				let buttonAmountSystem = openModalButtons.eq(idx);
				let buttonAmountSystemCounter = parseInt(buttonAmountSystem.text());
				
				// Если текущая кнопка не выбрана
				if(!currentButton.hasClass("is-active")){
					// Перебираем массив с id комнат в которых есть система с функциями
					selectedRoom.forEach(function(item, index, array) {
						//Получаем нужную кнопку (dropdown) с кол-вом выбранных систем	
						if(buttonAmountSystem.attr('class').includes(`for-room-${item}`)){
							// Меняем кол-во выбранных систем
							buttonAmountSystem.text(++buttonAmountSystemCounter)
						}
					});

					setTimeout(function(){
						let buttonActiveState = parseInt(button.attr("data-state"));
						let buttonActiveId = parseInt(button.attr("data-system-id"));
					

						if(buttonActiveState == 0 && counterActiveState < 1){
							$(`.s-plane__option.func-${buttonActiveId}-${currentButtonState}`).addClass("is-active");
							button.attr("data-state", currentButtonState);
							console.log(counterActiveState);
							counterActiveState++;
						}
					}, 0);
					// Перебираем массив с id комнат в которых есть система с функциями
					selectedRoom.forEach(function(item, index, array) {
						//Получаем нужную кнопку (dropdown) с кол-вом выбранных систем	
						if(buttonAmountSystem.attr('class').includes(`for-room-${item}`)){
							// Меняем кол-во выбранных систем
							buttonAmountSystem.text(--buttonAmountSystemCounter);
						}
					});
				} else{
					// Если текущая кнопка выбрана
					// // Если выбраных кнопок больше 2х, можем удалять кнопку

					// Удаляем подсветку на планировке текущей кнопки-функции
					$(`.s-plane__option.func-${currentButtonId}-1.is-active`).removeClass("is-active");
					$(`.s-plane__option.func-${currentButtonId}-2.is-active`).removeClass("is-active");
					currentButton.attr("data-state", 0);

					
					setTimeout(function(){
						if(button.hasClass("is-active")){
							let buttonActiveState = parseInt(button.attr("data-state"));
							let buttonActiveId = parseInt(button.attr("data-system-id"));
						
							
							
							if(buttonActiveState == 0 && counterActiveState < 1){
								$(`.s-plane__option.func-${buttonActiveId}-${currentButtonState}`).addClass("is-active");
								button.attr("data-state", currentButtonState);
								console.log(counterActiveState);
								counterActiveState++;
							}
						}
					}, 0);

					// Перебираем массив с id комнат в которых есть система с функциями
					selectedRoom.forEach(function(item, index, array) {
						//Получаем нужную кнопку (dropdown) с кол-вом выбранных систем	
						if(buttonAmountSystem.attr('class').includes(`for-room-${item}`)){
							// Меняем кол-во выбранных систем
							buttonAmountSystem.text(--buttonAmountSystemCounter);
						}
					});
				}


			});

			if(currentButton.hasClass("is-active")){
				// Если кнопка имеет активный класс
				currentButton.removeClass("is-active");
			} else{
				// Если кнопка не активна
				currentButton.addClass("is-active");
			}
		}
	});

	// Очистка всей состояний
	$(".js-plane-clean").click(function(e){
		$(".s-plane__button").removeClass("is-active");
		$(".s-plane__button.for-func-6").removeClass("is-select");
		$(".s-plane__option").removeClass("is-active");
		$(".s-plane__functions-btn.for-room-4").addClass("is-hidden");

		$(".s-plane__functions-btn").text(2);


		$(".s-plane__button.for-func-1").addClass("is-active")
		$(".s-plane__button.for-func-1").attr("data-state", 1);
		$(".s-plane__option.func-1-1").addClass("is-active");
		

		$(".s-plane__button.for-func-2").addClass("is-active")
		$(".s-plane__button.for-func-2").attr("data-state", 2);
		$(".s-plane__option.func-2-2").addClass("is-active");

		$(".s-plane__room-item.for-room-4").addClass("is-hidden");
	});

	// Кнопка на мобильном для открытия попап с функциями 
	$(".js-open-functions-popup").click(function(){
		$(".s-plane__nav").addClass("is-active");
		bodyLock();
	})
	$(".js-close-functions-popup").click(function(){
		$(".s-plane__nav").removeClass("is-active");
		bodyUnlock();
	});

	// Открытие попап с функциями, которые есть в выбранной комнате
	$(".s-plane__functions-btn").click(function(){
		// Показывает попап
		$(".s-plane__systems").addClass("is-active")
	});

	// Кнопка закрытия попапа с функциями
	$(".js-close-systems-popup").click(function(){
		$(".s-plane__systems").removeClass("is-active");
	})
});