import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Sequence,
} from "remotion";

// 🎨 官方设计规范 v2.0 - VS Code Dark+ Theme + 鲜艳窗口控件
const COLORS = {
  backgroundTop: "#000000",
  backgroundMiddle: "#1a1a1a",
  backgroundBottom: "#2d2d30",
  textPrimary: "#d4d4d4",
  textSecondary: "#9cdcfe",
  textWeak: "#5a5a5a",
  textTitle: "#ffffff",
  keyword: "#569cd6",
  type: "#4ec9b0",
  variable: "#9cdcfe",
  number: "#b5cea8",
  operator: "#d4d4d4",
  punctuation: "#d4d4d4",
  border: "#3c3c3c",
  borderActive: "#569cd6",
  borderFocus: "#007acc",
  scanning: "#4ec9b0",
  matched: "#f1c40f",
  unmatched: "#2d2d30",
  warning: "#e74c3c",
  info: "#569cd6",

  // 代码框专用（v2.0 规范）
  codeFrameBg: "#1e1e1e",     // 代码框内容背景 - 比父背景更深
  titleBarBg: "#252526",
  titleBarActive: "#007acc",   // Tab 顶部蓝条

  // MG 风格窗口控件 - 鲜艳的红/橙/绿
  controlClose: "#ff5f56",
  controlMinimize: "#ffbd2e",
  controlMaximize: "#27ca3f",
};

const CODE_FRAME = {
  maxWidth: "1200px",
  borderRadius: 8,
  border: `1px solid ${COLORS.border}`,
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
  titleBarPadding: "8px 16px",
  tabPadding: "6px 16px",
  codePadding: "24px 32px",
  codeFontSize: 26,
  codeLineHeight: 1.8,
};

const GRID_BOX = {
  size: 100,
  gap: 20,
  borderWidth: 3,
  borderColor: COLORS.borderActive,
  borderRadius: 12,
  fontSize: 42,
  shadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
  shadowScanning: "0 0 25px rgba(78, 201, 176, 0.9)",
};

const FONT_UI = '"Microsoft YaHei", "微软雅黑", Arial, sans-serif';

// VS Code 风格代码框 v2.0 - 与 styles-v2.ts 一致
const CodeFrame: React.FC<{
  filename?: string;
  children: React.ReactNode;
}> = ({ filename = "main.cpp", children }) => {
  return (
    <div
      style={{
        backgroundColor: COLORS.codeFrameBg,
        border: CODE_FRAME.border,
        borderRadius: CODE_FRAME.borderRadius,
        boxShadow: CODE_FRAME.boxShadow,
        overflow: "hidden",
        width: "100%",
        maxWidth: CODE_FRAME.maxWidth,
      }}
    >
      {/* 标题栏 */}
      <div
        style={{
          backgroundColor: COLORS.titleBarBg,
          borderBottom: `1px solid ${COLORS.border}`,
          padding: CODE_FRAME.titleBarPadding,
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        {/* Tab 标签 - VS Code 风格 + 顶部蓝条 */}
        <div
          style={{
            backgroundColor: COLORS.codeFrameBg,
            padding: CODE_FRAME.tabPadding,
            borderRadius: 4,
            fontSize: 14,
            color: COLORS.textPrimary,
            borderTop: `2px solid ${COLORS.titleBarActive}`,
            fontFamily: FONT_UI,
          }}
        >
          {filename}
        </div>

        {/* 窗口控件 - MG鲜艳风格 */}
        <div
          style={{
            marginLeft: "auto",
            display: "flex",
            gap: 8,
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              backgroundColor: COLORS.controlClose,
            }}
          />
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              backgroundColor: COLORS.controlMinimize,
            }}
          />
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              backgroundColor: COLORS.controlMaximize,
            }}
          />
        </div>
      </div>

      {/* 代码内容 */}
      <div
        style={{
          padding: CODE_FRAME.codePadding,
          fontFamily: 'Consolas, "Courier New", monospace',
          fontSize: CODE_FRAME.codeFontSize,
          lineHeight: CODE_FRAME.codeLineHeight,
          backgroundColor: COLORS.codeFrameBg,
          color: COLORS.textPrimary,
        }}
      >
        {children}
      </div>
    </div>
  );
};

const SyntaxHighlight: React.FC<{
  type:
    | "keyword"
    | "type"
    | "variable"
    | "number"
    | "operator"
    | "punctuation";
  children: React.ReactNode;
  highlight?: boolean;
}> = ({ type, children, highlight = false }) => {
  const color = COLORS[type];
  return (
    <span
      style={{
        color,
        fontWeight: type === "keyword" ? "bold" : "normal",
        backgroundColor: highlight ? `${color}20` : "transparent",
        padding: highlight ? "2px 6px" : "0",
        borderRadius: highlight ? 4 : 0,
        border: highlight ? `2px solid ${color}` : "none",
        transition: "all 0.3s ease",
      }}
    >
      {children}
    </span>
  );
};

