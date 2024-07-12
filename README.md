# XDU-Weather-Seeker

## 西电 B 测 - 雾霾检测系统

基于百度地图 API 和和风天气 API 的网页，纯原生 JS 开发，支持本地保存城市，本地存储功能使用 LocalStorage 实现。

## 如何使用？

首先，去 [百度地图开发者平台](https://lbsyun.baidu.com/apiconsole/center) 注册一个百度地图开发者账号，获得AK之后将其填入 index.html 文件的第 6 行中 &ak= 后面，替换掉 your_baidumap_api_key_here 字样。

然后，去 [和风天气开发者平台](https://dev.qweather.com/) 注册一个和风天气开发者账号，获得APIKey之后将其填入 js 目录下的 index.js 文件第275行 apiKey 变量后面，替换掉 your_qweather_api_key_here 字样。

然后就完成了，使用任何 Chromium 内核浏览器，例如 Edge，即可测试。

点击地图即可选择位置并添加城市，自动获取天气。

## 不足之处

目前没做触摸屏适配，地图只能用鼠标点。

可能还有一些 bug，懒得修了，点左边的菜单里面的清空可以清空 LocalStorage 缓存，方便 Debug。

## 其他

祝各位 XDUer 都能轻松过测！

Developer: [Tyuwwe ](https://github.com/tyuwwe)& [CrossS](https://github.com/1825988774)
