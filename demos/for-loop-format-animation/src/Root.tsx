import { Composition } from "remotion";
import { ForLoopFormatDemo } from "./ForLoopFormatDemo";

// 总时长：30fps × 18秒 = 540帧
// 所有组件出现后都会持续到末尾
const TOTAL_DURATION = 540;

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="ForLoopFormat"
        component={ForLoopFormatDemo}
        durationInFrames={TOTAL_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};