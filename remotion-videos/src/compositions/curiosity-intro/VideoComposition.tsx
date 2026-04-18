import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
  Series,
} from "remotion";
import { CONFIG, COLORS, ANIMATION, COPY, FONTS, LAYOUT } from "./constants";

// ============ 辅助组件 ============

// 发光问号组件
const GlowingQuestionMark: React.FC<{ frame: number }> = ({ frame }) => {
  const rotation = interpolate(frame, [0, CONFIG.DURATION_FRAMES], [0, 360 * 2], {
    extrapolateRight: "clamp",
  });
  
  const scale = spring({
    fps: CONFIG.FPS,
    frame,
    config: { damping: 20, stiffness: 100 },
    durationInFrames: 30,
  });
  
  const glow = interpolate(
    frame,
    [0, 15, 30, 45, 60],
    [0, 1, 0.3, 1, 0.5],
    { extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <div
        style={{
          fontSize: 200,
          color: COLORS.primary,
          transform: `rotate(${rotation}deg) scale(${scale})`,
          textShadow: `
            0 0 ${20 + glow * 40}px ${COLORS.glow},
            0 0 ${40 + glow * 80}px ${COLORS.primary}40
          `,
          opacity: 0.9,
          fontFamily: FONTS.title.family,
          fontWeight: FONTS.title.weight,
        }}
      >
        ?
      </div>
    </AbsoluteFill>
  );
};

// 特质卡片组件
const TraitCard: React.FC<{
  trait: typeof COPY.traits[0];
  index: number;
  frame: number;
  startFrame: number;
}> = ({ trait, index, frame, startFrame }) => {
  const cardFrame = frame - startFrame;
  
  const enterSpring = spring({
    fps: CONFIG.FPS,
    frame: cardFrame,
    config: ANIMATION.springConfig,
    durationInFrames: 20,
  });
  
  const bounceSpring = spring({
    fps: CONFIG.FPS,
    frame: cardFrame - 10,
    config: { damping: 8, stiffness: 200 },
    durationInFrames: 15,
  });
  
  const translateY = interpolate(enterSpring, [0, 1], [100, 0]);
  const scale = 1 + bounceSpring * 0.1;
  const opacity = interpolate(enterSpring, [0, 0.5, 1], [0, 0.8, 1]);

  return (
    <div
      style={{
        width: LAYOUT.cardWidth,
        height: LAYOUT.cardHeight,
        backgroundColor: COLORS.cardBg,
        border: `1px solid ${COLORS.cardBorder}`,
        borderRadius: 20,
        padding: 40,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        transform: `translateY(${translateY}px) scale(${scale})`,
        opacity,
        boxShadow: `0 10px 40px rgba(0, 0, 0, 0.3)`,
        backdropFilter: "blur(10px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* 装饰光效 */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          background: `linear-gradient(90deg, transparent, ${trait.color}, transparent)`,
          opacity: 0.6,
        }}
      />
      
      <div style={{ fontSize: 48, marginBottom: 20, color: trait.color }}>
        {trait.icon}
      </div>
      
      <div
        style={{
          fontSize: FONTS.title.size,
          fontWeight: FONTS.title.weight,
          color: COLORS.textPrimary,
          textAlign: "center",
          marginBottom: 10,
          fontFamily: FONTS.title.family,
        }}
      >
        {trait.title}
      </div>
      
      <div
        style={{
          fontSize: FONTS.body.size,
          color: COLORS.textDim,
          textAlign: "center",
          fontFamily: FONTS.body.family,
        }}
      >
        {trait.description}
      </div>
    </div>
  );
};

// 问题显示组件
const QuestionDisplay: React.FC<{
  question: typeof COPY.questions[0];
  index: number;
  frame: number;
  startFrame: number;
}> = ({ question, index, frame, startFrame }) => {
  const questionFrame = frame - startFrame;
  const typingDuration = 45; // 每个问题打字动画时长
  
  // 打字机效果
  const textProgress = interpolate(
    questionFrame,
    [0, typingDuration],
    [0, 1],
    { extrapolateRight: "clamp" }
  );
  
  const opacity = interpolate(
    questionFrame,
    [0, 10, typingDuration - 10, typingDuration],
    [0, 1, 1, 0]
  );
  
  const chineseChars = question.text.split("");
  const englishChars = question.en.split("");
  const totalChars = Math.max(chineseChars.length, englishChars.length);
  const visibleChars = Math.floor(textProgress * totalChars);
  
  const visibleChinese = chineseChars.slice(0, Math.min(visibleChars, chineseChars.length)).join("");
  const visibleEnglish = englishChars.slice(0, Math.min(visibleChars, englishChars.length)).join("");
  
  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        opacity,
      }}
    >
      <div
        style={{
          width: LAYOUT.questionWidth,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: FONTS.title.size,
            fontWeight: FONTS.title.weight,
            color: COLORS.textPrimary,
            marginBottom: 30,
            lineHeight: 1.3,
            fontFamily: FONTS.title.family,
            minHeight: 120,
          }}
        >
          {visibleChinese}
          {visibleChars < chineseChars.length && (
            <span
              style={{
                display: "inline-block",
                width: 4,
                height: FONTS.title.size,
                backgroundColor: COLORS.primary,
                marginLeft: 4,
                animation: "blink 1s infinite",
              }}
            />
          )}
        </div>
        
        <div
          style={{
            fontSize: FONTS.subtitle.size,
            color: COLORS.textSecondary,
            fontFamily: FONTS.subtitle.family,
            opacity: 0.8,
            minHeight: 80,
          }}
        >
          {visibleEnglish}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ENFJ网络图组件