// 循环执行可视化组件
const LoopExecution: React.FC<{
  iteration: number;
  totalIterations: number;
}> = ({ iteration, totalIterations }) => {
  if (iteration < 0) return null;

  // 是否已到达最后一帧（完成阶段）
  // 最后一格时再停留一格让它从青色变回黄色
  const isFinished = iteration >= totalIterations;

  return (
    <div
      style={{
        marginTop: 40,
        padding: "40px 60px",
        backgroundColor: `${COLORS.backgroundBottom}50`,
        borderRadius: 12,
        border: `1px solid ${COLORS.border}`,
      }}
    >
      <div
        style={{
          color: COLORS.textWeak,
          fontSize: 28,
          marginBottom: 20,
          fontFamily: FONT_UI,
        }}
      >
        循环执行过程
      </div>

      <div style={{ display: "flex", gap: GRID_BOX.gap, flexWrap: "wrap" }}>
        {Array.from({ length: totalIterations }, (_, i) => {
          // 完成态：所有格子黄色（matched）
          // 扫描态：当前 i 是 iteration → 青色（scanning）
          //         已过的 i < iteration → 黄色
          //         未到的 i > iteration → 深灰色
          const isScanning = !isFinished && i === iteration;
          const isPassed = isFinished || i < iteration;

          let bgColor: string;
          let borderColor: string;
          let shadow: string;

          if (isFinished) {
            // 完成阶段：全部黄色
            bgColor = COLORS.matched;
            borderColor = COLORS.matched;
            shadow = `0 0 20px ${COLORS.matched}80`;
          } else if (isScanning) {
            bgColor = COLORS.scanning;
            borderColor = COLORS.scanning;
            shadow = GRID_BOX.shadowScanning;
          } else if (isPassed) {
            bgColor = COLORS.matched;
            borderColor = COLORS.matched;
            shadow = GRID_BOX.shadow;
          } else {
            bgColor = COLORS.unmatched;
            borderColor = COLORS.borderActive;
            shadow = GRID_BOX.shadow;
          }

          return (
            <div
              key={i}
              style={{
                width: GRID_BOX.size,
                height: GRID_BOX.size,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: GRID_BOX.fontSize,
                fontWeight: "bold",
                borderRadius: GRID_BOX.borderRadius,
                backgroundColor: bgColor,
                color:
                  isPassed || isScanning ? "#000000" : COLORS.textPrimary,
                border: `3px solid ${borderColor}`,
                boxShadow: shadow,
                opacity: isPassed || isScanning ? 1 : 0.3,
                transform: isScanning ? "scale(1.1)" : "scale(1)",
                transition: "all 0.3s ease-out",
              }}
            >
              {i}
            </div>
          );
        })}
      </div>

      <div
        style={{
          marginTop: 20,
          color: isFinished ? COLORS.matched : COLORS.info,
          fontSize: 32,
          fontWeight: "bold",
          fontFamily: FONT_UI,
        }}
      >
        {isFinished ? `循环完成` : `i = ${iteration}`}
      </div>
    </div>
  );
};

