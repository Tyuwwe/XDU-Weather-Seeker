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

let selected_city = "city-0";
//write code here to load localstorage

const all_city = document.getElementsByClassName("i-right-slide-slist-item");

let i = 0;
let mouse_pos = 0;
let offsetX = 0;
let bClicked = false;
let clickedID;

for (i = 0; i < all_city.length; ++i) {
    all_city[i].addEventListener("click", (e) => {
        if (Math.abs(offsetX) < 20) {
            let from_city = document.getElementById(selected_city);
            let to_city = document.getElementById(e.target.id);
            from_city.setAttribute("class", "i-right-slide-slist-item");
            to_city.setAttribute("class", "i-right-slide-slist-item i-right-slide-item-selected")
            selected_city = e.target.id;
        }
    })
    all_city[i].addEventListener("mousedown", (event) => {   
        mouse_pos = event.screenX;
        bClicked = true;
        clickedID = event.target.id;
    })
    all_city[i].addEventListener("mousemove", (event) => {
        offsetX = event.screenX - mouse_pos;
        if (bClicked) {
            document.getElementById(event.target.id).style = "transform: translateX(" + offsetX + "px);";
        }
    })
    all_city[i].addEventListener("mouseup", (e) => {
        bClicked = false;
        document.getElementById(clickedID).style = "";
        if (Math.abs(offsetX) > 50) {
            document.getElementById("slist-box").removeChild(document.getElementById(clickedID));
        }
    })
}