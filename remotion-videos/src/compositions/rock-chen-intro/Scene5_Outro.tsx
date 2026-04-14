import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from "remotion";
import { loadFont } from "@remotion/google-fonts/Montserrat";
import { CONFIG, COLORS, COPY } from "./constants";

export const Scene5_Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fontFamily } = loadFont();

  const outro = COPY.outro;

  const mainOpacity = interpolate(frame, [0, 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Gentle float effect
  const floatY = Math.sin(frame * 0.06) * 4;

  // CTA button pulse
  const btnScale = spring({
    frame: frame - 30 > 0 ? frame - 30 : 0,
    fps: CONFIG.FPS,
    config: { damping: 10, stiffness: 100, mass: 0.5 },
  });
  const btnOpacity = interpolate(frame, [30, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Contact info stagger
  const contacts = outro.contacts;

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${COLORS.bgDeep}, #0C162E)`,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        fontFamily,
      }}
    >
      {/* Ambient warm glow */}
      <div
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.amber}10 0%, transparent 70%)`,
          filter: "blur(80px)",
        }}
      />

      {/* Main content */}
      <div
        style={{
          opacity: mainOpacity,
          transform: `translateY(${floatY}px)`,
          textAlign: "center" as const,
          zIndex: 1,
        }}
      >
        <h2
          style={{
            fontSize: 52,
            fontWeight: 300,
            color: COLORS.textPrimary,
            margin: 0,
            lineHeight: 1.3,
          }}
        >
          {outro.title}
        </h2>
        <p
          style={{
            fontSize: 22,
            color: COLORS.textDim,
            margin: "20px 0 36px 0",
            maxWidth: 500,
            lineHeight: 1.6,
          }}
        >
          {outro.subtitle}
        </p>

        {/* CTA Button */}
        <div
          style={{
            opacity: btnOpacity,
            transform: `scale(${btnScale})`,
            display: "inline-block",
            padding: "16px 44px",
            borderRadius: 50,
            border: `1px solid ${COLORS.teal}`,
            background: `${COLORS.teal}15`,
            transition: "none",
          }}
        >
          <span
            style={{
              fontSize: 17,
              fontWeight: 500,
              color: COLORS.tealLight,
              letterSpacing: "0.08em",
            }}
          >
            {outro.cta}
          </span>
        </div>
      </div>

      {/* Contact info row */}
      <div
        style={{
          position: "absolute",
          bottom: 100,
          display: "flex",
          gap: 40,
          zIndex: 1,
        }}
      >
        {contacts.map((contact, i) => {
          const contactDelay = 40 + i * 15;
          const cOpacity = interpolate(
            frame,
            [contactDelay, contactDelay + 18],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );
          const cY = interpolate(
            frame,
            [contactDelay, contactDelay + 22],
            [15, 0],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          return (
            <div
              key={i}
              style={{
                opacity: cOpacity,
                transform: `translateY(${cY}px)`,
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <span style={{ fontSize: 18, color: COLORS.teal }}>
                {contact.icon}
              </span>
              <span
                style={{
                  fontSize: 14,
                  color: COLORS.textDim,
                  fontWeight: 400,
                }}
              >
                {contact.value}
              </span>
            </div>
          );
        })}
      </div>

      {/* Decorative corner accents */}
      <div
        style={{
          position: "absolute",
          top: 40,
          left: 40,
          width: 60,
          height: 60,
          borderTop: `2px solid ${COLORS.teal}30`,
          borderLeft: `2px solid ${COLORS.teal}30`,
          opacity: mainOpacity * 0.4,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 40,
          right: 40,
          width: 60,
          height: 60,
          borderBottom: `2px solid ${COLORS.amber}30`,
          borderRight: `2px solid ${COLORS.amber}30`,
          opacity: mainOpacity * 0.4,
        }}
      />
    </AbsoluteFill>
  );
};
