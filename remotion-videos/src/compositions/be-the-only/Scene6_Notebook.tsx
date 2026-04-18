import React from "react";
import { AbsoluteFill, Img, staticFile, useCurrentFrame, interpolate, Easing, spring } from "remotion";
import { CONFIG, COLORS, TIMELINE, COPY, FONTS, ASSETS } from "./constants";

export const Scene6_Notebook: React.FC = () => {
  const frame = useCurrentFrame();
  const localFrame = frame - TIMELINE.s6_start;
  const duration = TIMELINE.s6_end - TIMELINE.s6_start;

  // 三张照片，每张约1.7秒
  const photoDuration = duration / 3;
  const currentPhotoIndex = Math.min(Math.floor(localFrame / photoDuration), 2);
  const photoLocalProgress = (localFrame % photoDuration) / photoDuration;

  // 当前照片的透明度
  const currentPhotoOpacity = interpolate(photoLocalProgress, [0, 0.2, 0.75, 0.95], [0, 1, 1, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  // 照片容器动画
  const containerScale = spring({
    frame: currentPhotoIndex * photoDuration,
    fps: CONFIG.FPS,
    config: { damping: 16, stiffness: 70 },
  });

  // 相框样式
  const photos = [ASSETS.notebook_1, ASSETS.notebook_2, ASSETS.notebook_3];

  // 纸张纹理叠加
  const textureOpacity = 0.08;

  // Rock Chen 署名浮现
  const signatureStart = duration * 0.65; // 最后35%出现
  const signatureOpacity = interpolate(localFrame, [signatureStart, signatureStart + 30], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const signatureY = interpolate(localFrame, [signatureStart, signatureStart + 33], [20, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic),
  });

  // 署名下方副文字
  const subTextOpacity = interpolate(localFrame, [signatureStart + 20, signatureStart + 42], [0, 0.7], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  // 整体淡出（如果有outro的话）
  const fadeOut = 1; // 不淡出，留给outro处理

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.notebook.bg }}>
      {/* 微弱的纸张纹理 */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `
            radial-gradient(circle at 20% 20%, rgba(212,200,176,${textureOpacity}) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(212,200,176,${textureOpacity * 0.7}) 0%, transparent 50%)
          `,
          pointerEvents: "none",
        }}
      />

      {/* 照片相框容器 — 居中 */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: `translate(-50%, -50%) scale(${containerScale})`,
        }}
      >
        {/* 外框阴影 */}
        <div
          style={{
            padding: 16,
            background: "#FFF",
            borderRadius: 4,
            boxShadow: `
              0 4px 6px ${COLORS.notebook.shadow},
              0 20px 60px ${COLORS.notebook.shadow},
              0 0 0 1px ${COLORS.notebook.frame}
            `,
          }}
        >
          {/* 照片 */}
          <Img
            src={staticFile(photos[currentPhotoIndex])}
            style={{
              width: 960,
              height: 540,
              objectFit: "cover",
              display: "block",
              opacity: currentPhotoOpacity * fadeOut,
            }}
          />
        </div>
      </div>

      {/* 照片编号指示器（小圆点） */}
      <div
        style={{
          position: "absolute",
          bottom: 160,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 14,
        }}
      >
        {photos.map((_, i) => (
          <div
            key={i}
            style={{
              width: i === currentPhotoIndex ? 12 : 8,
              height: 8,
              borderRadius: 4,
              backgroundColor:
                i === currentPhotoIndex ? COLORS.notebook.signature : "rgba(44,62,80,0.2)",
              transition: "all 0.3s ease",
              opacity: fadeOut,
            }}
          />
        ))}
      </div>

      {/* Rock Chen 署名 */}
      <AbsoluteFill>
        <div
          style={{
            position: "absolute",
            bottom: 100,
            left: 0,
            right: 0,
            textAlign: "center",
            transform: `translateY(${signatureY}px)`,
            opacity: signatureOpacity * fadeOut,
          }}
        >
          <p
            style={{
              fontFamily: FONTS.signature.family,
              fontSize: FONTS.signature.size,
              fontWeight: FONTS.signature.weight as number,
              color: COLORS.notebook.signature,
              margin: 0,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            {COPY.signature}
          </p>
          <p
            style={{
              fontFamily: FONTS.small.family,
              fontSize: FONTS.small.size,
              fontWeight: FONTS.small.weight as number,
              color: "rgba(44,62,80,0.5)",
              margin: "8px 0 0 0",
              letterSpacing: "0.08em",
              opacity: subTextOpacity,
            }}
          >
            Explorer of Human Thinking in the AI Era
          </p>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
