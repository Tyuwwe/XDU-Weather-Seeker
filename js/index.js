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
        console.log(selectedCity);
    
        // 去掉selectedCity中的前缀city-
        const cityNameWithoutPrefix = selectedCity.replace("city-", "");
        
        // 匹配本地存储中的城市信息
        const cities = JSON.parse(localStorage.getItem("cities")) || [];
        const cityInfo = cities.find(city => city.name === cityNameWithoutPrefix);
        if (cityInfo) {
            fetchWeather(cityInfo.point); // 根据城市信息获取天气
            updatecityname(cityInfo.city, cityInfo.district); // 更新城市名称
        } else {
            console.log("未找到对应城市的经纬度信息");
        }
    
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
            "cities": [{
                city : "西安市",
                district : "长安区",
                name : "西安市 长安区",
                point : "108.86,34.13"
            }]
        };
        localStorage.setItem("cities", JSON.stringify(def_cityData["cities"]));
        localStorage.setItem("selectedCity", "city-西安市 长安区");
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
    if (from_city) from_city.setAttribute("class", "i-right-slide-slist-item");
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

var locationInput = "";
// 创建地图实例
var map = new BMap.Map("allmap");
// 设置地图中心点和缩放级别
var point = new BMap.Point(116.331398, 39.897445);
map.centerAndZoom(point, 12);
// 启用滚轮缩放
map.enableScrollWheelZoom(true);
// 定义变量用于存储点击的位置信息

let new_point;

let nowcity;    //用来保存城市名以及区
let nowdistrict;
let nowpoint;   //保存经纬度

const add = document.getElementById("addcity");
const del = document.getElementById("delcity");
// 创建定位对象
var geolocation = new BMap.Geolocation();
// 获取当前位置信息
geolocation.getCurrentPosition(function (r) {
    // 若获取成功，则在地图上标记当前位置并将地图视角移动至当前位置
    if (this.getStatus() == BMAP_STATUS_SUCCESS) {
        var mk = new BMap.Marker(r.point);
        map.addOverlay(mk);
        map.panTo(r.point);
    }
    // 若获取失败，则在控制台输出错误信息
    else {
        console.log('failed' + this.getStatus());
    }
}, {enableHighAccuracy: true});

// 监听地图点击事件
map.addEventListener("click", function (e) {
    // 清除地图上的覆盖物
    map.clearOverlays();
    // 获取点击位置的经纬度信息
    new_point = e.point;
    console.log(new_point);
    // 在点击位置添加标记并将地图视角移动至该位置
    var new_mk = new BMap.Marker(new_point);
    map.addOverlay(new_mk);
    map.panTo(new_point);
    var locationInput =new_point.lng.toFixed(2) + "," + new_point.lat.toFixed(2);
    nowpoint = locationInput;
    // 根据点击位置获取地址信息并显示在页面上
    var gc = new BMap.Geocoder();
    gc.getLocation(new_point, function (rs) {
        var addComp = rs.addressComponents;
        console.log(addComp);
        document.getElementById("province").innerText = addComp.province;//省
        document.getElementById("city").innerText = addComp.city;   //市
        document.getElementById("district").innerText = addComp.district;//区

        nowcity = addComp.city;
        nowdistrict =  addComp.district;
    });
    console.log(new_point.lng,new_point.lat);
});

function fetchWeather(nowpoint){
    // 获取输入框中的位置信息
   // 设置 API 密钥
   console.log(nowpoint);
   var apiKey = "0168050587a84d2281bfc7d500d9be0d";
   // 构建天气 API 请求 URL
   var weatherApiUrl = "https://devapi.qweather.com/v7/weather/now?location=" + nowpoint + "&key=" + apiKey;
   // 构建空气质量 API 请求 URL
   var airApiUrl = "https://devapi.qweather.com/v7/air/now?location=" + nowpoint + "&key=" + apiKey;

   // 获取天气信息
   fetch(weatherApiUrl)
       .then(response => response.json())
       .then(weatherData => {
           // 打印天气信息到控制台
           console.log("天气信息：", weatherData);
           if (weatherData.code === "200") {
               // 构建天气信息字符串
               document.getElementById("cityname-date").textContent =  weatherData.now.obsTime ;    //观测时间
               document.getElementById("nowtemp").textContent = weatherData.now.temp +"°C";  //温度 
               document.getElementById("feelslike").textContent = weatherData.now.feelsLike +"°C";//体感温度
               document.getElementById("noweather").textContent= weatherData.now.text + " " + weatherData.now.windDir; //风向和天气
               document.getElementById("wdir").textContent =  weatherData.now.windDir ;//风向
               document.getElementById("wscal").textContent = weatherData.now.windSpeed + "km/h" ;
               document.getElementById("wwet").textContent = weatherData.now.humidity + "%" ;
                                // "降水量：" + weatherData.now.precip + "毫米<br>" +
                document.getElementById("wpres").textContent =  weatherData.now.pressure + "hPA" ;
                document.getElementById("see").textContent =  weatherData.now.vis + "km";
                document.getElementById("wlogo").setAttribute("class", "qi-" + weatherData.now.icon + "-fill i-med-wther-logo");
               // 将天气信息显示在页面上
           } 
       })
       .catch(error => {
           // 打印错误信息到控制台
           console.error('Error:', error);
           // 在页面上显示查询天气失败的消息
       });

   // 获取空气质量信息
   fetch(airApiUrl)
       .then(response => response.json())
       .then(airData => {
           // 打印空气质量信息到控制台
           console.log("空气质量信息：", airData);
           if (airData.code === "200") {
               // 构建空气质量信息字符串
               document.getElementById("aqi").textContent = airData.now.aqi ;
               document.getElementById("pm10").textContent = airData.now.pm10 ;
               document.getElementById("pm2.5").textContent =  airData.now.pm2p5;
          
           } 
       })
       .catch(error => {
           // 打印错误信息到控制台
           console.error('Error:', error);
           // 在页面上显示查询空气质量失败的消息
           document.getElementById("airQualityInfo").textContent = "查询空气质量失败，请检查输入的经纬度格式或网络连接。";
       });
// 更新城市详细信息函数
};
   
 // 添加城市的点击事件处理程序
 document.getElementById("addcity").addEventListener("click", () => {
    console.log(nowcity, nowdistrict, nowpoint);

    // 创建一个新的城市信息对象
    let cityInfo = {
        name: nowcity + " " + nowdistrict,
        city: nowcity,
        district: nowdistrict,
        point: nowpoint
    };

    // 将城市信息保存到本地存储
    let cities = JSON.parse(localStorage.getItem("cities")) || []; // 如果没有数据，则初始化为空数组
    cities.push(cityInfo); // 添加城市信息到数组中
    localStorage.setItem("cities", JSON.stringify(cities)); // 将更新后的数组重新存储到本地存储中

    // 添加新城市到页面上
    addCityToPage(cityInfo);
    addCityClickListener(cityInfo);

    // 检查是否有选中的城市，如果有则高亮显示
    const selectedCity = localStorage.getItem("selectedCity");
    if (selectedCity) {
        const cityNameWithoutPrefix = selectedCity.replace("city-", "");
        const cityElement = document.getElementById("city-" + cityNameWithoutPrefix);
        if (cityElement) {
            cityElement.classList.add("i-right-slide-item-selected");
        }
    }
});

