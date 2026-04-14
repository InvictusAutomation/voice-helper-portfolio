import React from "react";
import { AbsoluteFill, useCurrentFrame, spring, interpolate } from "remotion";
import { loadFont } from "@remotion/google-fonts/Montserrat";
import { CONFIG, COLORS, COPY } from "./constants";

export const Scene2_WhoAmI: React.FC = () => {
  const frame = useCurrentFrame();
  const { fontFamily } = loadFont();
  const tags = COPY.whoAmI.tags;

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${COLORS.bgDeep}, #0D1F38)`,
        padding: "100px 140px",
        fontFamily,
        flexDirection: "column",
      }}
    >
      {/* Section header */}
      <div
        style={{
          opacity: interpolate(frame, [0, 20], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          transform: `translateX(${interpolate(frame, [0, 25], [-60, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}px)`,
          marginBottom: 60,
        }}
      >
        <span
          style={{
            fontSize: 14,
            letterSpacing: "0.3em",
            textTransform: "uppercase" as const,
            color: COLORS.teal,
            fontWeight: 500,
          }}
        >
          {COPY.whoAmI.label}
        </span>
        <h2
          style={{
            fontSize: 56,
            fontWeight: 300,
            color: COLORS.textPrimary,
            margin: "12px 0 0 0",
            lineHeight: 1.3,
          }}
        >
          {COPY.whoAmI.title}
        </h2>
      </div>

      {/* Keyword cloud grid */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap" as const,
          gap: 18,
          maxWidth: 1400,
          justifyContent: "center",
        }}
      >
        {tags.map((tag, i) => {
          const delay = i * 6; // stagger each tag by 6 frames
          const tagSpring = spring({
            frame: frame - delay > 0 ? frame - delay : 0,
            fps: CONFIG.FPS,
            config: { damping: 16, stiffness: 130 },
          });
          const tagOpacity = interpolate(
            frame - delay,
            [0, 12],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          // Vary sizes for visual interest
          const isLarge = tag.size === "lg";
          const isHighlight = tag.highlight;

          return (
            <div
              key={i}
              style={{
                opacity: tagOpacity,
                transform: `scale(${tagSpring})`,
                padding: isLarge ? "16px 36px" : "12px 28px",
                borderRadius: 50,
                border: `1px solid ${
                  isHighlight ? COLORS.amber : `${COLORS.teal}40`
                }`,
                background: isHighlight
                  ? `${COLORS.amber}12`
                  : `${COLORS.teal}08`,
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              {tag.icon && (
                <span style={{ fontSize: isLarge ? 22 : 17 }}>{tag.icon}</span>
              )}
              <span
                style={{
                  fontSize: isLarge ? 24 : 18,
                  fontWeight: isLarge ? 600 : 400,
                  color: isHighlight ? COLORS.amber : COLORS.tealLight,
                  whiteSpace: "nowrap" as const,
                }}
              >
                {tag.text}
              </span>
            </div>
          );
        })}
      </div>

      {/* Bottom quote */}
      <div
        style={{
          position: "absolute",
          bottom: 100,
          left: 140,
          right: 140,
          opacity: interpolate(frame, [200, 240], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <p
          style={{
            fontSize: 22,
            color: COLORS.textDim,
            fontStyle: "italic" as const,
            lineHeight: 1.7,
            borderLeft: `3px solid ${COLORS.teal}`,
            paddingLeft: 24,
          }}
        >
          "{COPY.whoAmI.quote}"
        </p>
      </div>
    </AbsoluteFill>
  );
};
