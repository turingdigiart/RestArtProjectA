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
  codeFrameStyles,
  backgroundStyle,
  FONT_UI,
  FONT_CODE,
} from "./styles";

// CodeFrame 组件
const CodeFrame: React.FC<{
  filename?: string;
  children: React.ReactNode;
}> = ({ filename = "main.cpp", children }) => {
  const s = codeFrameStyles;
  return (
    <div style={s.container}>
      <div style={s.titleBar}>
        <div style={s.tab}>{filename}</div>
        <div style={s.controlsRow}>
          <div style={{ ...s.controlDot, backgroundColor: COL.ctrlClose }} />
          <div style={{ ...s.controlDot, backgroundColor: COL.ctrlMin }} />
          <div style={{ ...s.controlDot, backgroundColor: COL.ctrlMax }} />
        </div>
      </div>
      <div style={s.content}>{children}</div>
    </div>
  );
};

// 语法高亮组件
const Kw = ({ children }: { children: React.ReactNode }) => (
  <span style={{ color: COL.keyword, fontWeight: "bold" }}>{children}</span>
);

const Type = ({ children }: { children: React.ReactNode }) => (
  <span style={{ color: COL.type }}>{children}</span>
);

const Id = ({ children }: { children: React.ReactNode }) => (
  <span style={{ color: COL.variable }}>{children}</span>
);

const Str = ({ children }: { children: React.ReactNode }) => (
  <span style={{ color: "#ce9178" }}>{children}</span>
);

const Punc = ({ children }: { children: React.ReactNode }) => (
  <span style={{ color: COL.default }}>{children}</span>
);

// 代码片段包装器 - 用于高亮显示
const CodePart: React.FC<{
  children: React.ReactNode;
  active: boolean;
  color: string;
}> = ({ children, active, color }) => {
  return (
    <span
      style={{
        display: "inline-block",
        padding: active ? "2px 8px" : "0",
        margin: active ? "0 -4px" : "0",
        backgroundColor: active ? `${color}25` : "transparent",
        border: active ? `2px solid ${color}` : "2px solid transparent",
        borderRadius: 4,
        transition: "all 0.4s ease",
      }}
    >
      {children}
    </span>
  );
};

// 高亮缺失/问题代码 - 用红色边框
const MissingBreak: React.FC<{
  visible: boolean;
}> = ({ visible }) => {
  return (
    <span
      style={{
        display: "inline-block",
        padding: visible ? "2px 8px" : "0",
        margin: visible ? "0 -4px" : "0",
        backgroundColor: visible ? `${COL.warning}25` : "transparent",
        border: visible ? `2px solid ${COL.warning}` : "2px solid transparent",
        borderRadius: 4,
        position: "relative",
        transition: "all 0.4s ease",
      }}
    >
      {/* 故意不写 break - 显示为缺口 */}
      <span
        style={{
          color: COL.warning,
          fontWeight: "bold",
          fontStyle: "italic",
        }}
      >
        ✗ break 缺失
      </span>
    </span>
  );
};

// 代码行包装器
const CodeLine: React.FC<{
  children: React.ReactNode;
  active: boolean;
  color: string;
  indent?: number;
}> = ({ children, active, color, indent = 32 }) => {
  return (
    <div
      style={{
        marginLeft: indent,
        marginBottom: 2,
        padding: active ? "4px 10px" : "0",
        backgroundColor: active ? `${color}20` : "transparent",
        border: active ? `2px solid ${color}` : "2px solid transparent",
        borderRadius: 4,
        transition: "all 0.4s ease",
      }}
    >
      {children}
    </div>
  );
};

