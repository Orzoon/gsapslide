window.addEventListener("load", () => {
 
    gsap.registerPlugin(ScrollTrigger)

    // gsap.to(".c", {
    //     scrollTrigger: {
    //         trigger: ".c",
    //         //toggleActions: "restart pause reverse pause", // default -play none none none //values--> play pause resume resverse restart reset complete none
    //         start: "top center", // relative to top
    //         end: "top 100px", // () => {return "+="" }
    //         markers: true,
    //         scrub: 2
    //     },
    //     rotate: 360,
    //     x: 400,
    //     duration: 3
    // })


    // let t1 = gsap.timeline({
    //     scrollTrigger: {
    //         trigger: ".c",
    //         //toggleActions: "restart pause reverse pause", // default -play none none none //values--> play pause resume resverse restart reset complete none
    //         start: "top center", // relative to top
    //         end: "top 100px", // () => {return "+="" }
    //         markers: true,
    //         scrub: 2
    //     }
    
    // })

    // t1.to(".c", {
    //     rotate: 360,
    //     x: 400,
    //     duration: 3
    // })


    gsap.to(".c", {
        scrollTrigger: {
            trigger: ".c",
            //toggleActions: "restart pause reverse pause", // default -play none none none //values--> play pause resume resverse restart reset complete none
            start: "top center", // relative to top
            end: "top 100px", // () => {return "+="" }
            markers: true,
            scrub: 2,
            //pinSpacing: false,
            pin: true // can also be element ".class"
        },
        rotate: 360,
        x: 400,
        duration: 3
    })


    // ScrollTrigger.create({
    //     onUpdate: (self) => {
    //         //progress
    //     },
    //     onEnter,
    //     onLeave,
    //     onEnterBack,
    //     onLeaveBack,
    //     onToggle: (self) => {},
    //     toggleClass: "",
    //     id: "my_id",
            //scroller: "", ---> id of the container to watch
            //horizontal: true
    // })

    ScrollTrigger.defaults({

    })




})