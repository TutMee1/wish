import { gsap, ScrollTrigger, Draggable } from "gsap/all.js";
gsap.registerPlugin(ScrollTrigger, Draggable, InertiaPlugin); 



const freeBlocks = document.querySelectorAll(".s-free__card-wrapper");
	let mm = gsap.matchMedia();
	let tl;
	mm.add("(min-width: 1200px)", () => {
		tl = gsap.timeline({
			scrollTrigger: {
				trigger: ".s-free__box",
				pin: true,
				start: "top -10%",
				end: "+=1500",
				scrub: 1,
			}
		});
	});
	mm.add("(max-width: 1200px)", () => {
		tl = gsap.timeline({
			scrollTrigger: {
				trigger: ".s-free__cards",
				pin: true,
				start: "top +=15%",
				end: "+=2500",
				scrub: 0,
			}
		});
	});

	if(freeBlocks.length){
		freeBlocks.forEach((item,idx) => {
			if(idx == 0){
				let tl2 = gsap.timeline({
					// yes, we can add it to an entire timeline!
					scrollTrigger: {
						trigger: ".s-free__cards",
						pin: false,   // pin the trigger element while active
						anticipatePin: 1,
						pinSpacing: false,
						start: "top 60%", // when the top of the trigger hits the top of the viewport
						end: "center center", // end after scrolling 500px beyond the start
						scrub: 0.5, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
						immediateRender:false 
					}
				});
				tl2.from(item, {
					opacity: 0,
					duration: 1
				}).to(item, {
					opacity: 1,
					duration: 1
				});
			}
			if(idx > 0){
				tl.from(item, {
					y: "100%",
					opacity: 0,
					duration: 1
				}).to(item, {
					y: "0%",
					opacity: 1,
					duration: 1
				});
			}
		});
	}