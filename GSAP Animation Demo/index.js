gsap.registerPlugin(ScrollTrigger)

let width = window.innerWidth * 0.8
window.addEventListener('resize', function (event) {
    width = window.innerWidth  * 0.8
    console.log(window.innerWidth)
}, true);
console.log(window.innerWidth)
gsap.to("#archeologist", {
    //x: 100,
    scrollTrigger: {
        trigger: '.box',  // this will use the archeologist as the trigger
        start: "top 80%", //start when top of archeologist hits 80% of screen down
        end: "bottom +=200", // Sets where the animation ends - when the bottom of the element hits 300px after we've scrolled
        toggleActions: "restart pause resume pause",
        scrub: true,
        //pin: true,
        //markers: true,
    },
    x: '90vw',
    
});

gsap.to("#archeologist", {
    //x: 100,
    scrollTrigger: {
        trigger: '.box',  // this will use the archeologist as the trigger
        start: "top 20%", //start when top of archeologist hits 80% of screen down
        end: "max", // Sets where the animation ends - when the bottom of the element hits 300px after we've scrolled
        toggleActions: "restart pause resume pause",
        scrub: true,
        pin: true,
    },
});

gsap.set("#whiteBar", {x: "90vw"})
gsap.to("#whiteBar", {
    scrollTrigger: {
        trigger: '#whiteBar',
        start: "top 20%", //start when top of archeologist hits 80% of screen down
        end: "max", // Sets where the animation ends - when the bottom of the element hits 300px after we've scrolled
        toggleActions: "restart none none reset",
        scrub: true,
        pin: true,
    },
    transformOrigin: "bottom center",
    scaleY: 100,
    opacity: 1
});
