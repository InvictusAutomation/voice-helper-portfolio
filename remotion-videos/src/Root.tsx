import React from "react";
import { Composition } from "remotion";
import { RockChenIntroComposition } from "./compositions/rock-chen-intro/VideoComposition";
import { CONFIG } from "./compositions/rock-chen-intro/constants";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="rock-chen-intro"
      component={RockChenIntroComposition}
      durationInFrames={CONFIG.DURATION_FRAMES}
      fps={CONFIG.FPS}
      width={CONFIG.WIDTH}
      height={CONFIG.HEIGHT}
      defaultProps={{}}
    />
  );
};
