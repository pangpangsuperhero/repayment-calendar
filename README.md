# 还款日历

把花呗、美团月付、抖音月付和京东白条的固定还款日放在一张月历上。支持当月单独改期、标记已还，以及用 JSON 导出和恢复本机记录。它不连接账单平台，不存金额，也不提供锁屏通知。

## 部署到 GitHub Pages

1. 新建一个名为 `repayment-calendar` 的仓库。如果使用 GitHub Free，选择 **Public**。可以同时勾选 **Add a README file** 以初始化默认分支。
2. 解压发布包，在仓库打开 **Code → Add file → Upload files**。把解压目录**里面的内容**拖入窗口，保留 `icons` 文件夹。不要上传 ZIP，不要套入额外的外层文件夹。若第一步已生成 README，可跳过包里的 README。
3. 提交到 `main`。确认打开仓库时直接看得到 `index.html`、`manifest.webmanifest`、`sw.js`、`version.json` 和 `icons/`。
4. 打开 **Settings → Pages**，在 **Source** 选 **Deploy from a branch**，选择 **main / (root)**，然后 **Save**。
5. 等 **Pages** 页面出现 **Visit site**，用 iPhone 的 Safari 打开该 HTTPS 网址。点 **分享 → 添加到主屏幕**，如果有「作为网页 App 打开」选项就开启。
6. 第一次打开主屏幕图标时保持联网，等页面加载完成。之后可开飞行模式，重新打开图标，检查日历能否离线使用。建议使用固定的网址、从同一个图标进入。

个人还款记录只留在使用网页的设备中，不会发到 GitHub。导出的 JSON 是你的个人备份，请勿上传到公开仓库。

## 后续更新

在同一个仓库覆盖更新整套文件，保留网址。发布新版时，把 `index.html` 中的 `app-version`、`sw.js` 中的 `VERSION` 和 `version.json` 更新到相同的新版本号。已有用户再次联网打开网页时，后台下载新版，下载完成后可以点「立即更新」。同一网址下，更新不会清空记录。换网址、换手机前请先手动导出备份，之后再导入。
