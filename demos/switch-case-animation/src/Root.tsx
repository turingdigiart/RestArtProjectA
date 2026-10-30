import { Composition } from "remotion";
import { SwitchCaseDemo } from "./SwitchCaseDemo";

// 总时长：30fps × 12秒 = 360帧
const TOTAL_DURATION = 360;

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="SwitchCase"
        component={SwitchCaseDemo}
        durationInFrames={TOTAL_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};