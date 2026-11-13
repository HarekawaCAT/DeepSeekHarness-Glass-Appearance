# 维护与发版

- 仓库：<https://github.com/HarekawaCAT/DeepSeekHarness-Glass-Appearance>
- 包名：`dsh-glass-appearance`

仓库名和包名不一样，没关系：安装认的是包名和 git 地址，仓库叫什么不影响。

## 目录关系

| 目录 | 包名 | 状态 |
|---|---|---|
| `plugins\dsh-glass-appearance` | `dsh-glass-appearance` | **发布版 = 本仓库 = 当前生效的插件** |
| `plugins\glass-appearance` | `@local/glass-appearance` | 旧版备份，已解除关联、不再生效，确认新的一切正常后可以删 |

当前 profile 装的是 `link:` 依赖，直接指向本目录。所以**改完源码要重启一次 DSH 才生效** —— HMR 只重载配置，不会重新加载已加载的 JS 模块。

## 发新版

1. 改代码 → 重启应用自测
2. 改 `package.json` 的 `version`（例如 `1.8.2` → `1.9.0`）
3. 提交、打标签、推送：

   ```powershell
   git add -A
   git commit -m "fix: 一句话说明改了什么"
   git tag v1.9.0
   git push origin main --tags
   ```

4. 网页上 **Releases → Draft a new release**，选刚才的 tag，写说明，发布。GitHub 会自动附上源码 zip，用户照着 README 的「方式二」下载即可。

版本号和 tag 保持一致，用户反馈问题时才对得上。

## 截图

放到 `docs/screenshot.png`（建议 ≤1 MB，PNG 或 WebP），然后把 `README.md` 顶部那行 `<!-- ![玻璃外观](docs/screenshot.png) -->` 的注释去掉再提交。

图片放在**包内**还有额外好处：DSH 插件详情页读的就是这份 README，相对路径的图片会通过本地路由渲染出来。

## 关于更新

git 安装的插件**没有自动更新**，用户要重新装一次（先 remove 再 install 同一个地址）。只有发布到 npm 的包才会在 DSH 里出现「检查更新」。

## 仓库设置

- **About**：描述填 `Glass UI for the DeepSeek Harness Web UI`
- **Topics**：`dsh-plugin`、`deepseek-harness`、`glassmorphism`、`theme`、`backdrop-filter` —— 别人主要靠这个搜到
- **Settings → Branches**：确认默认分支是 `main`
