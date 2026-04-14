import React from "react";
import { AbsoluteFill, useCurrentFrame, spring, interpolate } from "remotion";
import { loadFont } from "@remotion/google-fonts/Montserrat";
import { CONFIG, COLORS, COPY } from "./constants";

export const Scene4_Project: React.FC = () => {
  const frame = useCurrentFrame();
  const { fontFamily } = loadFont();
  const proj = COPY.project;

  // Left text entrance
  const leftX = interpolate(frame, [0, 35], [-80, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const leftOpacity = interpolate(frame, [0, 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Right arch entrance
  const rightScale = spring({
    frame: frame - 20 > 0 ? frame - 20 : 0,
    fps: CONFIG.FPS,
    config: { damping: 18, stiffness: 80 },
  });
  const rightOpacity = interpolate(frame, [20, 45], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Feature items stagger
  const featureItems = proj.features;

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 70% 50%, #0F2040, ${COLORS.bgDeep})`,
        padding: "80px 120px",
        flexDirection: "row",
        gap: 80,
        fontFamily,
      }}
    >
      {/* Left: Project Info */}
      <div
        style={{
          flex: 1,
          opacity: leftOpacity,
          transform: `translateX(${leftX}px)`,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            fontSize: 13,
            letterSpacing: "0.3em",
            textTransform: "uppercase" as const,
            color: COLORS.teal,
            fontWeight: 500,
          }}
        >
          {proj.label}
        </span>
        <h2
          style={{
            fontSize: 46,
            fontWeight: 700,
            color: COLORS.textPrimary,
            margin: "14px 0 8px 0",
            lineHeight: 1.2,
          }}
        >
          {proj.name}
        </h2>
        <p
          style={{
            fontSize: 19,
            color: COLORS.textDim,
            lineHeight: 1.7,
            margin: "0 0 24px 0",
            maxWidth: 520,
          }}
        >
          {proj.description}
        </p>

        {/* Feature list with stagger */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {featureItems.map((feat, i) => {
            const itemDelay = 45 + i * 12;
            const itemOpacity = interpolate(
              frame,
              [itemDelay, itemDelay + 16],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );
            const itemX = interpolate(
              frame,
              [itemDelay, itemDelay + 20],
              [-30, 0],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );

            return (
              <div
                key={i}
                style={{
                  opacity: itemOpacity,
                  transform: `translateX(${itemX}px)`,
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 12,
                }}
              >
                <span
                  style={{
                    color: COLORS.amber,
                    fontSize: 18,
                    marginTop: 2,
                  }}
                >
                  ▸
                </span>
                <div>
                  <strong
                    style={{
                      fontSize: 16,
                      color: COLORS.textPrimary,
                      fontWeight: 600,
                    }}
                  >
                    {feat.name}
                  </strong>
                  <p
                    style={{
                      fontSize: 14,
                      color: COLORS.textDim,
                      margin: "2px 0 0 0",
                      lineHeight: 1.5,
                    }}
                  >
                    {feat.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right: Architecture Diagram */}
      <div
        style={{
          flex: 0.9,
          opacity: rightOpacity,
          transform: `scale(${rightScale})`,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
        >
          {/* Architecture card */}
          <div
            style={{
              width: "100%",
              maxWidth: 480,
              padding: 36,
              borderRadius: 18,
              border: `1px solid ${COLORS.teal}25`,
              background: "#00000030",
              backdropFilter: "blur(10px)",
            }}
          >
            <div
              style={{
                fontSize: 12,
                letterSpacing: "0.2em",
                textTransform: "uppercase" as const,
                color: COLORS.textDim,
                marginBottom: 20,
                textAlign: "center" as const,
              }}
            >
              System Architecture
            </div>

            {/* Layer blocks */}
            {[
              {
                label: "Voice Layer",
                modules: ["Realtime API", "VAD", "< 1.5s Latency"],
                color: COLORS.teal,
                bg: `${COLORS.teal}15`,
              },
              {
                label: "Brain Engine",
                modules: ["State Machine", "Memory (Mem0)", "Proactive Trigger"],
                color: COLORS.amber,
                bg: `${COLORS.amber}12`,
              },
              {
                label: "External Services",
                modules: ["DashScope Qwen", "Qdrant Vector DB", "MCP Tools"],
                color: COLORS.textDim,
                bg: `${COLORS.textDim}08`,
              },
            ].map((layer, li) => {
              const layerDelay = 55 + li * 15;
              const layerOpacity = interpolate(
                frame,
                [layerDelay, layerDelay + 18],
                [0, 1],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              );
              const layerY = interpolate(
                frame,
                [layerDelay, layerDelay + 22],
                [20, 0],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              );

              return (
                <React.Fragment key={li}>
                  <div
                    style={{
                      opacity: layerOpacity,
                      transform: `translateY(${layerY}px)`,
                      padding: 18,
                      borderRadius: 12,
                      border: `1px solid ${layer.color}30`,
                      background: layer.bg,
                      marginBottom: li < 2 ? 12 : 0,
                    }}
                  >
                    <div
                      style={{
                        fontSize: 14,
                        fontWeight: 600,
                        color: layer.color,
                        marginBottom: 10,
                      }}
                    >
                      {layer.label}
                    </div>
                    <div
                      style={{ display: "flex", gap: 8, flexWrap: "wrap" as const }}
                    >
                      {layer.modules.map((mod, mi) => (
                        <span
                          key={mi}
                          style={{
                            fontSize: 12,
                            padding: "5px 12px",
                            borderRadius: 10,
                            background: `${COLORS.textDim}08`,
                            color: `${COLORS.textPrimary}CC`,
                            border: `1px solid ${COLORS.textDim}12`,
                          }}
                        >
                          {mod}
                        </span>
                      ))}
                    </div>
                  </div>
                  {li < 2 && (
                    <div
                      style={{
                        textAlign: "center" as const,
                        color: COLORS.textDim,
                        fontSize: 16,
                        marginBottom: 4,
                        opacity: layerOpacity * 0.5,
                      }}
                    >
                      ▼
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
    </AbsoluteFill>
  );
};