// 代码执行行 - 带 ▶ 指示箭头 + 当前行高亮
const ExecLine: React.FC<{
  children: React.ReactNode;
  active: boolean;       // 是否是当前正在执行的行
  color: string;
  indent?: number;
  warning?: boolean;     // 警告样式（缺失 break）
  error?: boolean;       // 错误样式（fallthrough）
  dimmed?: boolean;      // 暗淡样式（不会执行到的行）
}> = ({ children, active, color, indent = 32, warning, error, dimmed }) => {
  // 箭头位置：根据当前 phase 的 line 计算
  return (
    <div
      style={{
        marginLeft: indent,
        marginBottom: 2,
        paddingLeft: 32,             // 给箭头留位置
        paddingRight: 12,
        paddingTop: 4,
        paddingBottom: 4,
        position: "relative",
        backgroundColor: active
          ? warning
            ? "rgba(255,82,82,0.30)"
            : error
            ? "rgba(255,82,82,0.30)"
            : `${color}30`
          : dimmed
          ? "rgba(255,255,255,0.02)"
          : "transparent",
        borderLeft: active
          ? `3px solid ${warning || error ? "#ff5252" : color}`
          : "3px solid transparent",
        borderRadius: 4,
        opacity: dimmed && !active ? 0.4 : 1,
        transition: "all 0.3s ease",
      }}
    >
      {active && (
        <span
          style={{
            position: "absolute",
            left: 8,
            top: "50%",
            transform: "translateY(-50%)",
            color: warning || error ? "#ff5252" : color,
            fontSize: 18,
            fontWeight: "bold",
            fontFamily: "Consolas, monospace",
            textShadow: `0 0 8px ${warning || error ? "#ff5252" : color}`,
          }}
        >
          ▶
        </span>
      )}
      {active && (
        <span
          style={{
            position: "absolute",
            right: 8,
            top: "50%",
            transform: "translateY(-50%)",
            color: warning || error ? "#ff5252" : color,
            fontSize: 11,
            fontFamily: FONT_UI,
            fontWeight: "bold",
            backgroundColor: "rgba(0,0,0,0.6)",
            padding: "2px 6px",
            borderRadius: 3,
            letterSpacing: 1,
          }}
        >
          {warning ? "BUG" : "EXECUTING"}
        </span>
      )}
      {children}
    </div>
  );
};

// 输出行组件 - 改进：增强字体可读性
const OutputLine: React.FC<{
  text: string;
  visible: boolean;
  highlight?: boolean;
}> = ({ text, visible, highlight }) => {
  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(-20px)",
        transition: "all 0.4s ease",
        color: highlight ? "#ffeb3b" : "#ffffff",  // 白色更清楚，高亮用亮黄
        fontFamily: "Consolas, Courier New, monospace",
        fontSize: 22,
        padding: "10px 16px",
        marginBottom: 8,
        backgroundColor: highlight ? "rgba(231,76,60,0.25)" : "#2a2a2a",  // 行间对比
        borderLeft: highlight ? `4px solid #ff5252` : `4px solid #4ec9b0`,
        borderRadius: 4,
        minHeight: 40,
        fontWeight: highlight ? "bold" : "normal",
      }}
    >
      <span style={{ color: "#888", marginRight: 8, fontWeight: "bold" }}>$</span>
      {text || (visible ? "..." : "")}
    </div>
  );
};

