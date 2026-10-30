import React from "react";
import { codeFrameStyles, COL, FONT_CODE, FONT_UI } from "../styles";

interface CodeDisplayProps {
  code: string;
  language?: string;
  highlightLines?: number[];
  filename?: string;
}

/**
 * 代码展示组件
 * 使用 VS Code Dark+ 主题展示代码示例
 */
export const CodeDisplay: React.FC<CodeDisplayProps> = ({
  code,
  language = "cpp",
  highlightLines = [],
  filename = "example.cpp",
}) => {
  const lines = code.split('\n');

  // 简单的语法高亮函数
  const highlightSyntax = (line: string): JSX.Element => {
    let highlighted = line;

    // 关键字高亮
    const keywords = ["for", "int", "auto", "const", "if", "else", "while", "return", "void", "bool", "char"];
    keywords.forEach(keyword => {
      const regex = new RegExp(`\\b${keyword}\\b`, "g");
      highlighted = highlighted.replace(
        regex,
        `<span style="color: ${COL.keyword}">${keyword}</span>`
      );
    });

    // 类型高亮
    const types = ["string", "vector", "array"];
    types.forEach(type => {
      const regex = new RegExp(`\\b${type}\\b`, "g");
      highlighted = highlighted.replace(
        regex,
        `<span style="color: ${COL.type}">${type}</span>`
      );
    });

    // 高亮注释
    highlighted = highlighted.replace(
      /(\/\/.*$)/g,
      `<span style="color: ${COL.textWeak}">$1</span>`
    );

    // 高亮数字
    highlighted = highlighted.replace(
      /\b(\d+)\b/g,
      `<span style="color: ${COL.literal}">$1</span>`
    );

    // 高亮字符串（简单处理）
    highlighted = highlighted.replace(
      /"([^"]*)"/g,
      `<span style="color: ${COL.enumName}">"$1"</span>`
    );

    return <span dangerouslySetInnerHTML={{ __html: highlighted }} />;
  };

  return (
    <div style={{ ...codeFrameStyles.container, margin: "20px auto" }}>
      {/* 标题栏 */}
      <div style={codeFrameStyles.titleBar}>
        {/* 文件标签 */}
        <div style={codeFrameStyles.tab}>
          {filename}
        </div>

        {/* 窗口控制按钮 */}
        <div style={codeFrameStyles.controlsRow}>
          <div
            style={{
              ...codeFrameStyles.controlDot,
              backgroundColor: COL.ctrlClose,
            }}
          />
          <div
            style={{
              ...codeFrameStyles.controlDot,
              backgroundColor: COL.ctrlMin,
            }}
          />
          <div
            style={{
              ...codeFrameStyles.controlDot,
              backgroundColor: COL.ctrlMax,
            }}
          />
        </div>
      </div>

      {/* 代码内容 */}
      <div style={codeFrameStyles.content}>
        {lines.map((line, i) => (
          <div
            key={i}
            style={{
              backgroundColor: highlightLines.includes(i)
                ? "rgba(78, 201, 176, 0.15)"
                : "transparent",
              padding: "4px 8px",
              borderRadius: 4,
              margin: "2px 0",
              borderLeft: highlightLines.includes(i)
                ? `3px solid ${COL.type}`
                : "3px solid transparent",
            }}
          >
            {/* 行号 */}
            <span
              style={{
                color: COL.textWeak,
                marginRight: 16,
                userSelect: "none",
                opacity: 0.6,
              }}
            >
              {i + 1}
            </span>

            {/* 高亮箭头 */}
            {highlightLines.includes(i) && (
              <span
                style={{
                  color: COL.keyword,
                  marginRight: 8,
                }}
              >
                →
              </span>
            )}

            {/* 代码内容 */}
            {highlightSyntax(line)}
          </div>
        ))}
      </div>
    </div>
  );
};