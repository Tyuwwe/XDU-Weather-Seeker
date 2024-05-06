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
               document.getElementById("nowtemp").textContent = weatherData.now.temp ;  //温度 
               document.getElementById("feelslike").textContent = weatherData.now.feelsLike ;//体感温度
               document.getElementById("noweather").textContent= weatherData.now.text + " " + weatherData.now.windDir; //风向和天气
               document.getElementById("wdir").textContent =  weatherData.now.windDir ;//风向
               document.getElementById("wscal").textContent = weatherData.now.windSpeed + "km/h" ;
               document.getElementById("wwet").textContent = weatherData.now.humidity + "%" ;
                                // "降水量：" + weatherData.now.precip + "毫米<br>" +
                document.getElementById("wpres").textContent =  weatherData.now.pressure + "hPA" ;
                document.getElementById("see").textContent =  weatherData.now.vis + "km";
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
               var airQualityInfo = "空气质量指数：" + airData.now.aqi + "<br>" +
                                    "PM10：" + airData.now.pm10 + "<br>" +
                                    "PM2.5：" + airData.now.pm2p5;
          
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
    // 创建一个新的div元素
    let newdiv = document.createElement("div");
    newdiv.setAttribute("class", "i-right-slide-slist-item");
    // 设置新创建的div元素的文本内容为市和区
    newdiv.textContent = nowcity + " " + nowdistrict + " (" + nowpoint + ")";

    // 将新创建的div元素添加到特定的元素中，例如"i-rbox"
    document.getElementById("i-rbox").appendChild(newdiv);

    // 将城市信息保存到本地存储
    let cities = JSON.parse(localStorage.getItem("cities")) || []; // 如果没有数据，则初始化为空数组
    let cityInfo = {
        name: nowcity + " " + nowdistrict,
        point: nowpoint
    };
    cities.push(cityInfo); // 添加城市信息到数组中
    localStorage.setItem("cities", JSON.stringify(cities)); // 将更新后的数组重新存储到本地存储中
});


function updatecityname(province,city ,district)
{
    document.getElementById("cityname").textContent = district;
    document.getElementById("cityname-en").textContent = province+","+city;
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




// 创建一个事件监听器函数返回经纬度
function cityItemClickHandler(event) {
    // 获取点击的城市元素的 id
    const cityId = event.target.id;
    
    // 从 id 中解析出城市名和区域名
    const cityDistrict = cityId.split("-")[1];
    
    // 从本地存储中获取对应城市的经纬度信息
    const cities = JSON.parse(localStorage.getItem("cities")) || [];
    const cityInfo = cities.find(city => city.name === cityDistrict);
    if (cityInfo) {
        console.log("经纬度信息：", cityInfo.point);
        fetchWeather(cityInfo.point);


    } else {
        console.log("未找到对应城市的经纬度信息");
    }
}