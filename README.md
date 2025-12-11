# ⚜️ 黃金聖衣生成器 V2.15 PRO

> Gold Cloth Generator - 聖鬥士星矢風格圖像編輯器

![Version](https://img.shields.io/badge/version-2.1-gold)
![License](https://img.shields.io/badge/license-MIT-purple)
![Platform](https://img.shields.io/badge/platform-Web-blue)

## ✨ 功能特色

### 🎬 開場動畫
- 【聖】字 3D 旋轉動畫
- 紫色光環 + 黃金脈衝特效
- 12 星座符號環繞動畫

### 🔐 API 整合

| 服務 | 功能 | 認證方式 |
|------|------|----------|
| **Gemini API** | AI 圖像解析 | API Key |
| **Google Docs** | 自動建立新文件 | **前端 OAuth** ⭐ |
| **LINE Bot** | 操作通知 | GAS 代理 |

### 📄 Google Docs 上傳（新架構！）
- ✅ 使用前端 OAuth 直接認證
- ✅ 不需要 GAS 代理
- ✅ 文件直接存到你的 Google Drive
- ✅ 圖文並茂（AI 分析結果）

### 📱 LINE 通知觸發時機

| 操作 | LINE 通知內容 |
|------|--------------|
| 💾 下載圖像 | 圖像已下載 + 檔名 |
| 📄 上傳 Google Docs | 新文件連結 |
| 📷 上傳相簿 | 圖像已準備 |
| 📤 分享圖像 | 分享/複製成功 |

### 🎨 編輯功能
- 6 種相框樣式：無 / 黃金 / 宇宙 / 火焰 / 冰霜 / 雷電
- 4 種濾鏡效果：原圖 / 黃金光 / 宇宙 / 復古
- 浮水印選項：日期 / 星座 / Logo

## 🚀 快速開始

### 1️⃣ 部署網站

```bash
git clone https://github.com/你的帳號/Gold-Cloth-251210.git
cd Gold-Cloth-251210
# 在 GitHub 設定 Pages，選擇 main 分支
```

### 2️⃣ 設定 Google Docs（前端 OAuth）⭐ 重要！

1. 前往 [Google Cloud Console](https://console.cloud.google.com/)
2. 建立新專案或選擇現有專案
3. 啟用 **Google Drive API**
4. 前往「憑證」→「建立憑證」→「OAuth 用戶端 ID」
5. 應用程式類型：**網頁應用程式**
6. 授權的 JavaScript 來源：
   - `https://你的網域.github.io`
   - 或 `http://localhost:xxxx`（本地測試）
7. 複製 **Client ID** 貼到應用程式

**OAuth 同意畫面設定：**
1. 用戶類型：外部
2. 新增範圍：`drive.file`、`documents`
3. 新增測試使用者（你的 Gmail）

### 3️⃣ 設定 LINE Bot（選用）

**部署 GAS：**
1. 前往 [Google Apps Script](https://script.google.com/)
2. 建立新專案「Gold-Cloth-LINE-Bot」
3. 貼上 `GAS_LINE_BOT.gs` 程式碼
4. 填入 LINE Channel Token
5. 部署 → 新增部署 → 網頁應用程式

**設定 Webhook：**
1. 前往 [LINE Developers Console](https://developers.line.biz/console/)
2. Webhook URL → 貼上 GAS 網址
3. 開啟 Use webhook
4. 傳訊息給 Bot → 收到 User ID

### 4️⃣ 填入應用程式設定

| 設定項目 | 填入內容 |
|---------|---------|
| Gemini API Key | 從 Google AI Studio 取得 |
| Google Client ID | 從 GCP Console 取得 |
| LINE Bot - GAS 網址 | 部署的 GAS 網址 |
| LINE Bot - Channel Token | 從 LINE Developers 取得 |
| LINE Bot - User ID | 傳訊息給 Bot 取得 |

## 📁 檔案結構

```
Gold-Cloth-251210/
├── index.html          # 主程式
├── GAS_LINE_BOT.gs     # LINE Bot GAS 後端
├── README.md           # 說明文件
├── LICENSE             # MIT 授權
├── netlify.toml        # Netlify 設定
└── DEPLOY.ps1          # PowerShell 部署腳本
```

## 🔧 架構說明

### Google Docs 上傳（新架構）
```
用戶 → 前端 OAuth 授權 → 直接呼叫 Google Drive API → 建立文件
```
- 不需要 GAS 代理
- Token 儲存在 localStorage（24 小時有效）
- 文件直接存到用戶的 Google Drive

### LINE Bot 通知
```
用戶操作 → 前端發送請求 → GAS 代理 → LINE Messaging API
```
- GAS 處理 CORS 問題
- Webhook 自動回覆 User ID

## 📱 支援的 12 星座

| 符號 | 中文 | 英文 |
|:---:|------|------|
| ♈ | 白羊座 | Aries |
| ♉ | 金牛座 | Taurus |
| ♊ | 雙子座 | Gemini |
| ♋ | 巨蟹座 | Cancer |
| ♌ | 獅子座 | Leo |
| ♍ | 處女座 | Virgo |
| ♎ | 天秤座 | Libra |
| ♏ | 天蠍座 | Scorpio |
| ♐ | 射手座 | Sagittarius |
| ♑ | 摩羯座 | Capricorn |
| ♒ | 水瓶座 | Aquarius |
| ♓ | 雙魚座 | Pisces |

## 🛠️ 技術架構

- **前端**：HTML5 + CSS3 + Vanilla JavaScript
- **儲存**：IndexedDB + localStorage
- **Google 認證**：OAuth 2.0（前端 GIS）
- **LINE Bot**：Google Apps Script 代理
- **API**：Gemini Vision / Google Drive / LINE Messaging

## 📄 授權

MIT License

---

⚜️ **燃燒小宇宙！** ⚜️
