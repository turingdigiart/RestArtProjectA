import { Composition } from "remotion";
import { ForeachIntVsRefDemo } from "./ForeachIntVsRefDemo";

// 总时长：30fps × 18秒 = 540帧
const TOTAL_DURATION = 540;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="ForeachIntVsRef"
        component={ForeachIntVsRefDemo}
        durationInFrames={TOTAL_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};