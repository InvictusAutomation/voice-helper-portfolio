import React from "react";
import { AbsoluteFill, Img, staticFile, useCurrentFrame, interpolate, Easing } from "remotion";
import { CONFIG, COLORS, TIMELINE, COPY, FONTS, ASSETS } from "./constants";

export const Scene1_Taiwan: React.FC = () => {
  const frame = useCurrentFrame();
  const localFrame = frame - TIMELINE.s1_start;
  const duration = TIMELINE.s1_end - TIMELINE.s1_start;

  // 背景视频淡入
  const bgOpacity = interpolate(localFrame, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 出镜视频缩放+位置
  const clipScale = interpolate(localFrame, [0, 40], [1.15, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const clipOpacity = interpolate(localFrame, [10, 35], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 文字淡入
  const textY = interpolate(localFrame, [20, 60], [50, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const textOpacity = interpolate(localFrame, [25, 55], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 结尾淡出
  const fadeOut = interpolate(localFrame, [duration - 20, duration], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#87CEEB" }}>
      {/* 台湾地球缩放背景 */}
      <AbsoluteFill style={{ opacity: bgOpacity * fadeOut }}>
        <Img
          src={staticFile(ASSETS.tw_video)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        {/* 半透明蓝色叠加，统一色调 */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(135, 206, 235, 0.3)",
            mixBlendMode: "overlay",
          }}
        />
      </AbsoluteFill>

      {/* 出镜视频 — 居中偏下 */}
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
            src={staticFile(ASSETS.clip_11)}
            style={{
              width: 1200,
              height: 675,
              objectFit: "cover",
              borderRadius: 16,
              boxShadow: "0 24px 80px rgba(0,0,0,0.4)",
              border: "2px solid rgba(255,255,255,0.3)",
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
              color: COLORS.taiwan.text,
              lineHeight: 1.5,
              margin: 0,
              padding: "0 100px",
              textShadow: "0 2px 12px rgba(255,255,255,0.6), 0 0 40px rgba(135,206,235,0.8)",
              letterSpacing: "-0.02em",
            }}
          >
            {COPY.s1}
          </p>
        </div>
      </AbsoluteFill>

      {/* 底部渐变遮罩 */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 300,
          background: "linear-gradient(to top, rgba(135,206,235,0.9), transparent)",
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};
