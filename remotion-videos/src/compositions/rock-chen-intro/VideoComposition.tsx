import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { Scene1_Opening } from "./Scene1_Opening";
import { Scene2_WhoAmI } from "./Scene2_WhoAmI";
import { Scene3_Career } from "./Scene3_Career";
import { Scene4_Project } from "./Scene4_Project";
import { Scene5_Outro } from "./Scene5_Outro";

export const RockChenIntroComposition: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* Scene 1: Opening — "Rock Chen 陈厚瑄" (0–300 frames / 5s) */}
      <Sequence from={0} durationInFrames={300}>
        <Scene1_Opening />
      </Sequence>

      {/* Scene 2: Who Am I — 关键词云 (300–660 frames / 6s) */}
      <Sequence from={300} durationInFrames={360}>
        <Scene2_WhoAmI />
      </Sequence>

      {/* Scene 3: Career Journey (660–1200 frames / 9s) */}
      <Sequence from={660} durationInFrames={540}>
        <Scene3_Career />
      </Sequence>

      {/* Scene 4: Project Highlight (1200–1680 frames / 8s) */}
      <Sequence from={1200} durationInFrames={480}>
        <Scene4_Project />
      </Sequence>

      {/* Scene 5: Outro CTA (1680–1800 frames / 2s) */}
      <Sequence from={1680} durationInFrames={120}>
        <Scene5_Outro />
      </Sequence>
    </AbsoluteFill>
  );
};
