把背景视频放在这个目录里，文件名用 background.mp4（也可以用 background.webm）。

然后在 Harness 里：设置 → 玻璃外观 → 背景 → 打开「视频背景」→ 点「使用 resources/background.mp4」。

原理：插件的主机半边（index.js）把本目录通过本地 HTTP 路由 /glass-assets/ 提供出去，
所以视频是"磁盘上的文件"，重启应用后依然有效，也不受 GUI 端口变化影响。
支持 mp4 / webm / mov / ogv，也支持 png / jpg / webp / gif（用图片地址引用即可）。

说明：
- 这里只服务本目录内部的文件，路径穿越会被拒绝（403）；
- 文件不存在时插件会探测失败并自动回退到背景图，不会黑屏；
- 视频 + 毛玻璃比较吃 GPU，卡的话把「背景遮罩」调高或关掉视频。
