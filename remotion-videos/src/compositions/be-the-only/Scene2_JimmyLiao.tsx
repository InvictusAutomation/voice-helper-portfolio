import React from "react";
import { AbsoluteFill, Img, staticFile, useCurrentFrame, interpolate, Easing } from "remotion";
import { CONFIG, COLORS, TIMELINE, COPY, FONTS, ASSETS } from "./constants";

export const Scene2_JimmyLiao: React.FC = () => {
  const frame = useCurrentFrame();
  const localFrame = frame - TIMELINE.s2_start;
  const duration = TIMELINE.s2_end - TIMELINE.s2_start;

  // 深色背景渐入（从Scene 1的蓝天过渡）
  const bgProgress = interpolate(localFrame, [0, 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const bgColorR = Math.round(interpolate(bgProgress, [0, 1], [135, 26]));
  const bgColorG = Math.round(interpolate(bgProgress, [0, 1], [206, 26]));
  const bgColorB = Math.round(interpolate(bgProgress, [0, 1], [235, 46]));

  // 出镜视频
  const clipScale = interpolate(localFrame, [0, 30], [1.08, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const clipOpacity = interpolate(localFrame, [5, 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 月亮图标动画
  const moonX = interpolate(localFrame, [0, duration], [-200, CONFIG.WIDTH + 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const moonY = 150 + Math.sin(localFrame * 0.03) * 30;
  const moonOpacity = interpolate(localFrame, [10, 35], [0, 0.4], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const moonScale = interpolate(localFrame, [10, 45], [0.5, 1.2], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back),
  });

  // 星星散布
  const starOpacity = interpolate(localFrame, [15, 40], [0, 0.7], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 文字
  const textOpacity = interpolate(localFrame, [15, 38], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const textY = interpolate(localFrame, [18, 48], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // 淡出
  const fadeOut = interpolate(localFrame, [duration - 15, duration], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: `rgb(${bgColorR},${bgColorG},${bgColorB})` }}>
      {/* 水彩纹理效果 - 用径向渐变模拟 */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `
            radial-gradient(circle at 70% 30%, rgba(221, 160, 221, ${0.08 * fadeOut}) 0%, transparent 50%),
            radial-gradient(circle at 30% 70%, rgba(192, 192, 192, ${0.05 * fadeOut}) 0%, transparent 40%)
          `,
        }}
      />

      {/* 月亮图标 */}
      <div
        style={{
          position: "absolute",
          left: moonX,
          top: moonY,
          transform: `scale(${moonScale})`,
          opacity: moonOpacity * fadeOut,
        }}
      >
        <Img
          src={staticFile(ASSETS.icon_moon)}
          style={{ width: 100, height: 100, filter: "drop-shadow(0 0 20px rgba(255,215,0,0.6))" }}
        />
      </div>

      {/* 星星装饰 */}
      {[{ x: 250, y: 180 }, { x: 500, y: 100 }, { x: 800, y: 220 }, { x: 1100, y: 130 }, { x: 1450, y: 190 }, { x: 1650, y: 120 }].map((pos, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: pos.x,
            top: pos.y + Math.sin(localFrame * 0.04 + i) * 8,
            opacity: starOpacity * fadeOut,
            transform: `scale(${0.5 + (i % 3) * 0.3})`,
          }}
        >
          <Img
            src={staticFile(ASSETS.icon_star)}
            style={{ width: 28, height: 28, filter: "drop-shadow(0 0 8px rgba(255,215,0,0.8))" }}
          />
        </div>
      ))}

      {/* 出镜视频 */}
      <AbsoluteFill>
        <div
          style={{
            position: "absolute",
            bottom: -80,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            opacity: clipOpacity * fadeOut,
            transform: `scale(${clipScale})`,
          }}
        >
          <Img
            src={staticFile(ASSETS.clip_12)}
            style={{
              width: 1100,
              height: 618,
              objectFit: "cover",
              borderRadius: 16,
              boxShadow: "0 24px 80px rgba(0,0,0,0.5)",
              border: "2px solid rgba(221,160,221,0.3)",
            }}
          />
        </div>
      </AbsoluteFill>

      {/* 字幕 */}
      <AbsoluteFill>
        <div
          style={{
            position: "absolute",
            top: 140,
            left: 0,
            right: 0,
            textAlign: "center",
            transform: `translateY(${textY}px)`,
            opacity: textOpacity * fadeOut,
          }}
        >
          <p
            style={{
              fontFamily: FONTS.subtitle.family,
              fontSize: FONTS.subtitle.size,
              fontWeight: FONTS.subtitle.weight as number,
              color: COLORS.jimmy.text,
              lineHeight: 1.5,
              margin: 0,
              padding: "0 100px",
              textShadow: "0 2px 16px rgba(221,160,221,0.5)",
              letterSpacing: "-0.02em",
            }}
          >
            {COPY.s2}
          </p>
        </div>
      </AbsoluteFill>

      {/* 底部渐变 */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 280,
          background: "linear-gradient(to top, rgb(26,26,46) 0%, transparent 100%)",
          pointerEvents: "none",
          opacity: fadeOut,
        }}
      />
    </AbsoluteFill>
  );
};
