# =====================================================
# 🚀 GitHub 推送指令 - Gold-Cloth-251210 (PowerShell)
# =====================================================

# 進入專案資料夾
cd Gold-Cloth-251210

# 初始化 Git
git init

# 添加所有檔案
git add .

# 提交
git commit -m "🚀 黃金聖衣生成器 V2 PRO"

# 設定主分支
git branch -M main

# 添加遠端倉庫 (請將 YOUR_USERNAME 改成你的 GitHub 帳號)
git remote add origin https://github.com/YOUR_USERNAME/Gold-Cloth-251210.git

# 推送到 GitHub
git push -u origin main

Write-Host "✅ 推送完成！" -ForegroundColor Green
