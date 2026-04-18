import React from "react";
import { Composition } from "remotion";
import { RockChenIntroComposition } from "./compositions/rock-chen-intro/VideoComposition";
import { CONFIG as RockChenConfig } from "./compositions/rock-chen-intro/constants";
import { CuriosityIntroComposition } from "./compositions/curiosity-intro/VideoComposition";
import { CONFIG as CuriosityConfig } from "./compositions/curiosity-intro/constants";
import { BeTheOnlyComposition } from "./compositions/be-the-only/VideoComposition";
import { CONFIG as BeTheOnlyConfig } from "./compositions/be-the-only/constants";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="rock-chen-intro"
        component={RockChenIntroComposition}
        durationInFrames={RockChenConfig.DURATION_FRAMES}
        fps={RockChenConfig.FPS}
        width={RockChenConfig.WIDTH}
        height={RockChenConfig.HEIGHT}
        defaultProps={{}}
      />
      <Composition
        id="curiosity-intro"
        component={CuriosityIntroComposition}
        durationInFrames={CuriosityConfig.DURATION_FRAMES}
        fps={CuriosityConfig.FPS}
        width={CuriosityConfig.WIDTH}
        height={CuriosityConfig.HEIGHT}
        defaultProps={{}}
      />
      <Composition
        id="be-the-only"
        component={BeTheOnlyComposition}
        durationInFrames={BeTheOnlyConfig.DURATION_FRAMES}
        fps={BeTheOnlyConfig.FPS}
        width={BeTheOnlyConfig.WIDTH}
        height={BeTheOnlyConfig.HEIGHT}
        defaultProps={{}}
      />
    </>
  );
};
