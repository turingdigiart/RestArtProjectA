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

const Num = ({ children }: { children: React.ReactNode }) => (
  <span style={{ color: COL.literal }}>{children}</span>
);

const Punc = ({ children }: { children: React.ReactNode }) => (
  <span style={{ color: COL.textDefault }}>{children}</span>
);

// 代码片段包装器 - 用于在激活时显示边框高亮
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

// 代码行包装器 - 用于整行高亮
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
        marginBottom: 3,
        padding: active ? "4px 10px" : "0",
        backgroundColor: active ? `${color}20` : "transparent",
        border: active ? `2px solid ${color}` : "2px solid transparent",
        borderRadius: 4,
        display: "inline-block",
        transition: "all 0.4s ease",
      }}
    >
      {children}
    </div>
  );
};

// 编号式解释卡片 - 快速 12 帧渐变
const NumberedCard: React.FC<{
  index: number;
  title: string;
  content: string;
  color: string;
  startFrame: number;
  duration?: number;
}> = ({ index, title, content, color, startFrame, duration = 12 }) => {
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
  const translateY = isBefore ? 15 : (1 - progress) * 15;
  const scale = isBefore ? 0.92 : 0.92 + progress * 0.08;

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${translateY}px) scale(${scale})`,
        display: "flex",
        alignItems: "center",
        gap: 18,
        padding: "12px 24px",
        backgroundColor: `${color}15`,
        border: `2px solid ${color}80`,
        borderRadius: 10,
        width: 620,
        boxShadow: progress > 0.5 ? `0 0 24px ${color}40` : "none",
      }}
    >
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: "50%",
          backgroundColor: color,
          color: "#000",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 24,
          fontWeight: "bold",
          fontFamily: FONT_UI,
          flexShrink: 0,
        }}
      >
        {index}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <div
          style={{
            color,
            fontSize: 24,
            fontWeight: "bold",
            fontFamily: FONT_UI,
          }}
        >
          {title}
        </div>
        <div
          style={{
            color: COL.textPri,
            fontSize: 20,
            lineHeight: 1.4,
            fontFamily: FONT_UI,
          }}
        >
          {content}
        </div>
      </div>
    </div>
  );
};

export const ForeachStructureDemo: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const TOTAL_FRAMES = durationInFrames; // 360

  // 时间轴 - 4 个阶段（紧凑节奏，每张间隔 60 帧 ≈ 2 秒）
  const SEQ = {
    code: { from: 0, duration: TOTAL_FRAMES },
    part1: { from: 20, duration: TOTAL_FRAMES - 20 },     // for 关键字
    part2: { from: 80, duration: TOTAL_FRAMES - 80 },     // 元素变量
    part3: { from: 140, duration: TOTAL_FRAMES - 140 },   // 数组/容器
    part4: { from: 200, duration: TOTAL_FRAMES - 200 },   // 循环体
  };

  // 当前激活的部分
  const activePart =
    frame >= SEQ.part4.from ? 4 :
    frame >= SEQ.part3.from ? 3 :
    frame >= SEQ.part2.from ? 2 :
    frame >= SEQ.part1.from ? 1 : 0;

  // 颜色映射
  const C = [
    COL.textDefault,
    COL.keyword,   // 1 - for
    COL.enumName,  // 2 - 元素变量
    COL.variable,  // 3 - 数组
    COL.literal,   // 4 - 循环体
  ];

  // 代码框淡入
  const codeOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={backgroundStyle}>
      {/* === 代码框（中部） === */}
      <Sequence
        from={SEQ.code.from}
        durationInFrames={SEQ.code.duration}
        style={{
          translate: "0px 172px"
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
          }}
        >
          <CodeFrame filename="foreach.cpp">
            {/* for (元素变量 : 数组) { 循环体 } */}
            <div style={{ marginBottom: 4 }}>
              <Kw>for</Kw> <Punc>(</Punc>
              <CodePart active={activePart === 2} color={C[2]}>
                <Type>int</Type> <Id>item</Id>
              </CodePart>
              <Punc> : </Punc>
              <CodePart active={activePart === 3} color={C[3]}>
                <Id>arr</Id>
              </CodePart>
              <Punc>) {"{"}</Punc>
            </div>

            {/* 循环体 */}
            <CodeLine active={activePart === 4} color={C[4]} indent={32}>
              <Id>std</Id>
              <Punc>::</Punc>
              <Id>cout</Id> <Punc>&lt;&lt; </Punc>
              <Id>item</Id>{" "}
              <Punc>&lt;&lt; </Punc>
              <Id>std</Id>
              <Punc>::</Punc>
              <Id>endl</Id>
              <Punc>;</Punc>
            </CodeLine>

            <div>
              <Punc>{"}"}</Punc>
            </div>
          </CodeFrame>
        </div>
      </Sequence>
      {/* === 底部：4 张编号卡片（2x2 网格） === */}
      <Sequence
        from={SEQ.part1.from}
        durationInFrames={TOTAL_FRAMES - 20}
        style={{
          translate: "0px -91.5px"
        }}>
        <div
          style={{
            position: "absolute",
            top: 700,
            left: 0,
            right: 0,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            justifyContent: "center",
            gap: "16px 32px",
            padding: "0 120px",
            maxWidth: 1500,
            margin: "0 auto",
          }}
        >
          <div style={{ justifySelf: "end" }}>
            <NumberedCard
              index={1}
              title="for 关键字"
              content="C++11 起的范围 for 循环"
              color={C[1]}
              startFrame={SEQ.part1.from}
            />
          </div>
          <div style={{ justifySelf: "start" }}>
            <NumberedCard
              index={2}
              title="元素变量"
              content="依次代表容器中的每个元素"
              color={C[2]}
              startFrame={SEQ.part2.from}
            />
          </div>
          <div style={{ justifySelf: "end" }}>
            <NumberedCard
              index={3}
              title="数组 / 容器"
              content="冒号后面是要遍历的对象"
              color={C[3]}
              startFrame={SEQ.part3.from}
            />
          </div>
          <div style={{ justifySelf: "start" }}>
            <NumberedCard
              index={4}
              title="循环体"
              content="花括号内对每个元素执行一遍"
              color={C[4]}
              startFrame={SEQ.part4.from}
            />
          </div>
        </div>
      </Sequence>
    </AbsoluteFill>
  );
};