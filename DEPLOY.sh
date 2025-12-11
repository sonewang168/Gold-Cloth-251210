#!/bin/bash
# =====================================================
# 🚀 GitHub 推送指令 - Gold-Cloth-251210
# =====================================================

# ==================== 步驟 1：GitHub 建立新倉庫 ====================
# 
# 方法 A：網頁建立 (推薦)
# 1. 前往 https://github.com/new
# 2. Repository name: Gold-Cloth-251210
# 3. Description: ⚜️ 黃金聖衣生成器 V2 PRO - 聖鬥士星矢風格 AI 圖像生成器
# 4. 選擇 Public 或 Private
# 5. ❌ 不要勾選 "Add a README file"
# 6. ❌ 不要勾選 "Add .gitignore"
# 7. ❌ 不要勾選 "Choose a license"
# 8. 點擊 "Create repository"
#
# 方法 B：使用 GitHub CLI (如果已安裝 gh)
# gh repo create Gold-Cloth-251210 --public --description "⚜️ 黃金聖衣生成器 V2 PRO"

# ==================== 步驟 2：本地 Git 初始化與推送 ====================

# 進入專案資料夾
cd Gold-Cloth-251210

# 初始化 Git
git init

# 設定使用者資訊 (如果尚未設定)
# git config user.name "你的名字"
# git config user.email "你的Email"

# 添加所有檔案
git add .

# 提交
git commit -m "🚀 Initial commit: 黃金聖衣生成器 V2 PRO

✨ Features:
- 開場【聖】字動畫 + 紫色光環特效
- Gemini API 圖像生成 + AI Vision 解析
- Google Photos 相簿上傳 + 日期浮水印
- Google Docs 圖文並茂報告
- LINE Bot (Messaging API) 完成通知
- IndexedDB 永久儲存
- 12 星座黃金聖衣選擇
- 6 種相框 + 4 種濾鏡
- 完整認證管理 (隱碼/儲存/清除)"

# 設定主分支
git branch -M main

# 添加遠端倉庫 (請將 YOUR_USERNAME 改成你的 GitHub 帳號)
git remote add origin https://github.com/YOUR_USERNAME/Gold-Cloth-251210.git

# 推送到 GitHub
git push -u origin main

# ==================== 完成！ ====================
echo "✅ 推送完成！"
echo "📂 倉庫網址: https://github.com/YOUR_USERNAME/Gold-Cloth-251210"
echo ""
echo "🌐 啟用 GitHub Pages:"
echo "   1. 前往倉庫 Settings → Pages"
echo "   2. Source 選擇 'Deploy from a branch'"
echo "   3. Branch 選擇 'main' / '/ (root)'"
echo "   4. 點擊 Save"
echo "   5. 等待幾分鐘後訪問: https://YOUR_USERNAME.github.io/Gold-Cloth-251210/"
