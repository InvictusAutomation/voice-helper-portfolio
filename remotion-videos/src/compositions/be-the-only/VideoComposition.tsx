import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { Scene1_Taiwan } from "./Scene1_Taiwan";
import { Scene2_JimmyLiao } from "./Scene2_JimmyLiao";
import { Scene3_PhineasFerb } from "./Scene3_PhineasFerb";
import { Scene4_Singapore } from "./Scene4_Singapore";
import { Scene5_BeTheOnly } from "./Scene5_BeTheOnly";
import { Scene6_Notebook } from "./Scene6_Notebook";
import { TIMELINE, CONFIG } from "./constants";

export const BeTheOnlyComposition: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      {/* Scene 1: Born in Taiwan (0 ~ 132 frames / 4.4s) */}
      <Sequence from={TIMELINE.s1_start} durationInFrames={TIMELINE.s1_end - TIMELINE.s1_start}>
        <Scene1_Taiwan />
      </Sequence>

      {/* Scene 2: Jimmy Liao (132 ~ 228 frames / 3.2s) */}
      <Sequence from={TIMELINE.s2_start} durationInFrames={TIMELINE.s2_end - TIMELINE.s2_start}>
        <Scene2_JimmyLiao />
      </Sequence>

      {/* Scene 3: Phineas & Ferb + Deep Thinking (228 ~ 618 frames / 13s) */}
      <Sequence from={TIMELINE.s3a_start} durationInFrames={TIMELINE.s3b_end - TIMELINE.s3a_start}>
        <Scene3_PhineasFerb />
      </Sequence>

      {/* Scene 4: Singapore Seminar (618 ~ 858 frames / 8s) */}
      <Sequence from={TIMELINE.s4_start} durationInFrames={TIMELINE.s4_end - TIMELINE.s4_start}>
        <Scene4_Singapore />
      </Sequence>

      {/* Scene 5: Be The Only (858 ~ 1158 frames / 10s) */}
      <Sequence from={TIMELINE.s5_start} durationInFrames={TIMELINE.s5_end - TIMELINE.s5_start}>
        <Scene5_BeTheOnly />
      </Sequence>

      {/* Scene 6: Researcher's Notebook (1158 ~ 1308 frames / 5s) */}
      <Sequence from={TIMELINE.s6_start} durationInFrames={TIMELINE.s6_end - TIMELINE.s6_start}>
        <Scene6_Notebook />
      </Sequence>
    </AbsoluteFill>
  );
};
