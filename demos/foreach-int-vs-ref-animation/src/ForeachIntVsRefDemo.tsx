import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Sequence,
} from "remotion";
import {
  COL,
  backgroundStyle,
  FONT_UI,
} from "./styles";
import {
  STAGES,
  TIMING,
  ARRAY_DATA,
  MODIFIED_VALUE,
  GRID_BOX_SIZE,
  GRID_GAP,
  CODE_EXAMPLES,
  STEP_INFO,
} from "./config";

// 导入模块化组件
import { GridBox } from "./components/GridBox";
import { IntBox } from "./components/IntBox";
import { FlowArrow } from "./components/FlowArrow";
import { CodeDisplay } from "./components/CodeDisplay";
import { StepIndicator } from "./components/StepIndicator";

// ============================================
// 主组件
// ============================================

export const ForeachIntVsRefDemo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 获取当前阶段
  const getCurrentStage = () => {
    for (let i = 0; i < STAGES.length; i++) {
      if (frame >= STAGES[i].from && frame < STAGES[i].end) {
        return i + 1;
      }
    }
    return STAGES.length;
  };

  const currentStage = getCurrentStage();

  // 计算当前处理的数组索引
  const getIterationIndex = () => {
    if (frame < STAGES[1].from) return 0;

    const intDemoFrame = frame - STAGES[1].from;
    const refDemoFrame = frame - STAGES[3].from;

    if (frame < STAGES[3].from) {
      return Math.min(2, Math.floor(intDemoFrame / TIMING.elementDelay));
    } else {
      return Math.min(2, Math.floor(refDemoFrame / TIMING.elementDelay));
    }
  };

  const iterationIndex = getIterationIndex();

  // 各阶段的可见性控制
  const isIntDemo = frame >= STAGES[1].from && frame < STAGES[3].from;
  const isRefDemo = frame >= STAGES[3].from && frame < STAGES[5].from;
  const isSummary = frame >= STAGES[5].from;
  const isModified = frame >= STAGES[2].from && frame < STAGES[5].from;

  // 流动箭头动画
  const getFlowAlpha = () => {
    if (frame < STAGES[1].from) return 0;
    if (isIntDemo || isRefDemo) {
      const cyclePos = (frame - STAGES[1].from) % 75;
      if (cyclePos < 30) return cyclePos / 30;
      return (75 - cyclePos) / 45;
    }
    return 0;
  };

  const flowAlpha = getFlowAlpha();

  // 当前步骤信息
  const currentStepInfo = STEP_INFO[currentStage - 1];

  return (
    <AbsoluteFill style={backgroundStyle}>
      {/* 步骤指示器 */}
      <StepIndicator
        current={currentStage}
        total={STAGES.length}
        title={currentStepInfo.title}
        description={currentStepInfo.description}
      />

      {/* 标题 */}
      <Sequence from={0} durationInFrames={90}>
        <div
          style={{
            position: "absolute",
            top: 160,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            opacity: interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          <div
            style={{
              color: COL.enumName,
              fontSize: 48,
              fontWeight: "bold",
              fontFamily: FONT_UI,
              textAlign: "center",
              padding: "16px 32px",
              backgroundColor: `${COL.enumName}15`,
              border: `3px solid ${COL.enumName}`,
              borderRadius: 12,
              boxShadow: `0 0 20px ${COL.enumName}40`,
            }}
          >
            foreach 中 int vs int&
          </div>
        </div>
      </Sequence>

      {/* 代码展示 */}
      <Sequence from={STAGES[1].from} durationInFrames={STAGES[4].end - STAGES[1].from}>
        <div
          style={{
            position: "absolute",
            top: 260,
            left: 100,
            right: 100,
            opacity: interpolate(frame, [STAGES[1].from, STAGES[1].from + 30], [0, 1], {
              extrapolateRight: "clamp",
            }),
          }}
        >
          <CodeDisplay
            code={isIntDemo ? CODE_EXAMPLES.int : CODE_EXAMPLES.ref}
            highlightLines={[2, 3]}
            filename={isIntDemo ? "int_copy.cpp" : "int_ref.cpp"}
          />
        </div>
      </Sequence>

      {/* 主演示区域 */}
      <Sequence from={STAGES[0].from} durationInFrames={STAGES[5].end - STAGES[0].from}>
        <div
          style={{
            position: "absolute",
            top: 560,
            left: 0,
            right: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 50,
            padding: "0 120px",
          }}
        >
          {/* 左侧：int 演示 */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 60,
              opacity: interpolate(frame, [STAGES[1].from - 30, STAGES[1].from], [0, 1], {
                extrapolateRight: "clamp",
              }),
            }}
          >
            {/* 原数组 */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  color: COL.type,
                  fontSize: 24,
                  fontWeight: "bold",
                  fontFamily: FONT_UI,
                  marginBottom: 16,
                }}
              >
                原数组 arr
              </div>
              <div
                style={{
                  display: "flex",
                  gap: GRID_GAP,
                  padding: "20px 24px",
                  backgroundColor: "rgba(78,201,176,0.15)",
                  borderRadius: 12,
                  border: "2px solid rgba(78,201,176,0.6)",
                  boxShadow: "0 4px 20px rgba(78,201,176,0.2)",
                }}
              >
                {ARRAY_DATA.map((v, i) => (
                  <GridBox
                    key={i}
                    value={isRefDemo && isModified && i === 1 ? MODIFIED_VALUE : v}
                    highlight={(isIntDemo || isRefDemo) && i === iterationIndex}
                    changed={isRefDemo && isModified && i === 1}
                    addressIndex={i}
                  />
                ))}
              </div>
            </div>

            {/* 流动箭头 */}
            <FlowArrow
              direction="diagonal"
              label={isIntDemo ? "复制副本" : ""}
              color={COL.keyword}
              alpha={isIntDemo ? flowAlpha : 0}
            />

            {/* int 副本 */}
            <IntBox
              label="int item"
              subtitle="（独立副本）"
              description="修改不影响原数组"
              color={COL.keyword}
              value={
                isModified && isIntDemo && iterationIndex === 1
                  ? MODIFIED_VALUE
                  : ARRAY_DATA[iterationIndex]
              }
              highlight={isIntDemo}
              changed={isModified && isIntDemo && iterationIndex === 1}
            />
          </div>

          {/* 右侧：int& 演示 */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 60,
              opacity: interpolate(frame, [STAGES[3].from - 30, STAGES[3].from], [0, 1], {
                extrapolateRight: "clamp",
              }),
            }}
          >
            {/* 原数组 */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  color: COL.variable,
                  fontSize: 24,
                  fontWeight: "bold",
                  fontFamily: FONT_UI,
                  marginBottom: 16,
                }}
              >
                原数组 arr
              </div>
              <div
                style={{
                  display: "flex",
                  gap: GRID_GAP,
                  padding: "20px 24px",
                  backgroundColor: "rgba(156,220,254,0.15)",
                  borderRadius: 12,
                  border: "2px solid rgba(156,220,254,0.6)",
                  boxShadow: "0 4px 20px rgba(156,220,254,0.2)",
                }}
              >
                {ARRAY_DATA.map((v, i) => (
                  <GridBox
                    key={i}
                    value={isRefDemo && isModified && i === 1 ? MODIFIED_VALUE : v}
                    highlight={isRefDemo && i === iterationIndex}
                    changed={isRefDemo && isModified && i === 1}
                    addressIndex={i}
                  />
                ))}
              </div>
            </div>

            {/* 流动箭头 */}
            <FlowArrow
              direction="right"
              label={isRefDemo ? "直接引用" : ""}
              color={COL.variable}
              alpha={isRefDemo ? flowAlpha : 0}
            />

            {/* int& 引用 */}
            <IntBox
              label="int& item"
              subtitle="（同一份数据）"
              description="修改直接影响原数组"
              color={COL.variable}
              value={
                isRefDemo
                  ? (isModified && iterationIndex === 1 ? MODIFIED_VALUE : ARRAY_DATA[iterationIndex])
                  : ARRAY_DATA[0]
              }
              highlight={isRefDemo}
              changed={isRefDemo && isModified && iterationIndex === 1}
              showPointer={isRefDemo}
            />
          </div>

          {/* 总结阶段 */}
          {isSummary && (
            <div
              style={{
                display: "flex",
                gap: 80,
                marginTop: 50,
                opacity: interpolate(frame, [STAGES[5].from, STAGES[5].from + 30], [0, 1], {
                  extrapolateRight: "clamp",
                }),
              }}
            >
              {/* int 总结 */}
              <div
                style={{
                  flex: 1,
                  padding: "24px 32px",
                  backgroundColor: "rgba(86, 156, 214, 0.15)",
                  border: `2px solid ${COL.keyword}`,
                  borderRadius: 12,
                  textAlign: "center",
                  boxShadow: `0 4px 16px ${COL.keyword}30`,
                }}
              >
                <div
                  style={{
                    color: COL.keyword,
                    fontSize: 28,
                    fontWeight: "bold",
                    fontFamily: FONT_UI,
                    marginBottom: 12,
                  }}
                >
                  int（值传递）
                </div>
                <div
                  style={{
                    color: COL.textPri,
                    fontSize: 18,
                    fontFamily: FONT_UI,
                    lineHeight: 1.6,
                  }}
                >
                  拷贝数据，独立存储
                  <br />
                  修改不影响原数组
                  <br />
                  <span style={{ color: COL.textWeak, fontSize: 16 }}>
                    适用于：只读取数据
                  </span>
                </div>
              </div>

              {/* int& 总结 */}
              <div
                style={{
                  flex: 1,
                  padding: "24px 32px",
                  backgroundColor: "rgba(156, 220, 254, 0.15)",
                  border: `2px solid ${COL.variable}`,
                  borderRadius: 12,
                  textAlign: "center",
                  boxShadow: `0 4px 16px ${COL.variable}30`,
                }}
              >
                <div
                  style={{
                    color: COL.variable,
                    fontSize: 28,
                    fontWeight: "bold",
                    fontFamily: FONT_UI,
                    marginBottom: 12,
                  }}
                >
                  int&（引用传递）
                </div>
                <div
                  style={{
                    color: COL.textPri,
                    fontSize: 18,
                    fontFamily: FONT_UI,
                    lineHeight: 1.6,
                  }}
                >
                  直接引用，同一数据
                  <br />
                  修改影响原数组
                  <br />
                  <span style={{ color: COL.textWeak, fontSize: 16 }}>
                    适用于：需要修改数据
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </Sequence>
    </AbsoluteFill>
  );
};