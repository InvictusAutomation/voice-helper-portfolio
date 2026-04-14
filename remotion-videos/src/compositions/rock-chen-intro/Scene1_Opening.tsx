import React from "react";
import { AbsoluteFill, useCurrentFrame, spring, interpolate } from "remotion";
import { loadFont } from "@remotion/google-fonts/Montserrat";
import { CONFIG, COLORS, COPY } from "./constants";

// ─── Animation Utilities ─────────────────────
const fadeIn = (frame: number, start: number = 0, duration: number = 30) =>
  interpolate(frame, [start, start + duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

const fadeSlideUp = (frame: number, start: number = 0) => ({
  opacity: fadeIn(frame, start, 25),
  transform: `translateY(${interpolate(frame, [start, start + 35], [40, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  })}px)`,
});

export const Scene1_Opening: React.FC = () => {
  const frame = useCurrentFrame();
  const { fontFamily } = loadFont();

  // Title spring animation — bold entrance
  const titleScale = spring({
    frame,
    fps: CONFIG.FPS,
    config: { damping: 14, stiffness: 120 },
  });

  // Subtle pulse after initial spring settles
  const titleOpacity = interpolate(
    frame,
    [0, 20],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Accent line grow from center
  const lineScaleX = spring({
    frame: frame - 15,
    fps: CONFIG.FPS,
    config: { damping: 18, stiffness: 100 },
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bgDeep,
        justifyContent: "center",
        alignItems: "center",
        fontFamily,
      }}
    >
      {/* Ambient glow */}
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.accentTeal}15 0%, transparent 70%)`,
          filter: "blur(60px)",
        }}
      />

      {/* Top label */}
      <div style={{ ...fadeSlideUp(frame, 5), marginBottom: 24 }}>
        <span
          style={{
            fontSize: 16,
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            color: COLORS.teal,
            fontWeight: 500,
          }}
        >
          {COPY.opening.label}
        </span>
      </div>

      {/* Main Title */}
      <h1
        style={{
          fontSize: 96,
          fontWeight: 700,
          color: COLORS.textPrimary,
          lineHeight: 1.1,
          textAlign: "center" as const,
          opacity: titleOpacity,
          transform: `scale(${titleScale})`,
          margin: 0,
          letterSpacing: "-0.02em",
        }}
      >
        {COPY.opening.title}
      </h1>

      {/* Accent line under title */}
      <div
        style={{
          width: Math.max(0, 120 * lineScaleX),
          height: 3,
          background: `linear-gradient(90deg, ${COLORS.teal}, ${COLORS.amber})`,
          borderRadius: 2,
          marginTop: 28,
          opacity: fadeIn(frame, 20, 20),
        }}
      />

      {/* Subtitle */}
      <p
        style={{
          ...fadeSlideUp(frame, 35),
          fontSize: 26,
          color: COLORS.textDim,
          marginTop: 32,
          maxWidth: 600,
          textAlign: "center" as const,
          lineHeight: 1.6,
        }}
      >
        {COPY.opening.subtitle}
      </p>

      {/* Bottom decorative dots */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          display: "flex",
          gap: 10,
          opacity: fadeIn(frame, 60, 30),
        }}
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: i === 1 ? COLORS.amber : `${COLORS.textDim}40`,
            }}
          />
        ))}
      </div>
    </AbsoluteFill>
  );
};
