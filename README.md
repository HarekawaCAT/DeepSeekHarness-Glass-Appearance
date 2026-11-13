# 玻璃外观 · dsh-glass-appearance

给 [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) Web UI 加一层玻璃质感：背景图自定义，侧边栏、对话框、卡片、菜单、输入框、消息气泡可自定义透明度与模糊，允许文字颜色自定义，支持明暗不同版本。

A glass layer for the DeepSeek Harness Web UI — custom wallpaper, per-panel opacity, per-panel blur, and a text color you pick.

> 非官方插件，与 DeepSeek 无隶属关系。基于 DSH `0.2.2-rc.1` 开发与验证。

![玻璃外观：主界面](docs/home.webp)

## 安装

方式一：

在 DSH 里让 Agent 执行：

```
plugin_manager(action: "install_bundle", target: "git+https://github.com/HarekawaCAT/DeepSeekHarness-Glass-Appearance.git")
```

方式二：

下载本仓库的 zip 并解压（解压后出现 `package.json`），然后：

```
plugin_manager(action: "install_bundle", target: "D:\\plugins\\dsh-glass-appearance")
```


安装后到 设置 - 玻璃外观 调整。

卸载：设置 - 插件里停用或移除，界面立即还原成默认外观。

## 有什么

![背景](docs/wallpaper.webp)
3 套预设（极光 / 暮色 / 石墨），支持本地图片自定义，添加视频背景开关                                                       
背景遮罩提高文字可读性；视频模式下会降低视频不透明度
![不透明度](docs/opacity.webp)
侧边栏/对话框与面板/卡片与代码块/菜单与弹层/输入框/添加文件按钮/消息气泡/确认目标对话框/回到底部按钮/悬停提示与详情框
![模糊](docs/blur.webp)
侧边栏/底边栏/输入框/对话框/弹层与菜单/对话代码块/消息气泡/新会话按钮/添加文件按钮/确认目标对话框/回到底部按钮/悬停提示与详情框
自定义文字与按钮开关颜色
![账号行](docs/account.webp)
自定义左下角账号显示

设置存在 localStorage（键 `dsh.glass-appearance.v3`），下次启动自动恢复；停用插件后完全还原。v2 的旧设置会自动迁移。

## 图片背景

本地图片自定义，最长边 2200px ，避免报错，也可以直接填 `https://…` 图片地址

## 视频背景

「选择视频文件…」（本地，仅单次运行有效）、填视频 `https://…` 地址（长期保留）
1. 把视频放到 `<插件目录>/resources/background.mp4`（也支持 `.webm`）；
2. 设置 → 玻璃外观 → 背景 → 打开「视频背景」→ 点「使用 resources/background.mp4」。

## 兼容性

| DSH 版本 | 状态 |
|---|---|
| `0.2.2-rc.1` | 开发与验证的版本 |
| 其他 `0.2.x` | 预期可用；宿主大改类名时个别滑块可能失效，用「扫描不透明背景」自查 |
| `0.3.x` 及以后 | 未验证，`package.json` 的 `engines.dsh` 会阻止直接安装 |

只支持 Web GUI（`dsh.client.platform = web`），不涉及 TUI。

## 文件

| 文件 | 作用 |
|---|---|
| `index.js` | Host 半边：`/glass-assets/` 只读静态路由 |
| `client.js` | Client 半边：设置页、滑块、样式注入、背景与视频 |
| `cordis.patch.yml` | 插入 Host 插件行 |
| `locale/*.json` | 插件列表里的标题与描述 |
| `icon.svg` | 插件图标 |
| `resources/` | 视频/图片存放目录（内容不进 git） |

## 许可证

[MIT](LICENSE)