// 将城市信息添加到页面上
// 将城市信息添加到页面上
function addCityToPage(cityInfo) {
    const right_bar_box = document.getElementById("i-rbox");
    
    // 创建新的城市元素
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




function updatecityname(city ,district)
{
    document.getElementById("cityname").textContent = district;
    document.getElementById("cityname-en").textContent = city;
}
// 添加所有删除按钮的点击事件监听器
let delButtons = document.querySelectorAll('.del-ico');
console.log("del");
delButtons.forEach(button => {
    button.addEventListener('click', () => {
        // 获取要删除的城市名称
        let cityName = button.id.replace('-del', ''); // 去掉末尾的 '-del'

        // 从本地存储中获取所有城市数据
        let cities = JSON.parse(localStorage.getItem('cities')) || [];

        // 查找要删除的城市在数组中的索引
        let index = cities.findIndex(city => city.name === cityName);

        // 如果找到了要删除的城市
        if (index !== -1) {
            // 从数组中移除该城市
            cities.splice(index, 1);

            // 更新本地存储中的数据
            localStorage.setItem('cities', JSON.stringify(cities));

            // 从页面中移除对应的城市元素
            let cityElement = document.getElementById('city-' + cityName);
            if (cityElement) {
                cityElement.parentNode.removeChild(cityElement);
            }
        } else {
            console.log('City not found');
        }
    });
});


    // 添加点击事件监听器
    document.getElementById('delall').addEventListener('click', () => {
        console.log('delall');
        // 清空本地存储中的所有数据
        localStorage.clear();

        // 清空页面中显示的所有城市元素
        const cityElements = document.querySelectorAll('.i-right-slide-slist-item');
        cityElements.forEach(element => {
            element.parentNode.removeChild(element);
        });
});

function addCityClickListener(cityInfo) {
    let cityElement = document.getElementById("city-" + cityInfo.name);
    cityElement.addEventListener('click', () => {
        // 获取点击的城市元素的 id
        const cityId = cityElement.id;
        
        // 从 id 中解析出城市名和区域名
        const cityDistrict = cityId.split("-")[1];
        
        // 从本地存储中获取对应城市的经纬度信息
        const cities = JSON.parse(localStorage.getItem("cities")) || [];
        const cityInfo = cities.find(city => city.name === cityDistrict);
        if (cityInfo) {
            console.log("经纬度信息：", cityInfo.point);
            fetchWeather(cityInfo.point);
            updatecityname(cityInfo.city, cityInfo.district);
            console.log(cityInfo.city, cityInfo.district);
        } else {
            console.log("未找到对应城市的经纬度信息");
        }

        // 移除之前选中城市的高亮显示样式
        const selectedCityElement = document.querySelector(".i-right-slide-item-selected");
        if (selectedCityElement) {
            selectedCityElement.classList.remove("i-right-slide-item-selected");
        }

        // 添加点击的城市的高亮显示样式
        cityElement.classList.add("i-right-slide-item-selected");
    });
}

// 创建一个事件监听器函数返回经纬度
// 获取所有具有特定 class 的元素
let cityElements = document.querySelectorAll('.i-right-slide-slist-item');

// 遍历每个城市元素并添加点击事件监听器
cityElements.forEach(cityElement => {
    cityElement.addEventListener('click', () => {
        // 获取点击的城市元素的 id
        const cityId = cityElement.id;
        
        // 从 id 中解析出城市名和区域名
        const cityDistrict = cityId.split("-")[1];
        
        // 从本地存储中获取对应城市的经纬度信息
        const cities = JSON.parse(localStorage.getItem("cities")) || [];
        const cityInfo = cities.find(city => city.name === cityDistrict);
        if (cityInfo) {
            console.log("经纬度信息：", cityInfo.point);
            fetchWeather(cityInfo.point);
            updatecityname(cityInfo.city ,cityInfo.district)
            console.log(cityInfo.city ,cityInfo.district);
        } else {
            console.log("未找到对应城市的经纬度信息");
        }
    });
});