const ENFJNetwork: React.FC<{ frame: number }> = ({ frame }) => {
  const nodes = COPY.enfj.nodes;
  const connections = [
    [0, 1], [1, 2], [2, 3], [3, 0], // 外环
    [0, 4], [1, 4], [2, 5], [3, 5], // 对角线
  ];
  
  const networkProgress = interpolate(
    frame,
    [0, 30],
    [0, 1],
    { extrapolateRight: "clamp" }
  );
  
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <div style={{ position: "relative", width: 800, height: 600 }}>
        {/* 连接线 */}
        {connections.map(([from, to], idx) => {
          const lineProgress = interpolate(
            frame,
            [idx * 3, idx * 3 + 10],
            [0, 1],
            { extrapolateRight: "clamp" }
          );
          
          const fromNode = nodes[from];
          const toNode = nodes[to];
          
          return (
            <svg
              key={`line-${idx}`}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                overflow: "visible",
              }}
            >
              <line
                x1={fromNode.x * 800}
                y1={fromNode.y * 600}
                x2={fromNode.x * 800 + (toNode.x - fromNode.x) * 800 * lineProgress}
                y2={fromNode.y * 600 + (toNode.y - fromNode.y) * 600 * lineProgress}
                stroke={COLORS.primary}
                strokeWidth={2}
                strokeOpacity={0.6}
                strokeDasharray="5,5"
              />
            </svg>
          );
        })}
        
        {/* 节点 */}
        {nodes.map((node, idx) => {
          const nodeProgress = interpolate(
            frame,
            [idx * 4, idx * 4 + 15],
            [0, 1],
            { extrapolateRight: "clamp" }
          );
          
          const scale = nodeProgress;
          const opacity = nodeProgress;
          
          return (
            <div
              key={idx}
              style={{
                position: "absolute",
                left: node.x * 800 - 50,
                top: node.y * 600 - 50,
                width: 100,
                height: 100,
                borderRadius: "50%",
                backgroundColor: COLORS.cardBg,
                border: `2px solid ${COLORS.primary}`,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                transform: `scale(${scale})`,
                opacity,
                boxShadow: `0 0 30px ${COLORS.glow}`,
              }}
            >
              <div
                style={{
                  color: COLORS.textPrimary,
                  fontSize: 20,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                {node.label}
              </div>
            </div>
          );
        })}
        
        {/* ENFJ文字 */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            opacity: interpolate(frame, [20, 40], [0, 1]),
          }}
        >
          <div
            style={{
              fontSize: 80,
              fontWeight: "bold",
              color: COLORS.primary,
              marginBottom: 10,
              fontFamily: FONTS.title.family,
            }}
          >
            {COPY.enfj.title}
          </div>
          <div
            style={{
              fontSize: FONTS.subtitle.size,
              color: COLORS.textSecondary,
              fontFamily: FONTS.subtitle.family,
            }}
          >
            {COPY.enfj.subtitle}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============ 主视频组件 ============

export const CuriosityIntroComposition: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  // 转换为秒，便于调试
  const currentSecond = frame / fps;
  
  // 背景渐变
  const backgroundGradient = `linear-gradient(135deg, ${COLORS.bgDeep} 0%, ${COLORS.bgMid} 50%, ${COLORS.bgLight} 100%)`;
  
  // 全局样式
  const styles = `
    @keyframes blink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.3; }
    }
    
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
    }
    
    * {
      box-sizing: border-box;
    }
  `;
  
  return (
    <AbsoluteFill
      style={{
        background: backgroundGradient,
        fontFamily: FONTS.title.family,
        overflow: "hidden",
      }}
    >
      <style>{styles}</style>
      
      {/* 粒子背景效果 */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}>
        {Array.from({ length: 50 }).map((_, i) => {
          const x = (i * 37) % 100;
          const y = (i * 23) % 100;
          const size = 1 + (i % 3);
          const opacity = 0.05 + (i % 5) * 0.02;
          const delay = i * 0.1;
          
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: `${x}%`,
                top: `${y}%`,
                width: size,
                height: size,
                borderRadius: "50%",
                backgroundColor: COLORS.primary,
                opacity,
                animation: `float ${3 + (i % 5)}s ease-in-out ${delay}s infinite`,
              }}
            />
          );
        })}
      </div>
      
      <Series>
        {/* 场景1: 开场 (4秒) */}
        <Series.Sequence durationInFrames={ANIMATION.timings.scene1.end * fps}>
          <GlowingQuestionMark frame={frame} />
          <AbsoluteFill
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 200,
            }}
          >
            <div
              style={{
                fontSize: FONTS.title.size,
                fontWeight: FONTS.title.weight,
                color: COLORS.textPrimary,
                textAlign: "center",
                opacity: interpolate(frame, [10, 30], [0, 1]),
                transform: `translateY(${interpolate(frame, [10, 30], [20, 0])}px)`,
              }}
            >
              {COPY.scene1.title}
            </div>
            <div
              style={{
                fontSize: FONTS.subtitle.size,
                color: COLORS.textDim,
                textAlign: "center",
                marginTop: 20,
                opacity: interpolate(frame, [20, 40], [0, 1]),
                transform: `translateY(${interpolate(frame, [20, 40], [10, 0])}px)`,
              }}
            >
              {COPY.scene1.subtitle}
            </div>
          </AbsoluteFill>
        </Series.Sequence>
        
        {/* 场景2: 特质揭示 (8秒) */}
        <Series.Sequence durationInFrames={(ANIMATION.timings.scene2.end - ANIMATION.timings.scene2.start) * fps}>
          <AbsoluteFill
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: LAYOUT.cardSpacing,
              padding: LAYOUT.padding,
            }}
          >
            {COPY.traits.map((trait, index) => (
              <TraitCard
                key={index}
                trait={trait}
                index={index}
                frame={frame}
                startFrame={ANIMATION.timings.scene2.start * fps + index * 15}
              />
            ))}
          </AbsoluteFill>
        </Series.Sequence>
        
        {/* 场景3: 深度问题 (10秒) */}
        <Series.Sequence durationInFrames={(ANIMATION.timings.scene3.end - ANIMATION.timings.scene3.start) * fps}>
          {COPY.questions.map((question, index) => (
            <Series.Sequence
              key={index}
              durationInFrames={Math.floor((ANIMATION.timings.scene3.end - ANIMATION.timings.scene3.start) * fps / COPY.questions.length)}
              offset={index * Math.floor((ANIMATION.timings.scene3.end - ANIMATION.timings.scene3.start) * fps / COPY.questions.length)}
            >
              <QuestionDisplay
                question={question}
                index={index}
                frame={frame}
                startFrame={ANIMATION.timings.scene3.start * fps + index * Math.floor((ANIMATION.timings.scene3.end - ANIMATION.timings.scene3.start) * fps / COPY.questions.length)}
              />
            </Series.Sequence>
          ))}
        </Series.Sequence>
        
        {/* 场景4: ENFJ特质整合 (5秒) */}
        <Series.Sequence durationInFrames={(ANIMATION.timings.scene4.end - ANIMATION.timings.scene4.start) * fps}>
          <ENFJNetwork frame={frame - ANIMATION.timings.scene4.start * fps} />
        </Series.Sequence>
        
        {/* 场景5: 结尾 (3秒) */}
        <Series.Sequence durationInFrames={(ANIMATION.timings.scene5.end - ANIMATION.timings.scene5.start) * fps}>
          <AbsoluteFill
            style={{
              justifyContent: "center",
              alignItems: "center",
              opacity: interpolate(
                frame - ANIMATION.timings.scene5.start * fps,
                [0, 15, 60, 90],
                [0, 1, 1, 0]
              ),
            }}
          >
            <div
              style={{
                fontSize: FONTS.title.size,
                fontWeight: FONTS.title.weight,
                color: COLORS.textPrimary,
                textAlign: "center",
                marginBottom: 30,
                fontFamily: FONTS.title.family,
              }}
            >
              {COPY.outro.title}
            </div>
            
            <div
              style={{
                fontSize: FONTS.subtitle.size,
                color: COLORS.textSecondary,
                textAlign: "center",
                marginBottom: 50,
                fontFamily: FONTS.subtitle.family,
              }}
            >
              {COPY.outro.subtitle}
            </div>
            
            <div
              style={{
                fontSize: FONTS.quote.size,
                color: COLORS.textDim,
                fontStyle: FONTS.quote.italic ? "italic" : "normal",
                textAlign: "center",
                maxWidth: 800,
                lineHeight: 1.5,
                fontFamily: FONTS.quote.family,
                fontWeight: FONTS.quote.weight,
              }}
            >
              {COPY.outro.quote}
            </div>
            
            {/* 签名区域 - 用户可添加个人照片/签名 */}
            <div
              style={{
                marginTop: 60,
                padding: 30,
                borderTop: `1px solid ${COLORS.textMuted}`,
                width: "60%",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontSize: 24,
                  color: COLORS.textDim,
                  fontFamily: FONTS.body.family,
                }}
              >
                {COPY.outro.signature || "Your Signature / Photo Here"}
              </div>
            </div>
          </AbsoluteFill>
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};