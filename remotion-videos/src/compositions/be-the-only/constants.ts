// ============ "Be The Only" — Rock Chen 个人简介视频 v2 ============
// 所有视觉参数集中在此

export const CONFIG = {
  WIDTH: 1920,
  HEIGHT: 1080,
  FPS: 30,
  // 总时长约63秒（根据实际旁白长度调整）
  DURATION_FRAMES: 1890, // 63秒 @ 30fps
};

// 色彩方案
export const COLORS = {
  // Scene 1-2: 台湾/几米 — 温暖海岛
  taiwan: {
    bg: "#87CEEB",
    accent: "#F4D03F",
    text: "rgba(44, 62, 80, 0.95)",
    textDim: "rgba(44, 62, 80, 0.6)",
  },

  // Scene 2: 几米水彩 — 梦幻紫
  jimmy: {
    bg: "#1A1A2E",
    accent: "#DDA0DD",
    moon: "#C0C0C0",
    star: "#FFD700",
    text: "rgba(255, 255, 255, 0.95)",
    textDim: "rgba(255, 255, 255, 0.5)",
  },

  // Scene 3a: 飞哥与小佛 — 夏日明亮
  summer: {
    bg: "#4FC3F7",
    grass: "#66BB6A",
    orange: "#FFA726",
    text: "rgba(33, 33, 33, 0.95)",
    textDim: "rgba(33, 33, 33, 0.6)",
  },

  // Scene 3b: 深度思考 — 科技青转深蓝
  thinking: {
    bgStart: "#0D9488",
    bgEnd: "#0A1628",
    primary: "#14B8A6",
    glow: "rgba(20, 184, 166, 0.3)",
    text: "rgba(255, 255, 255, 0.95)",
    textDim: "rgba(255, 255, 255, 0.5)",
  },

  // Scene 4: 新加坡 — 国际化暖
  singapore: {
    bg: "#FFF8E7",
    accent: "#FF8F65",
    knowledge: "#66BB6A",
    text: "rgba(44, 62, 80, 0.95)",
    textDim: "rgba(44, 62, 80, 0.6)",
  },

  // Scene 5: Be The Only — 极简黑
  mission: {
    bg: "#0A1628",
    primary: "#14B8A6",
    quote: "#FFFFFF",
    subtext: "rgba(255, 255, 255, 0.75)",
    glow: "rgba(20, 184, 166, 0.4)",
  },

  // Scene 6: Notebook — 纸张质感
  notebook: {
    bg: "#F5F0E8",
    frame: "#D4C8B0",
    shadow: "rgba(0, 0, 0, 0.15)",
    text: "rgba(44, 62, 80, 0.9)",
    signature: "#0D9488",
  },
};

// 动画配置
export const ANIMATION = {
  springConfig: { damping: 12, stiffness: 100, mass: 1 },
  smoothEase: [0.25, 0.46, 0.45, 0.94],
  fadeIn: [0.4, 0, 0.2, 1],
};

// 场景时间轴（帧，@30fps）
export const TIMELINE = {
  // Scene 1: Born in Taiwan (4.4s ≈ 132帧)
  s1_start: 0,
  s1_end: 132,

  // Scene 2: Jimmy Liao (3.2s ≈ 96帧)
  s2_start: 132,
  s2_end: 228,

  // Scene 3a: Phineas & Ferb (~5s ≈ 150帧)
  s3a_start: 228,
  s3a_end: 378,

  // Scene 3b: Deep Thinking (~8s ≈ 240帧)
  s3b_start: 378,
  s3b_end: 618,

  // Scene 4: Singapore Seminar (~8s ≈ 240帧)
  s4_start: 618,
  s4_end: 858,

  // Scene 5: Be The Only (~10s ≈ 300帧)
  s5_start: 858,
  s5_end: 1158,

  // Scene 6: Researcher's Notebook (~5s ≈ 150帧)
  s6_start: 1158,
  s6_end: 1308,

  // 结尾留白 (~10s)
  outro_start: 1308,
  outro_end: 1608,
};

// 文字内容（英文）
export const COPY = {
  s1: "I was born in Taiwan, a breezy island.",
  s2: "I grew up mesmerized by Jimmy Liao's paintings.",
  s3a: "Phineas and Ferb told me that the best summer vacation is the one where we build things.",
  s3b: "Then, I always get obsessed with the feeling of diving deep into thinking and the underlying logic of the world with great minds.",
  s4a: "During my PG in Singapore, I once randomly stopped people on the corridor to come join the seminar.",
  s4b: "I organized and shared my opinions on AI with people from different countries.",
  s5_quote: '"Don\'t be the best. Be the only."',
  s5_attr: "— Kevin Kelly",
  s5_mission: "I think that\'s why I set my goal to explore the way of human thinking under the context of shift of human-AI interaction.",
  signature: "Rock Chen",
  attribution: "Clip from Phineas and Ferb © Disney, via GIPHY",
};

// 素材路径映射（相对于public目录）
export const ASSETS = {
  // 旁白视频 clips
  clip_11: "clips/1-1.mp4",       // 4.4s - Taiwan
  clip_12: "clips/1-2.mp4",       // 3.2s - Jimmy Liao
  clip_21: "clips/2-1.mp4",       // 16.4s - P&F + Deep Thinking
  clip_22: "clips/2-2.MP3",      // 24s 纯音频 - Singapore + Mission
  clip_3last: "clips/3last.mp4",   // 15.5s 结尾补充
  bookclub: "clips/bookclub.mp4",  // 38.8s 新加坡读书会现场

  // 视觉素材
  tw_video: "assets/tw.mp4",           // 地球→台湾缩放
  phineas_ferb_gif: "assets/phineas-ferb-giphy.gif",

  // 手写笔记照片
  notebook_1: "assets/IMG_4016.jpeg",
  notebook_2: "assets/IMG_4017.png",
  notebook_3: "assets/IMG_4018.png",

  // Lottie动画
  lottie_ai_brain: "assets/lottie/ai-brain.json",
  lottie_connection_nodes: "assets/lottie/connection-nodes.json",
  lottie_network_connections: "assets/lottie/network-connections.json",
  lottie_data_flow: "assets/lottie/data-flow.json",

  // SVG图标
  icon_moon: "assets/icons/moon.svg",
  icon_star: "assets/icons/star.svg",
  icon_book: "assets/icons/book.svg",
  icon_users: "assets/icons/users.svg",
  icon_brain: "assets/icons/brain-network.svg",
  icon_lightbulb: "assets/icons/lightbulb.svg",
};

// 字体
export const FONTS = {
  subtitle: { family: "'Montserrat', sans-serif", size: 48, weight: 600 },
  quote: { family: "'Montserrat', sans-serif", size: 56, weight: 700 },
  quoteSub: { family: "'Montserrat', sans-serif", size: 32, weight: 400 },
  body: { family: "'Montserrat', sans-serif", size: 36, weight: 400 },
  small: { family: "'Montserrat', sans-serif", size: 20, weight: 400 },
  signature: { family: "'Space Grotesk', sans-serif", size: 42, weight: 300 },
};
