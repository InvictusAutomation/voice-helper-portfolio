import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Easing, spring } from "remotion";
import { CONFIG, COLORS, TIMELINE, COPY, FONTS } from "./constants";

export const Scene5_BeTheOnly: React.FC = () => {
  const frame = useCurrentFrame();
  const localFrame = frame - TIMELINE.s5_start;
  const duration = TIMELINE.s5_end - TIMELINE.s5_start;

  // 背景渐入深色
  const bgOpacity = interpolate(localFrame, [0, 25], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  // 网络节点微弱闪烁
  const nodePulse = 0.04 + Math.sin(localFrame * 0.02) * 0.03;
  const nodesOpacity = bgOpacity;

  // ===== Kevin Kelly 名言 =====

  // 引号装饰进入
  const quoteMarkScale = spring({ frame: localFrame, fps: CONFIG.FPS, config: { damping: 14, stiffness: 70 } });
  const quoteMarkOpacity = interpolate(localFrame, [5, 20], [0, 0.15], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  // 主引文逐词效果 — 用整体淡入模拟
  const quoteOpacity = interpolate(localFrame, [20, 55], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic),
  });
  const quoteY = interpolate(localFrame, [22, 58], [25, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic),
  });
  // 文字发光效果
  const glowIntensity = 0.5 + Math.sin(localFrame * 0.03) * 0.2;

  // 作者署名
  const attrOpacity = interpolate(localFrame, [65, 85], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const attrY = interpolate(localFrame, [67, 87], [15, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic),
  });

  // 停顿后第二段话进入
  const missionStart = 110; // 约3.7秒后
  const missionOpacity = interpolate(localFrame, [missionStart, missionStart + 35], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const missionY = interpolate(localFrame, [missionStart + 3, missionStart + 38], [25, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic),
  });

  // 淡出
  const fadeOut = interpolate(localFrame, [duration - 15, duration], [1, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.mission.bg, opacity: bgOpacity }}>
      {/* 背景网络节点装饰 */}
      {nodesOpacity > 0 && (
        <svg style={{ position: "absolute", inset: 0, opacity: nodesOpacity * nodePulse * fadeOut }} viewBox="0 0 1920 1080">
          {/* 节点圆点散布 */}
          {Array.from({ length: 24 }).map((_, i) => {
            const x = ((i * 137 + 50) % 1820) + 50;
            const y = ((i * 89 + 30) % 980) + 50;
            const r = 2 + (i % 3);
            return <circle key={i} cx={x} cy={y} r={r} fill={COLORS.mission.primary} opacity={0.15} />;
          })}
          {/* 连接线 */}
          {[
            [200, 180, 500, 350],
            [600, 100, 900, 300],
            [1100, 200, 1450, 400],
            [300, 650, 700, 800],
            [1200, 700, 1600, 850],
            [100, 450, 400, 550],
            [1500, 150, 1750, 350],
          ].map(([x1, y1, x2, y2], i) => (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={COLORS.mission.primary} strokeWidth={0.5} opacity={0.08} />
          ))}
        </svg>
      )}

      {/* 引号装饰 */}
      <div
        style={{
          position: "absolute",
          top: 260,
          left: 220,
          transform: `scale(${quoteMarkScale})`,
          opacity: quoteMarkOpacity * fadeOut,
        }}
      >
        <span
          style={{
            fontFamily: "Georgia, serif",
            fontSize: 240,
            fontWeight: 700,
            color: COLORS.mission.primary,
            lineHeight: 1,
            opacity: 0.2,
          }}
        >
          &#8220;
        </span>
      </div>

      {/* 主引文 */}
      <AbsoluteFill>
        <div
          style={{
            position: "absolute",
            top: 360,
            left: 0,
            right: 0,
            textAlign: "center",
            transform: `translateY(${quoteY}px)`,
            opacity: quoteOpacity * fadeOut,
          }}
        >
          <h1
            style={{
              fontFamily: FONTS.quote.family,
              fontSize: FONTS.quote.size,
              fontWeight: FONTS.quote.weight as number,
              color: COLORS.mission.quote,
              lineHeight: 1.35,
              margin: 0,
              padding: "0 160px",
              letterSpacing: "-0.03em",
              textShadow: `
                0 0 ${30 * glowIntensity}px ${COLORS.mission.glow},
                0 0 ${60 * glowIntensity}px ${COLORS.mission.glow}
              `,
            }}
          >
            {COPY.s5_quote}
          </h1>
        </div>
      </AbsoluteFill>

      {/* 作者署名 */}
      <AbsoluteFill>
        <div
          style={{
            position: "absolute",
            top: 540,
            right: 280,
            transform: `translateY(${attrY}px)`,
            opacity: attrOpacity * fadeOut,
          }}
        >
          <p
            style={{
              fontFamily: FONTS.quoteSub.family,
              fontSize: FONTS.quoteSub.size,
              fontWeight: FONTS.quoteSub.weight as number,
              color: COLORS.mission.subtext,
              fontStyle: "italic",
              margin: 0,
              letterSpacing: "0.05em",
            }}
          >
            {COPY.s5_attr}
          </p>
        </div>
      </AbsoluteFill>

      {/* 第二段：使命宣言 */}
      <AbsoluteFill>
        <div
          style={{
            position: "absolute",
            top: 620,
            left: 0,
            right: 0,
            textAlign: "center",
            transform: `translateY(${missionY}px)`,
            opacity: missionOpacity * fadeOut,
          }}
        >
          <p
            style={{
              fontFamily: FONTS.body.family,
              fontSize: FONTS.body.size - 4,
              fontWeight: FONTS.body.weight as number,
              color: COLORS.mission.subtext,
              lineHeight: 1.65,
              margin: 0,
              padding: "0 200px",
              maxWidth: 1400,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            {COPY.s5_mission}
          </p>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