const ExplanationText: React.FC<{
  title: string;
  content: string;
  visible: boolean;
  color: string;
  delay: number;
}> = ({ title, content, visible, color, delay }) => {
  const opacity = visible ? 1 : 0;
  const translateY = visible ? 0 : 20;

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${translateY}px)`,
        transition: "all 0.5s ease-out",
        marginBottom: 30,
        transitionDelay: `${delay}ms`,
      }}
    >
      <div
        style={{
          color,
          fontSize: 36,
          fontWeight: "bold",
          marginBottom: 10,
          fontFamily: FONT_UI,
        }}
      >
        {title}
      </div>
      <div
        style={{
          color: COLORS.textPrimary,
          fontSize: 28,
          lineHeight: 1.6,
          fontFamily: FONT_UI,
        }}
      >
        {content}
      </div>
    </div>
  );
};

export const ForLoopFormatDemo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const TOTAL_FRAMES = durationInFrames;
  const TOTAL_ITERATIONS = 5;
  const MAX_INDEX = TOTAL_ITERATIONS - 1;

  const SEQ = {
    codeFrame: { from: 0, duration: TOTAL_FRAMES },
    explanation: { from: 60, duration: TOTAL_FRAMES - 60 },
    loopExecution: { from: 270, duration: TOTAL_FRAMES - 270 },
  };

  const HIGHLIGHT = {
    init: { start: 90, end: 150 },
    condition: { start: 150, end: 210 },
    iter: { start: 210, end: 270 },
  };

  const getActivePart = () => {
    if (frame >= HIGHLIGHT.init.start && frame < HIGHLIGHT.init.end) return 0;
    if (frame >= HIGHLIGHT.condition.start && frame < HIGHLIGHT.condition.end)
      return 1;
    if (frame >= HIGHLIGHT.iter.start && frame < HIGHLIGHT.iter.end) return 2;
    return -1;
  };

  // 当前循环迭代次数
  // 总共有 TOTAL_ITERATIONS 帧迭代（包括扫描和结束停留）
  // 循环演示速度倍率：2 = 两倍速（原来 1 倍速）
  const LOOP_SPEED = 2;

  // 在 elapsed 帧上乘以速度倍率，等效于"以 2 倍速播放"
  const getDisplayIteration = () => {
    if (frame < SEQ.loopExecution.from) return -1;
    const elapsed = frame - SEQ.loopExecution.from;
    const totalLoopsFrames = TOTAL_FRAMES - SEQ.loopExecution.from;

    // 7/8 时间用于扫描，最后 1/8 停留（全部格子变黄色）
    const scanFrames = Math.floor((totalLoopsFrames * 7) / 8);
    const scanFramesPerIter = scanFrames / TOTAL_ITERATIONS;

    // 应用速度倍率：elapsed * LOOP_SPEED 让时间流速更快
    const acceleratedElapsed = elapsed * LOOP_SPEED;
    const iter = Math.floor(acceleratedElapsed / scanFramesPerIter);

    // 达到 TOTAL_ITERATIONS 表示已完成，应将所有格子变成黄色
    if (iter >= TOTAL_ITERATIONS) return TOTAL_ITERATIONS;
    return Math.min(MAX_INDEX, iter);
  };

  const activePart = getActivePart();
  const displayIteration = getDisplayIteration();

  const codeOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: "clamp",
  });

  const codeScale = interpolate(frame, [0, 30], [0.9, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(to bottom,
          ${COLORS.backgroundTop} 0%,
          ${COLORS.backgroundMiddle} 40%,
          ${COLORS.backgroundBottom} 100%
        )`,
        color: COLORS.textPrimary,
        fontFamily: FONT_UI,
      }}
    >
      <Sequence
        from={SEQ.codeFrame.from}
        durationInFrames={SEQ.codeFrame.duration}
        style={{
          translate: "0px 71.2px"
        }}>
        <div
          style={{
            position: "absolute",
            top: 100,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            opacity: codeOpacity,
            transform: `scale(${codeScale})`,
          }}
        >
          <CodeFrame filename="loop.cpp">
            <div>
              <SyntaxHighlight type="keyword">for</SyntaxHighlight>
              <SyntaxHighlight type="punctuation"> (</SyntaxHighlight>
              <SyntaxHighlight
                type="variable"
                highlight={activePart === 0}
              >
                int i = 0
              </SyntaxHighlight>
              <SyntaxHighlight type="punctuation">; </SyntaxHighlight>
              <SyntaxHighlight
                type="variable"
                highlight={activePart === 1}
              >
                i {"<"} 5
              </SyntaxHighlight>
              <SyntaxHighlight type="punctuation">; </SyntaxHighlight>
              <SyntaxHighlight
                type="variable"
                highlight={activePart === 2}
              >
                i++
              </SyntaxHighlight>
              <SyntaxHighlight type="punctuation">) {"{"}</SyntaxHighlight>
              <div style={{ marginLeft: 32, color: COLORS.textWeak }}>
                // 循环体
              </div>
              <SyntaxHighlight type="punctuation">{"}"}</SyntaxHighlight>
            </div>
          </CodeFrame>
        </div>
      </Sequence>
      <Sequence
        from={SEQ.explanation.from}
        durationInFrames={SEQ.explanation.duration}
        style={{
          translate: "0px 71.2px"
        }}>
        <div
          style={{
            position: "absolute",
            top: 450,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            gap: 60,
            padding: "0 80px",
          }}
        >
          <ExplanationText
            title="初始化语句"
            content="循环开始前执行一次"
            visible={frame >= HIGHLIGHT.init.start}
            color={COLORS.keyword}
            delay={0}
          />
          <ExplanationText
            title="循环条件"
            content="每次循环前判断是否执行"
            visible={frame >= HIGHLIGHT.condition.start}
            color={COLORS.type}
            delay={100}
          />
          <ExplanationText
            title="迭代表达式"
            content="每次循环后更新循环变量"
            visible={frame >= HIGHLIGHT.iter.start}
            color={COLORS.number}
            delay={200}
          />
        </div>
      </Sequence>
      <Sequence
        from={SEQ.loopExecution.from}
        durationInFrames={SEQ.loopExecution.duration}
        style={{
          translate: "0px -108.8px"
        }}
        hidden>
        <div
          style={{
            position: "absolute",
            top: 750,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <LoopExecution
            iteration={displayIteration}
            totalIterations={TOTAL_ITERATIONS}
          />
        </div>
      </Sequence>
    </AbsoluteFill>
  );
};