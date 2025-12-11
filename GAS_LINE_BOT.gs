/**
 * =====================================================
 * ⚜️ 黃金聖衣生成器 - GAS 後端（LINE Bot 專用）
 * =====================================================
 * 
 * 功能：
 * ✅ LINE Bot Webhook（自動回覆 User ID）
 * ✅ LINE Bot 發送訊息
 * 
 * 📌 Google Docs 上傳現在使用前端 OAuth，不需要 GAS！
 * 
 * 📋 【部署步驟】：
 * 1. 前往 https://script.google.com/
 * 2. 建立新專案，命名為「Gold-Cloth-LINE-Bot」
 * 3. 貼上此程式碼
 * 4. 在下方填入你的 LINE Channel Token ⬇️
 * 5. 部署 → 新增部署 → 網頁應用程式
 * 6. 執行身分：我
 * 7. 誰可以存取：所有人
 * 8. 複製「網頁應用程式網址」
 * 
 * 📋 【設定 LINE Webhook】（取得 User ID）：
 * 1. 前往 LINE Developers Console
 * 2. Messaging API → Webhook URL → 貼上 GAS 網址
 * 3. 開啟 Use webhook
 * 4. 傳訊息給 Bot 就會收到 User ID
 * 
 * =====================================================
 */

// ==================== ⬇️ 請填入你的設定 ⬇️ ====================
const LINE_CHANNEL_TOKEN = ''; // 貼上你的 LINE Channel Access Token
// ============================================================

/**
 * 處理 GET 請求（測試連線用）
 */
function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: 'ok',
    message: '⚜️ 黃金聖衣生成器 LINE Bot 運作中！',
    features: ['LINE Bot Webhook', 'LINE 訊息發送'],
    timestamp: new Date().toISOString(),
    version: '2.1.0'
  })).setMimeType(ContentService.MimeType.JSON);
}

/**
 * 處理 POST 請求（主要功能）
 */
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    
    // 判斷是 LINE Webhook 還是前端 API 請求
    if (data.events) {
      return handleLineWebhook(data);
    }
    
    // 前端 API 請求
    const action = data.action;
    let result;
    
    switch (action) {
      case 'pushMessage':
        result = pushMessage(data);
        break;
      case 'pushImage':
        result = pushImageMessage(data);
        break;
      case 'getBotInfo':
        result = getBotInfo(data);
        break;
      case 'getProfile':
        result = getUserProfile(data);
        break;
      default:
        result = { success: false, error: '未知的操作: ' + action };
    }
    
    return ContentService.createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.message
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// ==================== LINE Webhook 處理 ====================

/**
 * 處理 LINE Webhook - 自動回覆 User ID
 */
function handleLineWebhook(data) {
  const events = data.events;
  
  if (events && events.length > 0) {
    for (const event of events) {
      const source = event.source;
      const replyToken = event.replyToken;
      
      let userId = source.userId || '無法取得';
      let groupId = source.groupId || null;
      let roomId = source.roomId || null;
      
      // 只處理訊息事件
      if (event.type === 'message' && replyToken) {
        let replyText = `🆔 您的 LINE 識別碼

━━━━━━━━━━━━━━━━

👤 User ID:
${userId}

`;
        
        if (groupId) {
          replyText += `👥 Group ID:
${groupId}

`;
        }
        
        if (roomId) {
          replyText += `🏠 Room ID:
${roomId}

`;
        }
        
        replyText += `━━━━━━━━━━━━━━━━

📋 請複製 User ID 到應用程式的「LINE User ID」欄位

⚜️ 黃金聖衣生成器`;
        
        replyMessage(replyToken, replyText);
      }
    }
  }
  
  return ContentService.createTextOutput('OK');
}

/**
 * 回覆訊息（Webhook 用）
 */
function replyMessage(replyToken, text) {
  const token = LINE_CHANNEL_TOKEN;
  
  if (!token) {
    console.log('未設定 Channel Token');
    return;
  }
  
  const url = 'https://api.line.me/v2/bot/message/reply';
  
  const payload = {
    replyToken: replyToken,
    messages: [{ type: 'text', text: text }]
  };
  
  const options = {
    method: 'post',
    contentType: 'application/json',
    headers: { 'Authorization': 'Bearer ' + token },
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  };
  
  try {
    UrlFetchApp.fetch(url, options);
  } catch (error) {
    console.log('回覆失敗: ' + error.message);
  }
}

