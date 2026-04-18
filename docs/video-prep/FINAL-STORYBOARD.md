# 最终分镜脚本 - "Be The Only"

## 总时长：约30秒 | 1920×1080 | 30fps

---

## Scene 1: Born in Taiwan (4.4s)
**素材：** `clips/1-1.mp4` (你的出镜视频)  
**旁白：**
> "I was born in Taiwan, a breezy island."

**背景层叠加：** `assets/tw.mov` (台湾风景/氛围)

**设计思路：**
- 你的出镜视频作为主画面
- 背景叠加台湾风景素材，半透明混合
- 文字字幕同步显示
- 整体色调：温暖、海岛风、清新

---

## Scene 2: Jimmy Liu's Paintings (3.2s)
**素材：** `clips/1-2.mp4` (你的出镜视频)  
**旁白：**
> "I grew up mesmerized by Jimmy Liu's paintings."

**背景层叠加：**
- 几米风格水彩插画元素 (`assets/icons/moon.svg`, `star.svg`)
- 或使用手绘风格背景动画

**设计思路：**
- 几米绘本的诗意感：月亮、星星、漂浮的城市
- 水彩纹理缓慢流动
- 温柔梦幻的色调

---

## Scene 3: Phineas & Ferb + Deep Thinking (~8s)
**素材：** `assets/illustrations/phineas-ferb-giphy.gif` → 过渡到抽象思维视觉  
**旁白：**
> "Phineas and Ferb told me that the best summer vacation is the one where we build things."
> 
> "Then, I always get obsessed with the feeling of diving deep into thinking and the underlying logic of the world with great minds."

**视觉层次：**
1. **前半段 (0-4s)：** 飞哥与小佛GIF动画
   - 显示来源标注: *"Clip from Phineas and Ferb © Disney, via GIPHY"*
2. **后半段 (4-8s)：** 过渡到"深度思考"视觉
   - 神经网络Lottie动画 (`ai-brain.json`, `connection-nodes.json`)
   - 大脑图标 (`brain-network.svg`)
   - 灯泡图标 (`lightbulb.svg`)
   - 从明亮夏天 → 深邃科技感的色调转换

**设计思路：**
- 前半段：轻松、创造、童年回忆
- 后半段：转入深度、逻辑、思维的探索
- 用颜色渐变连接两段（暖色→冷青色）

---

## Scene 4: Singapore Seminar (~8s)
**素材：** Lottie动画 + 图标组合  
**旁白：**
> "During my PG in Singapore, I once randomly stopped people on the corridor to come join the seminar."
> 
> "I organized and shared my opinions on AI with people from different countries."

**视觉元素：**
- 书本图标 (`book.svg`) - 代表知识分享
- 人群图标 (`users.svg`) - 代表多元文化听众
- 走廊透视线条（代码生成）
- 世界地图轮廓或国旗点缀（暗示多国）
- 色调：国际化、温暖、充满活力

**设计思路：**
- 体现"冲动"、"热情"、"跨文化交流"
- 走廊场景的简约表达
- 多元文化的视觉符号

---

## Scene 5: Be The Only (~10s)
**素材：** 纯文字动画 + 手写笔记照片  
**旁白：**
> "Kevin Kelly once said, 'Don't be the best, be the only.'"
>
> "I think that's why I set my goal to explore the way of human thinking under the context of shift of human-AI interaction."

**视觉效果：**
- 深蓝黑背景 (`#0A1628`)
- 名言逐字发光出现："Don't be the best. Be the only."
- 停顿1秒
- 第二段话淡入，较小字号

---

## Scene 6: Researcher's Notebook (结尾过渡, ~5s)
**素材：** 手写笔记照片（名字水印浮现前）  
**图片（依次淡入/切换）：**
1. `assets/IMG_4016.jpeg` — AI Agent / Multi-Agent 思维笔记
2. `assets/IMG_4017.png` — AI时代统一思考 / Vibe Coding 笔记
3. `assets/IMG_4018.png` — AI在中国 / 人机交互深度思考

**设计思路：**
- 展示"我在研究，也在探索AI"的真实状态
- 手写笔记 = 最真实的探索者形象
- 可以做成缓慢推近或轻微平移的效果
- 最后一张图上，你的署名 "Rock Chen" 逐渐浮现
- 整体色调保持温暖、真实、有质感

**可选效果：**
- 照片以胶片相框样式呈现
- 轻微的纸张纹理叠加
- 笔记上的关键词可以微弱发光强调

---

## 时间线总览

| 场景 | 时长 | 旁白关键词 | 主素材 |
|------|------|-----------|--------|
| Scene 1 | 4.4s | Born in Taiwan | `1-1.mp4` + `tw.mov` |
| Scene 2 | 3.2s | Jimmy Liu | `1-2.mp4` + 水彩插画 |
| Scene 3 | ~8s | Phineas & Ferb / Deep Thinking | GIF + Lottie动画 |
| Scene 4 | ~8s | Singapore / Seminar | 图标+动画 |
| Scene 5 | ~6s | Be The Only | 纯文字动画 |

---

## 色彩方案

| 场景 | 主色调 | 辅助色 |
|------|--------|--------|
| Scene 1 | 海岛蓝 #87CEEB | 沙滩金 #F4D03F |
| Scene 2 | 水彩紫 #DDA0DD | 月光银 #C0C0C0 |
| Scene 3 前 | 夏日橙 #FFA726 | 天空蓝 #42A5F5 |
| Scene 3 后 | 科技青 #0D9488 | 深海蓝 #0A1628 |
| Scene 4 | 国际化暖 #FF8F65 | 知识绿 #66BB6A |
| Scene 5 | 极简黑 #0A1628 | 点缀青 #14B8A6 |

---

## 字体方案

| 内容 | 字体 | 大小 |
|------|------|------|
| 旁白字幕 | Montserrat (Google Fonts) | 48px |
| 名言强调 | Montserrat Bold | 64px |
| 署名 | Space Grotesk Light | 36px |
| 来源标注 | Montserrat Regular | 18px |

---

## 素材映射清单

### ✅ 已有素材
- [x] `clips/1-1.mp4` — 出镜视频 (Taiwan)
- [x] `clips/1-2.mp4` — 出镜视频 (Jimmy Liu)
- [x] `assets/tw.mov` — 台湾风景素材
- [x] `assets/illustrations/phineas-ferb-giphy.gif` — 飞哥与小佛
- [x] `assets/lottie/*.json` — 4个Lottie动画
- [x] `assets/icons/*.svg` — 8个SVG图标
- [x] `assets/illustrations/*.svg` — 手绘插画备选

### ⏳ 待确认
- [ ] `clips/2-1` 对应的文件名？（Scene 3 的旁白）
- [ ] `clips/2-2` 对应的文件名？（Scene 4 的旁白）
- [ ] 是否需要额外录制 Scene 3 和 Scene 4 的出镜？
