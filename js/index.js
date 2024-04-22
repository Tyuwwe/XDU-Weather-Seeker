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

let selected_city = "city-0";
// write code here to load localstorage
let cityData = {
    "city-0": {
        nowTemp: "24°C",
        minTemp: "From 12°C",
        maxTemp: "To 27°C",
        cityName: "长安区",
        cityNameEn: "Xi'an, CHINA",
        date: "2024/4/11",
        quality: "天气质量",
        condition: "Weather Condition",
        aqi: "65",
        pm25: "43",
        pm10: "22"
    },
    "city-1": {
        nowTemp: "24°C",
        minTemp: "From 12°C",
        maxTemp: "To 27°C",
        cityName: "xc区",
        cityNameEn: "Xi'an, CHINA",
        date: "2024/4/11",
        quality: "天气质量",
        condition: "Weather Condition",
        aqi: "65",
        pm25: "43",
        pm10: "22"
    },
    "city-2": {
        nowTemp: "24°C",
        minTemp: "From 12°C",
        maxTemp: "To 27°C",
        cityName: "雁塔区",
        cityNameEn: "Xi'an, CHINA",
        date: "2024/4/11",
        quality: "天气质量",
        condition: "Weather Condition",
        aqi: "65",
        pm25: "43",
        pm10: "22"
    },
    // 可以添加更多城市的数据
};

// 检查localStorage是否有存储的数据
if (localStorage.getItem("selectedCity")) {
    const selectedCity = localStorage.getItem("selectedCity");
    updateCityDetails(selectedCity);

    // 设置初始位置
    const from_city = document.getElementById(selected_city);
    const to_city = document.getElementById(selectedCity);
    from_city.setAttribute("class", "i-right-slide-slist-item");
    to_city.setAttribute("class", "i-right-slide-slist-item i-right-slide-item-selected");
    selected_city = selectedCity;
}


console.log("check");

const all_city = document.getElementsByClassName("i-right-slide-slist-item");

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

// 城市列表项的点击监听器
for (i = 0; i < all_city.length; ++i) {
    all_city[i].addEventListener("click", (e) => {
        if (1) {
            toggleCitySelection(selected_city, e.target.id);
            updateWeatherInfo(e.target.textContent.trim());
            updateCityDetails(e.target.id);
            localStorage.setItem("selectedCity", e.target.id);
        }
    });

    if (localStorage.getItem("selectedCity")) {
        
    }

    all_city[i].addEventListener("mousedown", (event) => {   
        mouse_pos = event.screenX;
        bClicked = true;
        clickedID = event.target.id;
    });
    all_city[i].addEventListener("mousemove", (event) => {
        offsetX = event.screenX - mouse_pos;
        if (bClicked) {
            document.getElementById(event.target.id).style = "transform: translateX(" + offsetX + "px);";
        }
    });
    all_city[i].addEventListener("mouseup", (e) => {
        bClicked = false;
        document.getElementById(clickedID).style = "";
        if (Math.abs(offsetX) > 100) {
            //document.getElementById("slist-box").removeChild(document.getElementById(clickedID));
        }
    });
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
        document.getElementById("mintemp").textContent = data.minTemp;
        document.getElementById("maxtemp").textContent = data.maxTemp;
        document.getElementById("cityname").textContent = data.cityName;
        document.getElementById("cityname-en").textContent = data.cityNameEn;
        document.getElementById("cityname-date").textContent = data.date;
        document.getElementById("quality").textContent = data.quality;
        document.getElementById("condit").textContent = data.condition;
        document.getElementById("aqi").textContent = data.aqi;
        document.getElementById("pm2.5").textContent = data.pm25;
        document.getElementById("pm10").textContent = data.pm10;
    }
}
