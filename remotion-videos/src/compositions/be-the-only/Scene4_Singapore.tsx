import React from "react";
import { AbsoluteFill, Img, staticFile, useCurrentFrame, interpolate, Easing } from "remotion";
import { CONFIG, COLORS, TIMELINE, COPY, FONTS, ASSETS } from "./constants";

export const Scene4_Singapore: React.FC = () => {
  const frame = useCurrentFrame();
  const localFrame = frame - TIMELINE.s4_start;
  const duration = TIMELINE.s4_end - TIMELINE.s4_start;

  // 背景: 暖色调
  const bgOpacity = interpolate(localFrame, [0, 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 读书会视频 — 背景模糊/半透明
  const videoOpacity = interpolate(localFrame, [0, 30], [0, 0.35], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const videoScale = interpolate(localFrame, [0, duration], [1.2, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 图标动画 — 书本 + 人群
  const iconFloatY = Math.sin(localFrame * 0.03) * 12;
  const iconsOpacity = interpolate(localFrame, [15, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 书本图标 — 左侧
  const bookScale = spring({ frame: localFrame - 10, fps: CONFIG.FPS, config: { damping: 12, stiffness: 80 } });
  const bookX = interpolate(localFrame, [20, 60], [-150, 280], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic),
  });

  // 人群图标 — 右侧
  const usersScale = spring({ frame: localFrame - 18, fps: CONFIG.FPS, config: { damping: 12, stiffness: 80 } });
  const usersX = interpolate(localFrame, [28, 68], [CONFIG.WIDTH + 150, CONFIG.WIDTH - 340], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic),
  });

  // 字幕 s4a
  const textAOpacity = interpolate(localFrame, [20, 45], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const textAY = interpolate(localFrame, [22, 52], [30, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic),
  });

  // 中间过渡：s4a 淡出 → s4b 淡入（约在localFrame 120处切换）
  const transitionPoint = 120;
  const textAFadeOut = interpolate(localFrame, [transitionPoint - 20, transitionPoint], [1, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const textBOpacity = interpolate(localFrame, [transitionPoint, transitionPoint + 25], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const textBY = interpolate(localFrame, [transitionPoint + 3, transitionPoint + 33], [30, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic),
  });

  // 整体淡出
  const fadeOut = interpolate(localFrame, [duration - 20, duration], [1, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.singapore.bg }}>
      {/* 读书会视频背景 */}
      <AbsoluteFill style={{ opacity: videoOpacity * fadeOut }}>
        <Img
          src={staticFile(ASSETS.bookclub)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: `scale(${videoScale})`,
            filter: "blur(6px) brightness(1.1)",
          }}
        />
        <div style={{ position: "absolute", inset: 0, background: "rgba(255,248,231,0.7)", mixBlendMode: "overlay" }} />
      </AbsoluteFill>

      {/* 装饰性图标 */}
      <div style={{ opacity: iconsOpacity * fadeOut }}>
        {/* 书本 — 左上区域 */}
        <div
          style={{
            position: "absolute",
            left: bookX,
            top: 180 + iconFloatY,
            transform: `scale(${bookScale})`,
          }}
        >
          <Img src={staticFile(ASSETS.icon_book)} style={{ width: 90, height: 90, filter: "drop-shadow(0 8px 24px rgba(102,187,106,0.3))" }} />
        </div>

        {/* 人群 — 右上区域 */}
        <div
          style={{
            position: "absolute",
            left: usersX,
            top: 200 - iconFloatY,
            transform: `scale(${usersScale})`,
          }}
        >
          <Img src={staticFile(ASSETS.icon_users)} style={{ width: 100, height: 100, filter: "drop-shadow(0 8px 24px rgba(255,143,101,0.3))" }} />
        </div>
      </div>

      {/* 走廊线条装饰（代码生成） */}
      <svg style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.06 * fadeOut }} viewBox="0 0 1920 1080">
        <line x1="960" y1="0" x2="960" y2="1080" stroke="#333" strokeWidth="2" strokeDasharray="12 8" />
        {[200, 400, 600, 800].map((y) => (
          <g key={y}>
            <line x1="0" y1={y} x2="1920" y2={y} stroke="#ddd" strokeWidth="1" opacity="0.3" />
            <rect x="80" y={y - 20} width="120" height="40" rx="4" fill="#f0e6d3" opacity="0.5" />
          </g>
        ))}
      </svg>

      {/* 字幕 s4a */}
      <AbsoluteFill>
        <div
          style={{
            position: "absolute",
            top: 480,
            left: 0,
            right: 0,
            textAlign: "center",
            transform: `translateY(${textAY}px)`,
            opacity: textAOpacity * textAFadeOut * fadeOut,
          }}
        >
          <p
            style={{
              fontFamily: FONTS.body.family,
              fontSize: FONTS.body.size,
              fontWeight: FONTS.body.weight as number,
              color: COLORS.singapore.text,
              lineHeight: 1.6,
              margin: 0,
              padding: "0 140px",
              textShadow: "0 2px 12px rgba(255,248,231,0.8)",
            }}
          >
            {COPY.s4a}
          </p>
        </div>
      </AbsoluteFill>

      {/* 字幕 s4b */}
      <AbsoluteFill>
        <div
          style={{
            position: "absolute",
            top: 520,
            left: 0,
            right: 0,
            textAlign: "center",
            transform: `translateY(${textBY}px)`,
            opacity: textBOpacity * fadeOut,
          }}
        >
          <p
            style={{
              fontFamily: FONTS.body.family,
              fontSize: FONTS.body.size,
              fontWeight: FONTS.body.weight as number,
              color: COLORS.singapore.text,
              lineHeight: 1.6,
              margin: 0,
              padding: "0 140px",
              textShadow: "0 2px 12px rgba(255,248,231,0.8)",
            }}
          >
            {COPY.s4b}
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
          height: 250,
          background: "linear-gradient(to top, rgba(255,248,231,1), transparent)",
          opacity: fadeOut,
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};
