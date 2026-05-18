/**
 * 简历下载记录 - 云函数
 * 接收前端表单数据 → 写入飞书多维表格
 *
 * 环境变量（需在云函数配置中设置）：
 *   FEISHU_APP_ID        - 飞书应用 ID
 *   FEISHU_APP_SECRET    - 飞书应用 Secret
 *   BITABLE_APP_TOKEN    - 多维表格 Base Token: N7Icbnp1QaTKs0syhWhcBlR3ncg
 *   BITABLE_TABLE_ID     - 表格 ID: tblkU5upS7uaA5nI
 */

const https = require('https');

// ═══════════════════════════════════════════════════════════════════════
// 工具函数
// ═══════════════════════════════════════════════════════════════════════

function httpPost(url, body, headers = {}) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(body);
    const urlObj = new URL(url);
    const req = https.request({
      hostname: urlObj.hostname,
      path: urlObj.pathname + urlObj.search,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Content-Length': Buffer.byteLength(data),
        ...headers,
      },
    }, (res) => {
      let chunks = [];
      res.on('data', (chunk) => chunks.push(chunk));
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(Buffer.concat(chunks).toString()) });
        } catch (e) {
          resolve({ status: res.statusCode, data: Buffer.concat(chunks).toString() });
        }
      });
    });
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

// 获取 tenant_access_token
async function getTenantToken() {
  const appId = process.env.FEISHU_APP_ID;
  const appSecret = process.env.FEISHU_APP_SECRET;
  if (!appId || !appSecret) {
    throw new Error('Missing FEISHU_APP_ID or FEISHU_APP_SECRET env var');
  }
  const result = await httpPost('https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal', {
    app_id: appId,
    app_secret: appSecret,
  });
  if (result.data.code !== 0) {
    throw new Error(`Feishu auth failed: ${result.data.msg}`);
  }
  return result.data.tenant_access_token;
}

// 写入多维表格记录
async function createBitableRecord(token, fields) {
  const appToken = process.env.BITABLE_APP_TOKEN || 'N7Icbnp1QaTKs0syhWhcBlR3ncg';
  const tableId = process.env.BITABLE_TABLE_ID || 'tblkU5upS7uaA5nI';
  
  // 将 fields 对象转换为飞书 API 需要的格式
  const records = [{ fields }];
  
  const result = await httpPost(
    `https://open.feishu.cn/open-apis/bitable/v1/apps/${appToken}/tables/${tableId}/records`,
    { records },
    { Authorization: `Bearer ${token}` }
  );
  
  if (result.data.code !== 0) {
    throw new Error(`Bitable create failed: ${result.data.msg} (${result.data.code})`);
  }
  return result.data;
}

// ═══════════════════════════════════════════════════════════════════════
// 云函数入口
// ═══════════════════════════════════════════════════════════════════════

exports.main = async (event, context) => {
  // CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  try {
    // 处理 OPTIONS 预检请求
    if (event.httpMethod === 'OPTIONS') {
      return { statusCode: 200, headers: corsHeaders, body: '' };
    }

    // 仅接受 POST
    if (event.httpMethod !== 'POST') {
      return { statusCode: 405, headers: corsHeaders, body: JSON.stringify({ error: 'Method not allowed' }) };
    }

    // 解析请求体
    let body;
    try {
      body = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
    } catch (e) {
      return { statusCode: 400, headers: corsHeaders, body: JSON.stringify({ error: 'Invalid JSON body' }) };
    }

    const { email, company } = body;

    // 基础校验
    if (!email || !email.includes('@')) {
      return { statusCode: 400, headers: corsHeaders, body: JSON.stringify({ error: 'Invalid email' }) };
    }

    // 获取来源信息
    const sourceInfo = [];
    if (event.headers['x-forwarded-for']) sourceInfo.push(`IP: ${event.headers['x-forwarded-for'].split(',')[0].trim()}`);
    if (event.headers['user-agent']) sourceInfo.push(`UA: ${event.headers['user-agent']}`);
    if (event.headers['referer']) sourceInfo.push(`Ref: ${event.headers['referer']}`);

    // 获取飞书 token 并写入记录
    const token = await getTenantToken();
    
    await createBitableRecord(token, 
      // 使用字段名映射
      {
        '邮箱': email,
        '公司名称': company || '',
        '下载时间': new Date().toISOString(),
        '来源信息': sourceInfo.join(' | ') || '',
      }
    );

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({ success: true, message: 'Record created' }),
    };

  } catch (err) {
    console.error('Submit download error:', err);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ success: false, error: err.message }),
    };
  }
};
