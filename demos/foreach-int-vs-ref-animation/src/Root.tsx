import { Composition } from "remotion";
import { ForeachIntVsRefDemo } from "./ForeachIntVsRefDemo";
import { STAGES } from "./config";

// 总时长由配置的最后一个阶段决定——不要在两处各写一个数字
// （历史缺陷：这里写 540，配置排到 750，后段内容被截断）
const TOTAL_DURATION = STAGES[STAGES.length - 1].end;

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
