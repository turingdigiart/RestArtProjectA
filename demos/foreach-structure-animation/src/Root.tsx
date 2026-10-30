import { Composition } from "remotion";
import { ForeachStructureDemo } from "./ForeachStructureDemo";

// 总时长：30fps × 12秒 = 360帧
const TOTAL_DURATION = 360;

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="ForeachStructure"
        component={ForeachStructureDemo}
        durationInFrames={TOTAL_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};