gsap.registerPlugin(ScrollTrigger)

let width = window.innerWidth * 0.8
window.addEventListener('resize', function (event) {
    width = window.innerWidth  * 0.8
    //console.log(window.innerWidth)
}, true);
//console.log(window.innerWidth)

// gsap.set("#archeologist", {transformOrigin: "50vw",})
// gsap.to("#archeologist", {
//     x: '90vw',
//     scrollTrigger: {
//         trigger: '.box',  // this will use the archeologist as the trigger
//         start: "top 80%", //start when top of archeologist hits 80% of screen down
//         end: "bottom +=200", // Sets where the animation ends - when the bottom of the element hits 300px after we've scrolled
//         toggleActions: "restart pause resume pause",
//         scrub: true,
//         //pin: true,
//         //markers: true,
//     },
// });



gsap.to(".elevator", {
    scrollTrigger: {
        trigger: '.elevator',  // this will use the archeologist as the trigger
        start: "top 40%", //start when top of archeologist hits 80% of screen down
        end: "max", // Sets where the animation ends - when the bottom of the element hits 300px after we've scrolled
        toggleActions: "restart pause resume pause",
        scrub: true,
        pin: true,
        // markers: true,
    },
});
