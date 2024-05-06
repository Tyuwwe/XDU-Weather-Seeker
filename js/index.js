// 页面初始化函数
function init_page() {
    const right_bar_box = document.getElementById("i-rbox");
    let cities = JSON.parse(localStorage.getItem("cities")) || []; // 获取本地存储中的城市信息或初始化为空数组

    // 遍历城市信息并显示到页面上
    for (let cityID = 0; cityID < cities.length; ++cityID) {
        let cityInfo = cities[cityID];
        let new_city = document.createElement("div");
        new_city.setAttribute("class", "i-right-slide-slist-item");
        new_city.setAttribute("id", "city-" + cityInfo.name);
        let new_city_name = document.createElement("div");
        new_city_name.setAttribute("class", "i-right-slide-slist-item-name");
        new_city_name.innerText = cityInfo.name;
        let new_city_del = document.createElement("i");
        new_city_del.setAttribute("class", "del-ico icon-delete");
        new_city_del.setAttribute("id", cityInfo.name + "-del");

        new_city.appendChild(new_city_name);
        new_city.appendChild(new_city_del);

        right_bar_box.appendChild(new_city);
    }

    addClickEvent();
    loadLocalData();

    // 检查localStorage是否有存储的数据
    if (localStorage.getItem("selectedCity")) {
        selected_city = localStorage.getItem("selectedCity");
        const selectedCity = localStorage.getItem("selectedCity");
        updateCityDetails(selectedCity);

        // 设置初始位置
        const from_city = document.getElementById(selected_city);
        const to_city = document.getElementById(selectedCity);
        from_city.setAttribute("class", "i-right-slide-slist-item");
        to_city.setAttribute("class", "i-right-slide-slist-item i-right-slide-item-selected");
        selected_city = selectedCity;
    }
    else {
        // if no localstorage code here
        let def_cityData = {
            "cities": ["city-长安区"],
            "city-长安区": {
                nowTemp: "24°C",
                feelslike: "26°C",
                cityName: "长安区",
                cityNameEn: "陕西省，西安市",
                noweather: "多云",
                wicon: "101",
                date: "更新时间：2020-06-30 22:00",
                aqi: "65",
                pm25: "43",
                pm10: "22",
                wdir: "东南风",
                wscal: "2级",
                wsped: "3km/h",
                wpres: "1003hPa",
                wwet: "72%",
                wvis: "16km",
                lng: 34.13214323923205,
                lat: 108.84111106448135
            },
        };
        localStorage.setItem("cities", JSON.stringify(def_cityData["cities"]));
        localStorage.setItem(def_cityData["cities"], JSON.stringify(def_cityData[def_cityData["cities"]]));
        localStorage.setItem("selectedCity", def_cityData["cities"]);
        init_page();
    }
}
let cityJSON = [];
let cityData = {};
function loadLocalData() {
    cityJSON = JSON.parse(localStorage.getItem("cities"));
    for (city in cityJSON) {
        if (city != "") {
            cityData[cityJSON[city]] = JSON.parse(localStorage.getItem(cityJSON[city]));
        }
    }
}


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
    } else {
        l_slide.style.left = "0";
        l_slide.style.opacity = "1";
        l_slide_cld.style.width = "80%";
    }
    bOpenedLeft = !bOpenedLeft;
});

cities_btn.addEventListener("click", () => {
    if (bOpenedRight) {
        r_slide.style.right = "-120%";
        r_slide.style.opacity = "0";
        r_slide_cld.style.width = "100vw";
    } else {
        r_slide.style.right = "0";
        r_slide.style.opacity = "1";
        r_slide_cld.style.width = "80%";
    }
    bOpenedRight = !bOpenedRight;
});

let city_count = Object.keys(cityData).length;
// console.log(city_count);

console.log("check");


let i = 0;
let mouse_pos = 0;
let offsetX = 0;
let bClicked = false;
let clickedID;

function updateWeatherInfo(cityName) {
    const data = cityData[cityName];
    if (data) {
        document.getElementById("weatherTemperature").textContent = data.temperature;
        document.getElementById("weatherCity").textContent = cityName;
    }
}

function addClickEvent() {
    const all_city = document.getElementsByClassName("i-right-slide-slist-item");
    // 城市列表项的点击监听器
    for (i = 0; i < all_city.length; ++i) {
        all_city[i].addEventListener("click", (e) => {
            console.log(e);
            if(e.target.className == "i-right-slide-slist-item") {
                toggleCitySelection(selected_city, e.target.id);
                updateWeatherInfo(e.target.textContent.trim());
                updateCityDetails(e.target.id);
                localStorage.setItem("selectedCity", e.target.id);
            }
        });
    }
}

function updateWeatherInfo(cityName) {
    const data = cityData[cityName];
    if (data) {
        document.getElementById("weatherTemperature").textContent = data.nowTemp;
        document.getElementById("weatherCity").textContent = data.cityName;
    }
}

function toggleCitySelection(currentCityID, newCityID) {
    let from_city = document.getElementById(currentCityID);
    let to_city = document.getElementById(newCityID);
    from_city.setAttribute("class", "i-right-slide-slist-item");
    to_city.setAttribute("class", "i-right-slide-slist-item i-right-slide-item-selected");
    selected_city = newCityID;
}

// 更新城市详细信息函数
function updateCityDetails(cityID) {
    const data = cityData[cityID];
    if (data) {
        document.getElementById("nowtemp").textContent = data.nowTemp;
        document.getElementById("feelslike").textContent = data.feelslike;
        document.getElementById("cityname").textContent = data.cityName;
        document.getElementById("cityname-en").textContent = data.cityNameEn;
        document.getElementById("cityname-date").textContent = data.date;
        document.getElementById("noweather").textContent = data.noweather + " " + data.wdir;
        document.getElementById("aqi").textContent = data.aqi;
        document.getElementById("pm2.5").textContent = data.pm25;
        document.getElementById("pm10").textContent = data.pm10;
        document.getElementById("wdir").textContent = data.wdir;
        document.getElementById("wscal").textContent = data.wscal;
        document.getElementById("wsped").textContent = data.wsped;
        document.getElementById("wpres").textContent = data.wpres;
        document.getElementById("wwet").textContent = data.wwet;
        document.getElementById("wvis").textContent = data.wvis;
        document.getElementById("wlogo").setAttribute("class", "qi-" + data.wicon + "-fill i-med-wther-logo");
    }
}

let del_btns = document.getElementsByClassName("del-ico");

for (i = 0; i < del_btns.length; ++i) {
    del_btns[i].addEventListener("click", (e) => {
        alert(city_count);
        if(city_count > 1) {
            let bID = e.target.id;
            let cID = bID.split("-")[0];
            document.getElementById("slist-box").removeChild(document.getElementById("city-" + cID));
            city_count -= 1;
            document.getElementById("slist-box").firstElementChild.setAttribute("class", "i-right-slide-slist-item i-right-slide-item-selected");
            selected_city = document.getElementById("slist-box").firstElementChild.id;
            updateCityDetails(selected_city);
        }
    })
}


init_page();