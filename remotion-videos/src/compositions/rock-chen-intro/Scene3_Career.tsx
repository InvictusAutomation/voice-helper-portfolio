import React from "react";
import { AbsoluteFill, useCurrentFrame, spring, interpolate } from "remotion";
import { loadFont } from "@remotion/google-fonts/Montserrat";
import { CONFIG, COLORS, COPY } from "./constants";

export const Scene3_Career: React.FC = () => {
  const frame = useCurrentFrame();
  const { fontFamily } = loadFont();
  const experiences = COPY.career.experiences;

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${COLORS.bgDeep}, #0A1224)`,
        padding: "80px 120px",
        flexDirection: "column",
        overflow: "hidden",
        fontFamily,
      }}
    >
      {/* Header */}
      <div
        style={{
          opacity: interpolate(frame, [0, 20], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          marginBottom: 48,
        }}
      >
        <span
          style={{
            fontSize: 13,
            letterSpacing: "0.3em",
            textTransform: "uppercase" as const,
            color: COLORS.amber,
            fontWeight: 500,
          }}
        >
          {COPY.career.label}
        </span>
        <h2
          style={{
            fontSize: 48,
            fontWeight: 300,
            color: COLORS.textPrimary,
            margin: "10px 0 0 0",
          }}
        >
          {COPY.career.title}
        </h2>
      </div>

      {/* Timeline + Cards */}
      <div
        style={{
          display: "flex",
          gap: 28,
          position: "relative",
          flex: 1,
        }}
      >
        {/* Vertical timeline line */}
        <div
          style={{
            position: "absolute",
            left: 160,
            top: 20,
            bottom: 20,
            width: 2,
            background: `linear-gradient(180deg, ${COLORS.teal}, ${COLORS.amber})`,
            opacity: 0.3,
          }}
        />

        {experiences.map((exp, i) => {
          const delay = i * 18;
          const cardSpring = spring({
            frame: frame - delay > 0 ? frame - delay : 0,
            fps: CONFIG.FPS,
            config: { damping: 16, stiffness: 90 },
          });
          const cardOpacity = interpolate(
            frame - delay,
            [0, 20],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          return (
            <div
              key={i}
              style={{
                opacity: cardOpacity,
                transform: `translateY(${interpolate(
                  frame - delay,
                  [0, 30],
                  [50, 0],
                  { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                )}px) scale(${cardSpring * 0.95 + 0.05})`,
                flex: 1,
                minWidth: 280,
                padding: 28,
                borderRadius: 16,
                border: `1px solid ${i === 0 ? COLORS.teal : `${COLORS.textDim}15`}`,
                background: i === 0
                  ? `${COLORS.teal}08`
                  : `${COLORS.textDim}04`,
                position: "relative",
                zIndex: experiences.length - i,
              }}
            >
              {/* Timeline dot */}
              <div
                style={{
                  position: "absolute",
                  top: -10,
                  left: 150,
                  width: 16,
                  height: 16,
                  borderRadius: "50%",
                  border: `2px solid ${i === 0 ? COLORS.teal : COLORS.amber}`,
                  background: i === 0 ? COLORS.teal : COLORS.bgDeep,
                  boxShadow: i === 0
                    ? `0 0 16px ${COLORS.teal}60`
                    : undefined,
                }}
              />

              {/* Company & Role */}
              <div style={{ marginBottom: 14 }}>
                <span
                  style={{
                    fontSize: 11,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase" as const,
                    color: i % 2 === 0 ? COLORS.teal : COLORS.amber,
                    opacity: 0.7,
                  }}
                >
                  {exp.period}
                </span>
                <h3
                  style={{
                    fontSize: 20,
                    fontWeight: 600,
                    color: COLORS.textPrimary,
                    margin: "6px 0 4px 0",
                    lineHeight: 1.3,
                  }}
                >
                  {exp.company}
                </h3>
                <p
                  style={{
                    fontSize: 15,
                    color: COLORS.textDim,
                    margin: 0,
                    fontWeight: 500,
                  }}
                >
                  {exp.role}
                </p>
              </div>

              {/* Key highlight */}
              <p
                style={{
                  fontSize: 14,
                  color: `${COLORS.textPrimary}AA`,
                  lineHeight: 1.65,
                  margin: 0,
                }}
              >
                {exp.highlight}
              </p>

              {/* Tags */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap" as const,
                  gap: 6,
                  marginTop: 16,
                }}
              >
                {exp.tags.map((tag, j) => (
                  <span
                    key={j}
                    style={{
                      fontSize: 11,
                      padding: "4px 12px",
                      borderRadius: 12,
                      background: `${COLORS.textDim}10`,
                      color: COLORS.textDim,
                      border: `1px solid ${COLORS.textDim}15`,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
