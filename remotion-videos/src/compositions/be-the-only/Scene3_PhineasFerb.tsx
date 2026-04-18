import React from "react";
import { AbsoluteFill, Img, staticFile, useCurrentFrame, interpolate, Easing, spring } from "remotion";
import { CONFIG, COLORS, TIMELINE, COPY, FONTS, ASSETS } from "./constants";

export const Scene3_PhineasFerb: React.FC = () => {
  const frame = useCurrentFrame();
  const localFrame = frame - TIMELINE.s3a_start;
  const totalDuration = TIMELINE.s3b_end - TIMELINE.s3a_start;
  const thisDuration = TIMELINE.s3a_end - TIMELINE.s3a_start;

  // === 第一阶段：Phineas & Ferb (0 ~ thisDuration) ===

  // 背景：明亮夏日色 → 渐变到科技青
  const phaseProgress = Math.min(localFrame / thisDuration, 1);

  const bgHue = interpolate(phaseProgress, [0, 1], [195, 175]); // sky blue → teal
  const bgLightness = interpolate(phaseProgress, [0, 1], [88, 15]); // bright → dark

  // GIF 动画
  const gifOpacity = interpolate(localFrame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const gifScale = spring({
    frame: localFrame - 5,
    fps: CONFIG.FPS,
    config: { damping: 14, stiffness: 90 },
  });
  const gifFadeOut = interpolate(
    localFrame,
    [thisDuration - 20, thisDuration],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // 来源标注
  const attributionOpacity = interpolate(localFrame, [25, 45], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const attributionFadeOut = gifFadeOut;

  // Scene 3a 字幕
  const s3TextOpacity = interpolate(localFrame, [15, 38], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const s3TextFadeOut = gifFadeOut;

  // === 第二阶段：Deep Thinking (thisDuration ~ end) ===
  const thinkingLocalFrame = Math.max(0, localFrame - thisDuration);
  const thinkingDuration = totalDuration - thisDuration;

  // Lottie/科技元素进入
  const techElementsOpacity = interpolate(thinkingLocalFrame, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 神经网络脉冲
  const pulseScale = 1 + Math.sin(thinkingLocalFrame * 0.06) * 0.03;
  const brainRotate = thinkingLocalFrame * 0.3;

  // Scene 3b 字幕
  const s3bTextOpacity = interpolate(thinkingLocalFrame, [10, 35], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const s3bTextFadeOut = interpolate(
    thinkingLocalFrame,
    [thinkingDuration - 20, thinkingDuration],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill style={{ backgroundColor: `hsl(${bgHue}, 70%, ${bgLightness}%)` }}>
      {/* ===== Phase A: Phineas & Ferb ===== */}

      {/* GIF 动画 — 居中显示 */}
      <AbsoluteFill>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: `translate(-50%, -50%) scale(${gifScale})`,
            opacity: gifOpacity * gifFadeOut,
            display: localFrame > thisDuration ? "none" : "block",
          }}
        >
          <Img
            src={staticFile(ASSETS.phineas_ferb_gif)}
            style={{
              maxWidth: 700,
              maxHeight: 450,
              objectFit: "contain",
              filter: "drop-shadow(0 16px 40px rgba(0,0,0,0.3))",
              borderRadius: 12,
            }}
          />
        </div>
      </AbsoluteFill>

      {/* 来源标注 */}
      {localFrame <= thisDuration && (
        <div
          style={{
            position: "absolute",
            bottom: 40,
            right: 50,
            opacity: attributionOpacity * attributionFadeOut,
          }}
        >
          <p
            style={{
              fontFamily: FONTS.small.family,
              fontSize: FONTS.small.size - 2,
              fontWeight: FONTS.small.weight as number,
              color: "rgba(33,33,33,0.5)",
              margin: 0,
              fontStyle: "italic",
            }}
          >
            {COPY.attribution}
          </p>
        </div>
      )}

      {/* Scene 3a 字幕 */}
      {localFrame <= thisDuration && (
        <div
          style={{
            position: "absolute",
            bottom: 120,
            left: 0,
            right: 0,
            textAlign: "center",
            opacity: s3TextOpacity * s3TextFadeOut,
          }}
        >
          <p
            style={{
              fontFamily: FONTS.body.family,
              fontSize: FONTS.body.size,
              fontWeight: FONTS.body.weight as number,
              color: COLORS.summer.text,
              lineHeight: 1.5,
              margin: 0,
              padding: "0 120px",
              textShadow: "0 2px 12px rgba(255,255,255,0.6)",
            }}
          >
            {COPY.s3a}
          </p>
        </div>
      )}

      {/* ===== Phase B: Deep Thinking ===== */}

      {localFrame > thisDuration && (
        <>
          {/* 科技背景网格 */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `
                linear-gradient(rgba(20,184,166,0.04) 1px, transparent 1px),
                linear-gradient(90deg, rgba(20,184,166,0.04) 1px, transparent 1px)
              `,
              backgroundSize: "60px 60px",
              opacity: techElementsOpacity,
            }}
          />

          {/* Lottie: AI Brain — 中央 */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: `translate(-50%, -50%) scale(${pulseScale}) rotate(${brainRotate}deg)`,
              opacity: techElementsOpacity * 0.5,
            }}
          >
            <Img
              src={staticFile(ASSETS.lottie_ai_brain)}
              style={{ width: 400, height: 400 }}
            />
          </div>

          {/* 连接节点 — 散布 */}
          {[{ x: 250, y: 220, delay: 0 }, { x: 1550, y: 260, delay: 10 }, { x: 350, y: 700, delay: 20 }, { x: 1550, y: 750, delay: 15 }].map((pos, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                left: pos.x,
                top: pos.y,
                opacity: interpolate(Math.max(0, thinkingLocalFrame - pos.delay), [0, 25], [0, 0.6], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                }),
                transform: `scale(${0.6 + Math.sin(thinkingLocalFrame * 0.04 + i) * 0.1})`,
              }}
            >
              <Img
                src={staticFile(ASSETS.lottie_connection_nodes)}
                style={{ width: 150, height: 150 }}
              />
            </div>
          ))}
        </>
      )}

      {/* Scene 3b 字幕 */}
      {localFrame > thisDuration && (
        <div
          style={{
            position: "absolute",
            bottom: 140,
            left: 0,
            right: 0,
            textAlign: "center",
            opacity: s3bTextOpacity * s3bTextFadeOut,
          }}
        >
          <p
            style={{
              fontFamily: FONTS.body.family,
              fontSize: FONTS.body.size - 2,
              fontWeight: FONTS.body.weight as number,
              color: COLORS.thinking.text,
              lineHeight: 1.6,
              margin: 0,
              padding: "0 140px",
              textShadow: "0 2px 16px rgba(0,0,0,0.6)",
            }}
          >
            {COPY.s3b}
          </p>
        </div>
      )}
    </AbsoluteFill>
  );
};
