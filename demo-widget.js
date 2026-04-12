/**
 * Voice Helper Demo Widget — Embedded Chat Component
 *
 * Drop into any static page. Connects to Render backend via HTTP API.
 * Fallback: mock mode when backend is unavailable.
 *
 * Usage:
 *   <div id="voice-helper-demo" data-api-url="https://your-app.onrender.com"></div>
 *   <script src="demo-widget.js"></script>
 */

(function () {
  "use strict";

  // ── Configuration ──
  const DEFAULT_API_URL = "";  // Empty = mock mode
  const MOCK_REPLIES = [
    "嗯，我理解你的意思。能再多说说吗？",
    "这个想法很有意思！让我想想...",
    "我记得你之前提到过类似的事情。我们之前聊到...",
    "哈哈，确实是这样！你总是有很有趣的视角。",
    "我在听，继续说~",
    "这个问题很好。从我的角度来看...",
    "我能感受到你现在的状态。一切都好吗？",
    "让我帮你想想有什么办法。",
    "你知道吗？刚才你说的这个让我想到一个有意思的点——",
    "嗯？然后呢，我很想知道后面发生了什么。",
  ];

  // ── State ──
  let sessionId = "demo_" + Date.now().toString(36);
  let messages = [];
  let isWaiting = false;
  let apiUrl = "";
  let useMock = true;

  // ── Init ──
  function init() {
    var container = document.getElementById("voice-helper-demo");
    if (!container) return;

    apiUrl = container.getAttribute("data-api-url") || DEFAULT_API_URL;
    useMock = !apiUrl || apiUrl === "";

    container.innerHTML = buildHTML();
    bindEvents(container);

    // Add welcome message after a short delay
    setTimeout(function () {
      addMessage("assistant", "你好！我是 Voice Helper 👋 一个会成长的 AI 伙伴。\n\n不只是回答问题，我还会记住我们聊过的内容、理解上下文、在合适的时候主动关心你。试试跟我聊聊吧~");
    }, 600);
  }

  // ── Build HTML ──
  function buildHTML() {
    return (
      '<div class="vh-demo">' +
        '<div class="vh-header">' +
          '<div class="vh-status">' +
            '<span class="vh-dot" id="vh-status-dot"></span>' +
            '<span class="vh-status-text" id="vh-status-text">初始化中</span>' +
          '</div>' +
          '<div class="vh-title-row">' +
            '<svg class="vh-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>' +
            '<span>Voice Helper <span class="vh-badge">Demo</span></span>' +
          '</div>' +
        '</div>' +

        '<div class="vh-messages" id="vh-messages"></div>' +

        '<div class="vh-input-area">' +
          '<div class="vh-input-wrap">' +
            '<input type="text" id="vh-input" placeholder="输入消息... (试试问：你是谁？)" autocomplete="off" />' +
            '<button id="vh-send" title="发送">' +
              '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>' +
            '</button>' +
          '</div>' +
          '<div class="vh-hint" id="vh-hint">按 Enter 发送 · 基于 DashScope Qwen · 当前: ' + (useMock ? '模拟模式' : 'API模式') + '</div>' +
        '</div>' +
      "</div>"
    );
  }

  // ── Styles (injected) ──
  function injectStyles() {
    if (document.getElementById("vh-demo-styles")) return;
    var css = document.createElement("style");
    css.id = "vh-demo-styles";
    css.textContent =
      ".vh-demo{width:100%;max-width:600px;height:440px;border:1px solid rgba(13,148,136,.25);" +
      "border-radius:14px;background:rgba(10,22,40,.96);display:flex;flex-direction:column;" +
      "font-family:Inter,system-ui,sans-serif;overflow:hidden;position:relative}" +
      ".vh-demo::before{content:'';position:absolute;inset:0;background:radial-gradient(circle at 50% 0%,rgba(13,148,136,.08),transparent 70%);pointer-events:none}" +

      /* Header */
      ".vh-header{padding:14px 18px 10px;border-bottom:1px solid rgba(255,255,255,.06);display:flex;align-items:center;justify-content:space-between;z-index:1}" +
      ".vh-title-row{display:flex;align-items:center;gap:8px;color:#e2e8f0;font-size:.85rem;font-weight:500}" +
      ".vh-icon{width:20px;height:20px;color:#0D9488;opacity:.8}" +
      ".vh-badge{background:rgba(13,148,136,.15);color:#14B8A6;padding:1px 7px;border-radius:8px;font-size:.65rem;font-weight:600;margin-left:4px}" +

      /* Status */
      ".vh-status{display:flex;align-items:center;gap:5px;font-size:.65rem;color:rgba(255,255,255,.45)}" +
      ".vh-dot{width:7px;height:7px;border-radius:50%;background:#ef4444;transition:background .3s}" +
      ".vh-dot.online{background:#22c55e;box-shadow:0 0 6px rgba(34,197,94,.5)}" +
      ".vh-dot.mock{background:#F59E0B;box-shadow:0 0 6px rgba(245,158,11,.4)}" +

      /* Messages */
      ".vh-messages{flex:1;overflow-y:auto;padding:12px 16px;display:flex;flex-direction:column;gap:10px;z-index:1;scroll-behavior:smooth}" +
      ".vh-msg{max-width:85%;padding:9px 14px;border-radius:12px;font-size:.82rem;line-height:1.6;animation:vhFadeIn .25s ease;word-break:break-word}" +
      "@keyframes vhFadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}" +
      ".vh-msg-user{align-self:flex-end;background:linear-gradient(135deg,rgba(13,148,136,.2),rgba(13,148,136,.08));border-bottom-right-radius:3px;color:#e2e8f0;border:1px solid rgba(13,148,136,.15)}" +
      ".vh-msg-ai{align-self:flex-start;background:rgba(255,255,255,.04);border-bottom-left-radius:3px;color:rgba(255,255,255,.82);border:1px solid rgba(255,255,255,.07)}" +
      ".vh-msg-system{align-self:center;background:transparent;color:rgba(255,255,255,.35);font-size:.72rem;text-align:center;border:none;padding:4px 0}" +
      ".vh-msg pre{background:rgba(0,0,0,.25);border-radius:6px;padding:8px 10px;margin:6px 0;overflow-x:auto;font-size:.76rem;line-height:1.5}" +

      /* Typing indicator */
      ".vh-typing{align-self:flex-start;display:flex;gap:4px;padding:9px 14px}" +
      ".vh-typing span{width:6px;height:6px;border-radius:50%;background:rgba(13,148,136,.5);animation:vHBounce 1.2s ease infinite}" +
      ".vh-typing span:nth-child(2){animation-delay:.15s}.vh-typing span:nth-child(3){animation-delay:.3s}" +
      "@keyframes vHBounce{0%,80%,100%{transform:scale(.6);opacity:.4}40%{transform:scale(1);opacity:1}}" +

      /* Input */
      ".vh-input-area{padding:10px 16px 14px;border-top:1px solid rgba(255,255,255,.06);z-index:1}" +
      ".vh-input-wrap{display:flex;gap:8px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:28px;padding:4px 6px 4px 16px;transition:border-color .2s}" +
      ".vh-input-wrap:focus-within{border-color:rgba(13,148,136,.4)}" +
      ".vh-input{flex:1;background:transparent;border:none;outline:none;color:rgba(255,255,255,.55);font-size:.83rem;font-family:inherit;-webkit-appearance:none;-moz-appearance:none;appearance:none}" +
      ".vh-input::placeholder{color:rgba(255,255,255,.3)}" +
      "#vh-send{background:none;border:none;color:#0D9488;cursor:pointer;padding:6px 8px;border-radius:50%;display:flex;align-items:center;justify-content:center;transition:all .2s}" +
      "#vh-send:hover{color:#14B8A6;background:rgba(13,148,136,.1)}" +
      "#vh-send:disabled{color:rgba(255,255,255,.2);cursor:not-allowed}" +
      ".vh-hint{text-align:center;font-size:.62rem;color:rgba(255,255,255,.25);margin-top:6px;letter-spacing:.03em}";
    document.head.appendChild(css);
  }

  // ── Events ──
  function bindEvents(container) {
    var input = container.querySelector("#vh-input");
    var sendBtn = container.querySelector("#vh-send");

    sendBtn.addEventListener("click", function () { sendMessage(input.value); });
    input.addEventListener("keydown", function (e) {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendMessage(input.value);
      }
    });

    // Check API status
    checkApiStatus();
  }

  function checkApiStatus() {
    var dot = document.getElementById("vh-status-dot");
    var text = document.getElementById("vh-status-text");
    var hint = document.getElementById("vh-hint");

    if (useMock) {
      dot.className = "vh-dot mock";
      text.textContent = "模拟模式";
      if (hint) hint.textContent = "按 Enter 发送 · 模拟回复（部署后端后切换为真实 AI）";
      return;
    }

    fetch(apiUrl + "/health", { method: "GET", mode: "cors" })
      .then(function (r) { return r.json(); })
      .then(function (data) {
        if (data.status === "ok") {
          dot.className = "vh-dot online";
          text.textContent = data.model + " 已连接";
          useMock = false;
          if (hint) hint.textContent = "按 Enter 发送 · " + data.model + " · 实时对话模式";
        }
      })
      .catch(function () {
        dot.className = "vh-dot mock";
        text.textContent = "模拟模式（后端离线）";
        if (hint) hint.textContent = "按 Enter 发送 · 后端不可用，使用模拟回复";
        useMock = true;
      });
  }

  // ── Message handling ──
  function addMessage(role, content) {
    messages.push({ role: role, content: content });
    renderMessages();
  }

  function renderMessages() {
    var container = document.getElementById("vh-messages");
    if (!container) return;

    var html = "";
    messages.forEach(function (msg) {
      // Simple markdown-like formatting for AI messages
      var formattedContent = msg.role === "ai"
        ? formatAI(msg.content)
        : escapeHtml(msg.content);

      if (msg.role === "system") {
        html += '<div class="vh-msg vh-msg-system">' + escapeHtml(msg.content) + "</div>";
      } else if (msg.role === "user") {
        html += '<div class="vh-msg vh-msg-user">' + formattedContent + "</div>";
      } else {
        html += '<div class="vh-msg vh-msg-ai">' + formattedContent + "</div>";
      }
    });

    if (isWaiting && (!messages.length || messages[messages.length - 1].role !== "ai")) {
      html +=
        '<div class="vh-typing" id="vh-typing"><span></span><span></span><span></span></div>';
    }

    container.innerHTML = html;
    container.scrollTop = container.scrollHeight;
  }

  async function sendMessage(text) {
    text = (text || "").trim();
    if (!text || isWaiting) return;

    var input = document.getElementById("vh-input");
    var sendBtn = document.querySelector("#vh-send");

    addMessage("user", text);
    input.value = "";
    isWaiting = true;
    sendBtn.disabled = true;
    renderMessages();

    try {
      if (useMock) {
        await simulateReply(text);
      } else {
        await callAPI(text);
      }
    } catch (err) {
      addMessage("assistant", "抱歉，出了点问题：" + err.message);
    } finally {
      isWaiting = false;
      sendBtn.disabled = false;
      renderMessages();
    }
  }

  async function simulateReply(userText) {
    // Simulate thinking delay
    await delay(700 + Math.random() * 1200);

    // Context-aware replies
    var reply;
    var lower = userText.toLowerCase();

    if (/你好|hi|hello|嗨|hey/.test(lower)) {
      reply = "嗨！很高兴见到你 😊 我是 Voice Helper，一个会记住我们之间对话的 AI 伙伴。今天过得怎么样？";
    } else if (/名字|who are you|你是谁|介绍|what are you/.test(lower)) {
      reply = "我是 Voice Helper —— 一个「会来事儿」的 AI 伙伴 🧠\n\n我不只是问答工具：\n• **记忆性** — 记住我们聊过的事\n• **主动性** — 在你需要时主动出现\n• **成长性** — 越用越懂你\n\n想了解更多的话可以看看上方的 Tech Stack 章节~";
    } else if (/功能|能力|can you do|能做|特性|feature/.test(lower)) {
      reply = "当前已实现的能力包括：\n\n🎤 **实时语音交互** — 双 Provider 支持（OpenAI + DashScope），端到端延迟 <1.5s\n🧠 **四态状态机** — IDLE / ENGAGED / FADING / SILENT，LLM 驱动转换\n💾 **记忆系统** — Mem0 向量存储 + Qdrant，跨会话记忆\n🔔 **主动触发** — 基于记忆和上下文的智能主动发言\n🤫 **静默模式** — 只倾听不回应，支持指令执行\n✋ **打断机制** — 用户可随时插话中断 AI 输出";
    } else if (/架构|architect|tech stack|技术|怎么实现/.test(lower)) {
      reply = "Voice Helper 采用双模型混合架构：\n\n**热路径（语音层）**：OpenAI Realtime API 或 DashScope Qwen-Omni-Realtime，负责超低延迟音频流处理。\n\n**冷路径（智能层）**：DashScope Qwen 驱动的 Brain 异步引擎，负责状态机转换、记忆读写、意图判断等所有 LLM 调用。\n\n关键设计：热路径绝不等待冷路径。Brain 的 process_input() 是 fire-and-forget 的。";
    } else if (/谢谢|thank|thx|感谢/.test(lower)) {
      reply = "不客气！有需要随时找我~ 对了，你可以往上滚动看看完整的项目介绍和路线图 📖";
    } else if (/代码|source code|github|开源|源码/.test(lower)) {
      reply = "项目完全开源！点击页面底部的「View Source on GitHub」按钮即可查看全部源码。核心文件包括 `main.py`、`brain.py`、`state_machine.py`、`memory.py` 等。";
    } else if (/silent|静默|安静|别说话/.test(lower)) {
      reply = "(已进入 SILENT 模式)\n\n我现在只会倾听，不会主动回应。如果你需要我执行什么指令可以直接说（比如「设个闹钟」），或者对我说「你可以说话了」来退出静默模式。";
    } else {
      // Random contextual replies
      var pool = MOCK_REPLIES.filter(function(r){return r!==MOCK_REPLIES[0]});
      reply = pool[Math.floor(Math.random() * pool.length)];
    }

    addMessage("assistant", reply);
  }

  async function callAPI(text) {
    var resp = await fetch(apiUrl + "/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text, session_id: sessionId }),
    });
    if (!resp.ok) throw new Error("API 返回错误 (" + resp.status + ")");

    var data = await resp.json();
    addMessage("assistant", data.reply);
  }

  // ── Utilities ──
  function escapeHtml(s) {
    var div = document.createElement("div");
    div.textContent = s;
    return div.innerHTML;
  }

  function formatAI(text) {
    // Simple markdown: bold, line breaks
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\n/g, "<br>");
  }

  function delay(ms) {
    return new Promise(function (resolve) { setTimeout(resolve, ms); });
  }

  // ── Bootstrap ──
  injectStyles();
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
