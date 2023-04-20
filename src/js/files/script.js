// Подключение функционала "Чертогов Фрилансера"
import { isMobile, bodyUnlock, bodyLock } from "./functions.js";
// Подключение списка активных модулей
import { flsModules } from "./modules.js";


document.addEventListener("DOMContentLoaded", function(){
	// bodyLock(0)
	// Запуск скрипта бегущей строки
	// marqueeList();

	// input[type=file]
	// const inputFiles = document.querySelectorAll(".c-form-file input[type=file]");
	// if(inputFiles.length){
	// 	inputFiles.forEach(input => {
	// 		if(input){
	// 			input.addEventListener("change", e => {
	// 				let file = e.target.files[0];
	// 				let fileBox = e.target.closest(".c-form-file");
	// 				let fileNameBox = fileBox.querySelector(".c-form-file__text");
	// 				if(fileNameBox){
	// 					fileNameBox.innerHTML = file.name;
	// 				}
	// 			})
	// 		}
	// 	})
	// }

	//========================================================================================================================================================
	// Input =================================================================================================================================================
	//========================================================================================================================================================
	$('.input__field').focus(function(){
		$(this).closest('.input').addClass('_focus');
	});
	$(document).on("click", ".input", function(e){
		let input = $(this);
		input.addClass("_focus");
		input.find("input").focus();
	});
	$('.input__field').focusout(function(e){
		let inputField = $(this);
		let input = inputField.closest(".input");
		if(e.relatedTarget){
			if(inputField.val().trim().length < 1){
				input.removeClass("_focus");
			}
		} else{
			if(inputField.val().trim().length < 1){
				input.removeClass("_focus");
			}
		}
	});

	// TEXTARE AUTOHEIGHT
	$("textarea").each(function () {
		this.setAttribute("style", "height:" + (this.scrollHeight) + "px;overflow-y:hidden;");
	}).on("input", function () {
		this.style.height = 0;
		this.style.height = (this.scrollHeight) + "px";
	});
	//========================================================================================================================================================
	// DROPDOWN ==============================================================================================================================================
	//========================================================================================================================================================
	$(".c-dropdown__item").click(function(){
		var option = $(this);
		var dropdown = option.closest(".c-dropdown");
		var inputSelect = dropdown.find("input[name='dropdown']");
		var button = dropdown.find(".c-dropdown__button");

		inputSelect.val(option.text());
		button.text(option.text());
		button.removeClass("._spoller-active");
		button.next().attr("hidden", "true");
	});


	$(".s-control__card").click(function(){
		let card = $(this);
		if(!card.hasClass("is-active")){
			card.addClass("is-active");
		} else{
			card.removeClass("is-active")
		}
	});


	$(".js-quiz").click(function(){
		if($(".c-quiz").hasClass("is-active")){
			$(".c-quiz").removeClass("is-active");
			bodyUnlock();
		} else{
			$(".c-quiz").addClass("is-active");
			bodyLock();
		}		
	});

	function quizNextSlide(){
		let activeName = $(".c-quiz__header-item.is-active");
		activeName.next().addClass("is-active");
		activeName.removeClass("is-active");
		let bodyItems =  $(".c-quiz__step");
		let activeBody = $(".c-quiz__step.is-active")
		activeBody.next().addClass("is-active");
		activeBody.removeClass("is-active");

		let curentBodyItem = activeBody.next().index()+1;
		

		$(".c-quiz__paggination").html(curentBodyItem + " / " + bodyItems.length);

	
		$(".c-quiz__progress-item").animate({
			width: curentBodyItem*100/bodyItems.length+"%"
		}, 400, function() {
			// Animation complete.
		});
		if(curentBodyItem > 1){
			$(".c-quiz__back").removeClass("is-hidden");
		} else{
			$(".c-quiz__back").addClass("is-hidden");
		}
		if(curentBodyItem > 2){
			$(".c-quiz__next").removeClass("is-hidden");
		} else{
			$(".c-quiz__back").addClass("is-hidden");
		}
		
		
		if(curentBodyItem == 3){
			$(".c-quiz__footer").addClass("is-mobile-active");
		} else{
			$(".c-quiz__footer").removeClass("is-mobile-active");
		}
		
		if(curentBodyItem == bodyItems.length){
			$(".c-quiz__end").fadeIn();
			$(".c-quiz__flag").addClass("is-end")
			$(".c-quiz__next").hide()
		} else{
			$(".c-quiz__end").hide();
			$(".c-quiz__flag").removeClass("is-end")
			$(".c-quiz__next").fadeIn()
		}
	}
	$(".c-quiz__item-input").click(function(){
		if(parseInt($(this).closest(".c-quiz__step").data("step-body")) != 3){	
			quizNextSlide();
		}
	});
	$(".c-quiz__next").click(function(){
		quizNextSlide();
	});
	
	$(".c-quiz__close").click(function(){
		$(".c-quiz").removeClass("is-active");
		bodyUnlock();
	});

	
});