// ==================== LINE Bot 發送功能 ====================

/**
 * 發送文字訊息
 */
function pushMessage(data) {
  const token = data.channelToken || LINE_CHANNEL_TOKEN;
  const userId = data.userId;
  const message = data.message;
  
  if (!token || !userId || !message) {
    return { success: false, error: '缺少必要參數' };
  }
  
  const url = 'https://api.line.me/v2/bot/message/push';
  
  const payload = {
    to: userId,
    messages: [{ type: 'text', text: message }]
  };
  
  const options = {
    method: 'post',
    contentType: 'application/json',
    headers: { 'Authorization': 'Bearer ' + token },
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  };
  
  try {
    const response = UrlFetchApp.fetch(url, options);
    const responseCode = response.getResponseCode();
    
    if (responseCode === 200) {
      return { success: true, message: '訊息發送成功！' };
    } else {
      const errorBody = JSON.parse(response.getContentText());
      return { success: false, error: errorBody.message || '發送失敗' };
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * 發送圖片訊息
 */
function pushImageMessage(data) {
  const token = data.channelToken || LINE_CHANNEL_TOKEN;
  const userId = data.userId;
  const imageUrl = data.imageUrl;
  const previewUrl = data.previewUrl || imageUrl;
  
  if (!token || !userId || !imageUrl) {
    return { success: false, error: '缺少必要參數' };
  }
  
  const url = 'https://api.line.me/v2/bot/message/push';
  
  const payload = {
    to: userId,
    messages: [{
      type: 'image',
      originalContentUrl: imageUrl,
      previewImageUrl: previewUrl
    }]
  };
  
  const options = {
    method: 'post',
    contentType: 'application/json',
    headers: { 'Authorization': 'Bearer ' + token },
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  };
  
  try {
    const response = UrlFetchApp.fetch(url, options);
    return response.getResponseCode() === 200 
      ? { success: true, message: '圖片發送成功！' }
      : { success: false, error: '發送失敗' };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * 取得 Bot 資訊
 */
function getBotInfo(data) {
  const token = data.channelToken || LINE_CHANNEL_TOKEN;
  
  if (!token) {
    return { success: false, error: '缺少 Channel Token' };
  }
  
  const url = 'https://api.line.me/v2/bot/info';
  
  const options = {
    method: 'get',
    headers: { 'Authorization': 'Bearer ' + token },
    muteHttpExceptions: true
  };
  
  try {
    const response = UrlFetchApp.fetch(url, options);
    
    if (response.getResponseCode() === 200) {
      return { success: true, botInfo: JSON.parse(response.getContentText()) };
    } else {
      return { success: false, error: 'Token 無效' };
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * 取得用戶資料
 */
function getUserProfile(data) {
  const token = data.channelToken || LINE_CHANNEL_TOKEN;
  const userId = data.userId;
  
  if (!token || !userId) {
    return { success: false, error: '缺少必要參數' };
  }
  
  const url = 'https://api.line.me/v2/bot/profile/' + userId;
  
  const options = {
    method: 'get',
    headers: { 'Authorization': 'Bearer ' + token },
    muteHttpExceptions: true
  };
  
  try {
    const response = UrlFetchApp.fetch(url, options);
    
    if (response.getResponseCode() === 200) {
      return { success: true, profile: JSON.parse(response.getContentText()) };
    } else {
      return { success: false, error: '無法取得用戶資料' };
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// ==================== 測試函數 ====================

/**
 * 測試發送 LINE 訊息（需在 GAS 編輯器中填入 User ID）
 */
function testPushMessage() {
  const testUserId = ''; // 填入你的 User ID 測試
  
  if (!testUserId) {
    Logger.log('請填入測試用的 User ID');
    return;
  }
  
  const result = pushMessage({
    userId: testUserId,
    message: '🧪 測試訊息 from GAS\n\n⚜️ 黃金聖衣生成器 LINE Bot 運作正常！'
  });
  Logger.log(result);
}
