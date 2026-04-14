// ============ EDITABLE CONSTANTS — Rock Chen 个人简介视频 ============

export const CONFIG = {
  WIDTH: 1920,
  HEIGHT: 1080,
  FPS: 60,
  DURATION_FRAMES: 1800, // 30 seconds @ 60fps
};

export const COLORS = {
  // Backgrounds
  bgDeep: "#0A1628",
  bgMid: "#0F2847",

  // Primary palette — Teal (tech/professional)
  teal: "#0D9488",
  tealLight: "#14B8A6",
  
  // Secondary palette — Amber (warmth/creativity)
  amber: "#F59E0B",
  amberLight: "#FBBF24",

  // Text
  textPrimary: "rgba(255,255,255,0.90)",
  textDim: "rgba(255,255,255,0.50)",
};

export const COPY = {
  opening: {
    label: "Personal Portfolio",
    title: "Rock Chen 陈厚瑄",
    subtitle: "AI 产品 × 数据分析 × 全栈工程\n让技术成为思想的延伸",
  },

  whoAmI: {
    label: "Who Am I · 我是谁",
    title: "一个用代码和产品思维解决问题的人",
    quote:
      "我不只做工具——我构建的是「理解你」的系统。",
    tags: [
      { text: "AI Product Manager", size: "lg", highlight: true },
      { text: "Full-Stack Engineer", size: "lg" },
      { text: "Data Analyst", size: "lg", icon: "📊" },
      { text: "Prompt Engineering", size: "" },
      { text: "LLM / SFT 微调", size: "", icon: "🧠" },
      { text: "Agent 工作流设计", size: "", highlight: true },
      { text: "Python / FastAPI", size: "" },
      { text: "SQL / Tableau", size: "" },
      { text: "GRE 322 · IELTS 7.5", size: "", icon: "🌏" },
      { text: "NTU MSc Business Analytics", size: "" },
      { text: "UIBE 经济学学士", size: "" },
      { text: "从 0→1 的独立开发者", size: "lg", highlight: true },
    ],
  },

  career: {
    label: "Career Journey · 职业旅程",
    title: "从数据到 AI，从分析师到创造者",
    experiences: [
      {
        company: "龙湖集团 Longfor",
        role: "数据产品经理",
        period: "2024.04 – 2025.06",
        highlight:
          "主导「智能问数助手」从 0 到 1 落地，将准确率从 50% 提升至 95%+。基于 API 封装 Claude Code 取数 Skill。",
        tags: ["NL2SQL", "LLM 产品", "Tableau"],
      },
      {
        company: "Groundup AI",
        role: "Product Manager（新加坡）",
        period: "2024.01 – 2024.04",
        highlight:
          "亲赴新加坡实地评估 IoT 传感器部署方案，主导全球供应链渠道搜索与 LoRa 低功耗方案选型。",
        tags: ["IoT", "B端解决方案", "海外"],
      },
      {
        company: "TCL 鸿鹄实验室",
        role: "产品经理",
        period: "2022.07 – 2022.11",
        highlight:
          "参与语音助手 SFT 训练语料设计，独立开发端到端数据流水线处理 4万+ 条训练数据，贡献模型准确率提升 6%。",
        tags: ["SFT", "数据工程", "NLP"],
      },
      {
        company: "核桃编程",
        role: "商业分析师",
        period: "2022.07 – 2022.09",
        highlight:
          "420 名用户漏斗分析定义关键断点，搭建 Tableau 数据看板将数据可用性提升 70%。",
        tags: ["漏斗分析", "Tableau", "CRM"],
      },
    ],
  },

  project: {
    label: "Star Project · 核心项目",
    name: "Voice Helper · 自主性 AI 伙伴",
    description:
      "发现现有 AI 交互的结构性缺陷——人永远是发起者。Voice Helper 让 AI 拥有记忆、主动性、成长性。全栈开发并上线部署。",
    features: [
      {
        name: "双模型架构",
        desc: "Realtime Voice + DashScope Qwen Brain，热路径与冷路径分离",
      },
      {
        name: "四态状态机",
        desc: "IDLE → ENGAGED → FADING → SILENT，LLM 驱动主动触发",
      },
      {
        name: "跨会话记忆",
        desc: "Mem0 + Qdrant 向量存储，语义检索跨对话知识",
      },
      {
        name: "<1.5s 响应延迟",
        desc: "异步不阻塞音频热路径，Server VAD 打断机制",
      },
    ],
  },

  outro: {
    title: "Build AI that truly understands you.",
    subtitle: "欢迎联系、合作、或一起探索下一代人机交互方式",
    cta: "Let's Connect →",
    contacts: [
      { icon: "📧", value: "15210235027@163.com" },
      { icon: "📱", value: "+86 152-1023-5027" },
      { icon: "🐙", value: "github.com/rockchen" },
    ],
  },
};

// ================================================================