// 警告提示卡片
const WarningCard: React.FC<{
  title: string;
  description: string;
  visible: boolean;
  delay?: number;
}> = ({ title, description, visible, delay = 0 }) => {
  const frame = useCurrentFrame();
  const localFrame = frame - delay;

  const progress = interpolate(
    Math.max(0, Math.min(localFrame, 20)),
    [0, 20],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  if (!visible) return null;

  // 脉冲发光效果
  const pulse = Math.sin(frame * 0.15) * 0.5 + 0.5;  // 0~1 之间循环

  return (
    <div
      style={{
        opacity: progress,
        transform: `scale(${0.85 + progress * 0.15})`,
        padding: "20px 28px",
        // 更鲜艳的红色背景
        backgroundColor: "rgba(255,82,82,0.25)",
        // 3px 粗边框 + 强光晕
        border: `3px solid #ff5252`,
        borderRadius: 10,
        maxWidth: 540,
        marginTop: 16,
        // 发光效果（脉冲呼吸）
        boxShadow: `0 0 ${30 + pulse * 20}px rgba(255,82,82,${0.4 + pulse * 0.4}), inset 0 0 20px rgba(255,82,82,${0.1 + pulse * 0.1})`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* 左上角条纹警告标识 */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          backgroundColor: "#ff5252",
          color: "#000",
          padding: "4px 12px",
          fontSize: 14,
          fontWeight: "bold",
          fontFamily: FONT_UI,
          letterSpacing: 2,
          borderBottomRightRadius: 6,
        }}
      >
        ⚠ BUG
      </div>

      {/* 标题 */}
      <div
        style={{
          color: "#ffeb3b",
          fontSize: 26,
          fontWeight: "bold",
          fontFamily: FONT_UI,
          marginBottom: 8,
          marginTop: 30,  // 给 BUG 标签让出空间
          textShadow: "0 0 8px rgba(255,82,82,0.8)",
        }}
      >
        ⚠ {title}
      </div>

      {/* 描述 */}
      <div
        style={{
          color: "#ffffff",
          fontSize: 19,
          fontFamily: FONT_UI,
          lineHeight: 1.6,
        }}
      >
        {description}
      </div>

      {/* 关键提示：知道怎么修复 */}
      <div
        style={{
          marginTop: 14,
          padding: "10px 14px",
          backgroundColor: "rgba(0,0,0,0.4)",
          borderLeft: `3px solid #ffeb3b`,
          borderRadius: 4,
          color: "#ffeb3b",
          fontSize: 17,
          fontFamily: FONT_UI,
          fontWeight: "bold",
        }}
      >
        💡 修复方法：每个 case 末尾都加上 <code style={{ color: "#ffffff" }}>break;</code>
      </div>
    </div>
  );
};

export const SwitchFallthroughDemo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 时间轴（16秒，480帧）
  // 0-60: 代码展示
  // 60-150: projState = stopped 高亮（赋值）
  // 150-220: 进入 switch，执行 case stopped 的 cout
  // 220-280: ⚠ 没有 break → fallthrough 到 case blocked
  // 280-340: case blocked 的 cout 也被执行
  // 340-420: 显示错误结果（两行输出）+ 警告
  // 420-480: 总结

  // 时间轴 - 紧凑节奏：每阶段之间间隔 30 帧 = 1 秒
  const SEQ = {
    code: { from: 0, duration: 330 },
    showState: { from: 30, duration: 40 },          // projState = stopped 高亮
    matchCase: { from: 70, duration: 40 },          // 匹配 case stopped
    output1: { from: 110, duration: 30 },           // 输出第一行
    fallthrough: { from: 140, duration: 50 },      // fallthrough 演示
    output2: { from: 190, duration: 30 },           // 输出第二行（不应该的）
    showError: { from: 220, duration: 110 },        // 显示错误结果
  };

  // 当前激活的部分（用于高亮代码）
  const phase =
    frame >= SEQ.showError.from ? "showError" :
    frame >= SEQ.output2.from ? "output2" :
    frame >= SEQ.fallthrough.from ? "fallthrough" :
    frame >= SEQ.output1.from ? "output1" :
    frame >= SEQ.matchCase.from ? "matchCase" :
    frame >= SEQ.showState.from ? "showState" :
    "initial";

  // 各阶段判断
  const showState = phase === "showState" || phase === "matchCase" || phase === "output1" || phase === "fallthrough" || phase === "output2" || phase === "showError";
  const matchCase = phase !== "initial" && phase !== "showState";
  const showOutput1 = phase !== "initial" && phase !== "showState" && phase !== "matchCase";
  const showFallthrough = phase === "fallthrough" || phase === "output2" || phase === "showError";
  const showOutput2 = phase === "output2" || phase === "showError";
  const showWarning = phase === "showError";

  // 当前正在执行的代码行（用于指示箭头）
  // showState: projState 赋值行
  // matchCase: case stopped 行
  // output1: stopped 的 cout 行
  // fallthrough: 缺失 break 提示行
  // output2: blocked 的 cout 行
  const currentLine =
    phase === "showState" ? "line_state" :
    phase === "matchCase" ? "line_case" :
    phase === "output1" ? "line_cout1" :
    phase === "fallthrough" ? "line_missing" :
    phase === "output2" ? "line_cout2" :
    phase === "showError" ? "line_cout2" :
    null;

  // 颜色映射 - 每步用不同颜色以示区分
  const C = {
    state: "#dcdcaa",       // 黄色（projState 赋值 - VS Code 参数/变量类）
    case: COL.keyword,      // 蓝色（case 匹配 - 关键字）
    cout: COL.type,         // 青色（cout 输出 - 类型）
    break: COL.warning,     // 红色（break 警告）
    extra: COL.warning,     // 红色（穿透后的额外输出）
  };

  return (
    <AbsoluteFill style={backgroundStyle}>
      {/* === 代码框（左侧，贯穿始终） === */}
      <Sequence
        from={SEQ.code.from}
        durationInFrames={SEQ.code.duration}
        style={{
          translate: "69.4px 39.6px"
        }}>
        <div
          style={{
            position: "absolute",
            top: 60,
            left: 40,
            opacity: interpolate(frame, [0, 30], [0, 1], {
              extrapolateRight: "clamp",
            }),
          }}
        >
          <CodeFrame filename="bug.cpp">
            {/* 使用绝对定位的代码 + 执行箭头层叠 */}
            <div style={{ position: "relative" }}>
              {/* enum 定义（一行概括） */}
              <div style={{ marginBottom: 12 }}>
                <Kw>enum</Kw> <Id>ProjectState</Id> <Punc>{"{"} </Punc>
                <Id>none</Id>
                <Punc>, </Punc>
                <Id>developing</Id>
                <Punc>, </Punc>
                <Id>stopped</Id>
                <Punc>, </Punc>
                <Id>blocked</Id>
                <Punc>, </Punc>
                <Punc>... </Punc>
                <Punc>{"}"}</Punc>
                <Punc>;</Punc>
              </div>

              <div>
                <Type>int</Type> <Kw>main</Kw>
                <Punc>() {"{"}</Punc>
              </div>

              {/* projState = stopped - 行 1 */}
              <ExecLine
                active={currentLine === "line_state"}
                color={C.state}
                indent={32}
                extra=""  // 不加 arrow 到右边
              >
                <Id>ProjectState</Id> <Id>projState</Id> <Punc>= </Punc>
                <CodePart active={showState} color={C.state}>
                  <Id>stopped</Id>
                </CodePart>
                <Punc>;</Punc>
              </ExecLine>

              {/* switch (projState) - 始终展示，不标记 */}
              <div style={{ marginLeft: 32, marginBottom: 6 }}>
                <Kw>switch</Kw> <Punc>(</Punc>
                <CodePart active={matchCase} color={C.state}>
                  <Id>projState</Id>
                </CodePart>
                <Punc>) {"{"}</Punc>
              </div>

              {/* case stopped - 行 2 */}
              <ExecLine
                active={currentLine === "line_case"}
                color={COL.keyword}
                indent={64}
              >
                <Kw>case</Kw>{" "}
                <CodePart active={matchCase} color={C.case}>
                  <Id>stopped</Id>
                </CodePart>
                <Punc>:</Punc>
              </ExecLine>

              {/* stopped 的 cout - 行 3 */}
              <ExecLine
                active={currentLine === "line_cout1"}
                color={C.cout}
                indent={96}
              >
                <Id>std</Id>
                <Punc>::</Punc>
                <Id>cout</Id> <Punc>&lt;&lt; </Punc>
                <Str>"The project is stopped."</Str>
                <Punc> &lt;&lt; </Punc>
                <Id>std</Id>
                <Punc>::</Punc>
                <Id>endl</Id>
                <Punc>;</Punc>
              </ExecLine>

              {/* 缺失 break - 行 4 */}
              <ExecLine
                active={currentLine === "line_missing"}
                color={COL.warning}
                indent={96}
                warning
              >
                [break 缺失]
              </ExecLine>

              {/* case blocked - 始终展示，被 fallthrough 命中时颜色更红 */}
              <ExecLine
                active={currentLine === "line_cout2"}
                color={C.extra}
                indent={64}
                error={showFallthrough}
              >
                <Kw>case</Kw>{" "}
                <CodePart active={showFallthrough} color={C.extra}>
                  <Id>blocked</Id>
                </CodePart>
                <Punc>:</Punc>
              </ExecLine>

              {/* blocked 的 cout - 行 6 */}
              <ExecLine
                active={currentLine === "line_cout2"}
                color={C.extra}
                indent={96}
                error
              >
                <Id>std</Id>
                <Punc>::</Punc>
                <Id>cout</Id> <Punc>&lt;&lt; </Punc>
                <Str>"The project is blocked."</Str>
                <Punc> &lt;&lt; </Punc>
                <Id>std</Id>
                <Punc>::</Punc>
                <Id>endl</Id>
                <Punc>;</Punc>
              </ExecLine>

              {/* blocked 的 break (不会执行) */}
              <ExecLine
                active={false}
                color={COL.warning}
                indent={96}
                dimmed
              >
                <Kw>break</Kw>
                <Punc>;</Punc>
              </ExecLine>

              {/* 后续 case 用 ... 表示 */}
              <div style={{ marginLeft: 64, color: COL.textWeak }}>...</div>

              <div style={{ marginLeft: 32 }}>
                <Punc>{"}"}</Punc>
              </div>
              <div>
                <Punc>{"}"}</Punc>
              </div>
            </div>
          </CodeFrame>
        </div>
      </Sequence>
      {/* === 右侧：执行步骤（从上到下依次添加） === */}
      <Sequence
        from={-86}
        durationInFrames={420}
        style={{
          translate: "-69.5px -39.6px"
        }}>
        <div
          style={{
            position: "absolute",
            top: 100,
            right: 40,
            width: 600,
          }}
        >
          {/* 标题 */}
          <div
            style={{
              color: COL.textWeak,
              fontSize: 18,
              fontFamily: FONT_UI,
              marginBottom: 12,
              letterSpacing: 1,
            }}
          >
            执行流程
          </div>

          {/* 步骤1：projState = stopped - 领先两个阶段 */}
          <Step
            index={1}
            text="projState = stopped"
            color={C.state}
            startFrame={SEQ.output1.from}
          />

          {/* 步骤2：匹配 case stopped */}
          <Step
            index={2}
            text="匹配 case stopped"
            color={COL.keyword}
            startFrame={SEQ.fallthrough.from}
          />

          {/* 步骤3：执行第一行 cout */}
          <Step
            index={3}
            text={'执行 cout 输出 "The project is stopped."'}
            color={C.cout}
            startFrame={SEQ.output2.from}
          />

          {/* 步骤4：发现没有 break！*/}
          <Step
            index={4}
            text="⚠ 没有 break，继续向下执行"
            color={COL.warning}
            startFrame={SEQ.showError.from}
            warning
          />

          {/* 步骤5：穿透到 case blocked */}
          <Step
            index={5}
            text={'错误执行 cout 输出 "The project is blocked."'}
            color={C.extra}
            startFrame={SEQ.showError.from}
            error
          />

          {/* === 下方：终端输出（独立展示） === */}
          <div
            style={{
              marginTop: 24,
              backgroundColor: "#0d0d0d",  // 更暗的外层背景
              border: `1px solid #4ec9b0`,
              borderRadius: 8,
              padding: 16,
              minHeight: 140,
              opacity: interpolate(frame, [SEQ.output1.from - 10, SEQ.output1.from + 10], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            <div
              style={{
                color: "#4ec9b0",
                fontSize: 16,
                fontFamily: FONT_UI,
                marginBottom: 12,
                letterSpacing: 1,
                fontWeight: "bold",
              }}
            >
              ▶ 终端输出
            </div>
            <OutputLine text='The project is stopped.' visible={showOutput1} />
            <OutputLine text='The project is blocked.' visible={showOutput2} highlight />
          </div>

          {/* 警告 */}
          <WarningCard
            title="缺少 break 导致 fall-through"
            description="case stopped 缺少 break，程序继续执行下面 case blocked 中的代码，造成意料之外的输出。"
            visible={showWarning}
            delay={SEQ.showError.from}
          />
        </div>
      </Sequence>
    </AbsoluteFill>
  );
};

// 单个步骤组件 - 从上方滑入 + 渐显
const Step: React.FC<{
  index: number;
  text: string;
  color: string;
  startFrame: number;
  duration?: number;
  warning?: boolean;
  error?: boolean;
}> = ({ index, text, color, startFrame, duration = 12, warning, error }) => {
  const frame = useCurrentFrame();
  const localFrame = frame - startFrame;

  const progress = interpolate(
    Math.max(0, Math.min(localFrame, duration)),
    [0, duration],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const isBefore = frame < startFrame;
  const opacity = isBefore ? 0 : progress;
  const translateY = isBefore ? -10 : (1 - progress) * -10;
  const scale = isBefore ? 0.95 : 0.95 + progress * 0.05;

  // 当前正在进行的步骤高亮
  const isCurrent =
    frame >= startFrame &&
    frame < startFrame + 40;

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${translateY}px) scale(${scale})`,
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "12px 16px",
        marginBottom: 10,
        backgroundColor: warning
          ? "rgba(231,76,60,0.20)"
          : error
          ? "rgba(231,76,60,0.30)"
          : isCurrent
          ? "rgba(86,156,214,0.30)"   // 更亮的当前背景
          : "rgba(255,255,255,0.06)", // 已完成步骤也保持轻微可见
        border: `2px solid ${
          warning || error
            ? "#ff5252"
            : isCurrent
            ? color
            : `${color}80`  // 已完成步骤边框更明显
        }`,
        borderRadius: 8,
        transition: "all 0.3s ease",
        boxShadow: isCurrent ? `0 0 20px ${color}80` : "none",
      }}
    >
      <div
        style={{
          width: 34,
          height: 34,
          borderRadius: "50%",
          backgroundColor: warning || error ? "#ff5252" : color,
          color: "#000",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 18,
          fontWeight: "bold",
          fontFamily: FONT_UI,
          flexShrink: 0,
        }}
      >
        {warning || error ? "⚠" : index}
      </div>
      <div
        style={{
          color: warning || error ? "#ffeb3b" : isCurrent ? "#ffffff" : "#e0e0e0",
          fontSize: 19,
          fontFamily: FONT_UI,
          fontWeight: warning || error || isCurrent ? "bold" : "normal",
        }}
      >
        {text}
      </div>
    </div>
  );
};