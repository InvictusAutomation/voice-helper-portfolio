// ============ EDITABLE CONSTANTS — 好奇心与探索精神个人视频 ============
// 所有视觉参数集中在此，便于用户一键修改

export const CONFIG = {
  WIDTH: 1920,
  HEIGHT: 1080,
  FPS: 30,
  DURATION_SEC: 30,
  DURATION_FRAMES: 30 * 30, // 30秒 @ 30fps = 900帧
};

// 现代简约配色方案
export const COLORS = {
  // 背景色系 - 星空/深邃
  bgDeep: "#0A0F1A",
  bgMid: "#1A2130",
  bgLight: "#2A3348",
  
  // 主色调 - 蓝绿色（好奇心/探索）
  primary: "#0EA5E9", // 天空蓝
  primaryLight: "#38BDF8",
  primaryDark: "#0284C7",
  
  // 辅助色 - 琥珀色（温暖/人性）
  accent: "#F59E0B",
  accentLight: "#FBBF24",
  
  // 文字色
  textPrimary: "rgba(255, 255, 255, 0.95)",
  textSecondary: "rgba(255, 255, 255, 0.75)",
  textDim: "rgba(255, 255, 255, 0.5)",
  textMuted: "rgba(255, 255, 255, 0.3)",
  
  // 卡片/元素
  cardBg: "rgba(30, 41, 59, 0.7)",
  cardBorder: "rgba(59, 130, 246, 0.2)",
  glow: "rgba(14, 165, 233, 0.3)",
};

// 动画配置
export const ANIMATION = {
  // 弹跳效果
  springConfig: {
    damping: 15,
    stiffness: 120,
    mass: 0.8,
  },
  
  // 缓动曲线
  easing: {
    smooth: [0.4, 0.0, 0.2, 1.0],
    bounce: [0.68, -0.55, 0.265, 1.55],
    elastic: [0.68, -0.55, 0.265, 1.55],
  },
  
  // 时间节奏 (秒)
  timings: {
    scene1: { start: 0, end: 4 },      // 开场
    scene2: { start: 4, end: 12 },     // 特质揭示
    scene3: { start: 12, end: 22 },    // 深度问题
    scene4: { start: 22, end: 27 },    // ENFJ整合
    scene5: { start: 27, end: 30 },    // 结尾
  },
};

// 文字内容 - 全部可编辑
export const COPY = {
  // 场景1: 开场
  scene1: {
    title: "好奇心从何而来？",
    subtitle: "Where does curiosity begin?",
  },
  
  // 场景2: 三种执着特质
  traits: [
    {
      title: "逃离不可扩展",
      description: "Escaping unscalable work",
      icon: "⚡",
      color: COLORS.primary,
    },
    {
      title: "观察整体格局", 
      description: "Seeing the bigger picture",
      icon: "🔭",
      color: COLORS.accent,
    },
    {
      title: "独立思考验证",
      description: "Thinking for oneself",
      icon: "🧠",
      color: "#10B981", // 绿色
    },
  ],
  
  // 场景3: 深度问题
  questions: [
    {
      text: "如果一切都能自动化，\n人类价值在哪里？",
      en: "If everything can be automated,\nwhere does human value lie?",
    },
    {
      text: "局部的优化何时会伤害整体？",
      en: "When does local optimization\nharm the whole system?",
    },
    {
      text: "接受二手思考 vs 自己求证，\n边界在哪？",
      en: "Accepting secondhand thoughts\nvs verifying yourself — where's the line?",
    },
  ],
  
  // 场景4: ENFJ特质
  enfj: {
    title: "ENFJ",
    subtitle: "系统思维 × 人文关怀",
    description: "既关注整体结构，也关注人的连接",
    nodes: [
      { label: "系统", x: 0.3, y: 0.5 },
      { label: "模式", x: 0.5, y: 0.3 },
      { label: "连接", x: 0.7, y: 0.5 },
      { label: "同理", x: 0.5, y: 0.7 },
      { label: "价值", x: 0.2, y: 0.2 },
      { label: "意义", x: 0.8, y: 0.2 },
    ],
  },
  
  // 场景5: 结尾
  outro: {
    title: "好奇心不是起点",
    subtitle: "而是持续的状态",
    quote: "Curiosity is not the beginning,\nit's the continuous state of exploration.",
    signature: "", // 用户可添加个人签名
  },
};

// 字体配置
export const FONTS = {
  title: {
    family: "Montserrat, sans-serif",
    weight: 700,
    size: 64,
  },
  subtitle: {
    family: "Montserrat, sans-serif", 
    weight: 500,
    size: 32,
  },
  body: {
    family: "Montserrat, sans-serif",
    weight: 400,
    size: 28,
  },
  quote: {
    family: "Montserrat, sans-serif",
    weight: 300,
    size: 36,
    italic: true,
  },
};

// 布局常量
export const LAYOUT = {
  padding: 80,
  cardWidth: 500,
  cardHeight: 200,
  cardSpacing: 40,
  questionWidth: 800,
};

// ================================================================