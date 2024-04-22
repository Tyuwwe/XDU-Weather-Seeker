var map = new BMap.Map("allmap");
var point = new BMap.Point(116.331398, 39.897445);
map.centerAndZoom(point, 12);
map.enableScrollWheelZoom(true);
let nowpoint;

var geolocation = new BMap.Geolocation();
geolocation.getCurrentPosition(function (r) {
    if (this.getStatus() == BMAP_STATUS_SUCCESS) {
        var mk = new BMap.Marker(r.point);

        map.addOverlay(mk);
        map.panTo(r.point);
    }
    else {
        console.log('failed' + this.getStatus());
    }
}, {enableHighAccuracy: true});
map.addEventListener("click", function (e) {
    map.clearOverlays();
    nowpoint = e.point;
    console.log(nowpoint);
    var new_point = new BMap.Point(e.point.lng, e.point.lat);
    var new_mk = new BMap.Marker(new_point);
    map.addOverlay(new_mk);
    map.panTo(new_point);


    var gc = new BMap.Geocoder();
    gc.getLocation(new_point, function (rs) {
        var addComp = rs.addressComponents;
        console.log(addComp);
        document.getElementById("province").innerText = addComp.province;
        document.getElementById("city").innerText = addComp.city;
        document.getElementById("district").innerText = addComp.district;
    });
});