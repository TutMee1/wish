import Plyr from 'plyr';

const bgPlayers = document.querySelectorAll('.js-preview-bg'); 
const bgPlayersTimeline = document.querySelectorAll('.js-preview-bg-timeline');
const bgPlayersInstance = [];
if(bgPlayers.length){
	bgPlayers.forEach((player,idx) => {
		bgPlayersInstance[idx] = new Plyr(player, {
			hideControls: true,
			muted: true,
			autoplay: false,
			iconUrl: "../img/assets/plyr.svg",
			loop: { active: true },
		});

		bgPlayersInstance[idx].on('ready', () => {
			bgPlayersInstance[idx].play();
			$(".s-preview__bg, .s-preview__timeline, .s-preview__play").animate({
				opacity: 1,
			}, 2000, function() {
				// Animation complete.
			});
		})

		if(bgPlayersTimeline[idx]){
			let timileneTime = bgPlayersTimeline[idx].querySelector(".s-preview__timeline-time");
			let timileneDot = bgPlayersTimeline[idx].querySelector(".s-preview__timeline-dot");

			bgPlayersInstance[idx].on('timeupdate', (event) => {
				const instance = event.detail.plyr;
				var minutes = Math.floor(instance.currentTime / 60);   
				var seconds = Math.floor(instance.currentTime - minutes * 60)

				var x = minutes < 10 ? "0" + minutes : minutes;
				var y = seconds < 10 ? "0" + seconds : seconds;

				timileneTime.innerHTML = x + ":" + y;

				timileneDot.style.left = ((instance.currentTime/instance.duration)*100).toFixed(2) + "%";
			});

			bgPlayersInstance[idx].on('play', () => {
				document.querySelector(".s-preview").classList.remove("is-loaded");
			})
		}

		// Открытие на полный экран
		if(document.querySelector(".s-preview__play")){
			document.querySelector(".s-preview__play").addEventListener("click", function(){
				document.querySelector(".s-preview").classList.add("is-fullscreen");
				bgPlayersInstance[idx].toggleControls(true);
				bgPlayersInstance[idx].increaseVolume(1);
			})

			document.querySelector(".s-preview__bg-close").addEventListener("click", function(){
				bgPlayersInstance[idx].toggleControls(false);
				bgPlayersInstance[idx].decreaseVolume(1);
				bgPlayersInstance[idx].play();
				document.querySelector(".s-preview").classList.remove("is-fullscreen");
			});
		}
	});
}

// const otherPlayers = document.querySelectorAll('.js-video-player'); 
// const otherPlayersInstance = [];
// if(otherPlayers.length){
// 	otherPlayers.forEach((player,idx) => {
// 		otherPlayersInstance[idx] = new Plyr(player, {
// 			// the_id: idx,
// 			// controls: [],
// 			// loadSprite: false,
// 			// blankVideo: "https://cdn.plyr.io/static/blank.mp4",
// 			// muted: false,
// 			// autoplay: false,
// 			// clickToPlay: false,
// 			// loop: { active: true },
// 			// fullscreen: {
// 			// 	enabled: false, 
// 			// 	fallback: false, 
// 			// 	iosNative: false, 
// 			// },
// 			i18n: {
// 				restart: 'Перезапустить',
// 				rewind: 'Назад на {seektime}с',
// 				play: 'Играть',
// 				pause: 'Пауза',
// 				fastForward: 'Вперед {seektime}с',
// 				seek: 'Искать',
// 				seekLabel: '{currentTime} из {duration}',
// 				played: 'Проиграно',
// 				buffered: 'Буферизовано',
// 				currentTime: 'Текущее время',
// 				duration: 'Продолжительность',
// 				volume: 'Громкость',
// 				mute: 'Без звука',
// 				unmute: 'Включить звук',
// 				enableCaptions: 'Включить субтитры',
// 				disableCaptions: 'Отключить субтитры',
// 				download: 'Скачать',
// 				enterFullscreen: 'Полноэкранный режим',
// 				exitFullscreen: 'Выйти из полноэкранного режима',
// 				frameTitle: 'Player for {title}',
// 				captions: 'Субтитры',
// 				settings: 'Настройки',
// 				pip: 'PIP',
// 				menuBack: 'Вернуться в предыдущее меню',
// 				speed: 'Скорость',
// 				normal: 'Нормальная',
// 				quality: 'Качество',
// 				loop: 'Бесконечно',
// 				start: 'Start',
// 				end: 'End',
// 				all: 'Все',
// 				reset: 'Сброс',
// 				disabled: 'Отключено',
// 				enabled: 'Включено',
// 				advertisement: 'Реклама',
// 			}
// 		});
// 	});
// }