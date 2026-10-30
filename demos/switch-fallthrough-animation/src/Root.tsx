import { Composition } from "remotion";
import { SwitchFallthroughDemo } from "./SwitchFallthroughDemo";

// 总时长：30fps × 11秒 = 330帧
const TOTAL_DURATION = 330;

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="SwitchFallthrough"
        component={SwitchFallthroughDemo}
        durationInFrames={TOTAL_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};