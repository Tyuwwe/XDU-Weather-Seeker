const l_slide = document.getElementById("sbar-l");
const l_slide_cld = document.getElementById("sbar-lcld");

const r_slide = document.getElementById("sbar-r");
const r_slide_cld = document.getElementById("sbar-rcld");

let settings_btn = document.getElementById("set-btn");
let cities_btn = document.getElementById("cit-btn");

let bOpenedLeft = false;
let bOpenedRight = false;

settings_btn.addEventListener("click", () => {
    if (bOpenedLeft) {
        l_slide.style.left = "-120%";
        l_slide.style.opacity = "0";
        l_slide_cld.style.width = "100vw";

    }
    else {
        l_slide.style.left = "0";
        l_slide.style.opacity = "1";
        l_slide_cld.style.width = "80%";
    }
    bOpenedLeft = !bOpenedLeft;
})

cities_btn.addEventListener("click", () => {
    if (bOpenedRight) {
        r_slide.style.right = "-120%";
        r_slide.style.opacity = "0";
        r_slide_cld.style.width = "100vw";

    }
    else {
        r_slide.style.right = "0";
        r_slide.style.opacity = "1";
        r_slide_cld.style.width = "80%";
    }
    bOpenedRight = !bOpenedRight;
})