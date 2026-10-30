/**
 * EasyC++ 课程动画设计系统 v2.0
 * 与 for-loop-animation/src/styles-v2.ts 保持一致
 */

// ============================================================
// 🎨 配色方案 (锁定)
// ============================================================
export const COLORS_V2 = {
  // 官方标准背景 - 黑到深灰渐变 (锁定)
  background: {
    top: "#000000",
    middle: "#1a1a1a",
    bottom: "#2d2d30",
  },

  // 代码框 (VS Code 风格)
  codeFrame: {
    background: "#1e1e1e",
    titleBar: "#252526",
    border: "#3c3c3c",
    titleBarActive: "#007acc",
  },

  // MG 风格窗口控件
  windowControls: {
    close: "#ff5f56",
    minimize: "#ffbd2e",
    maximize: "#27ca3f",
  },

  // 文字
  text: {
    primary: "#d4d4d4",
    secondary: "#9cdcfe",
    title: "#ffffff",
  },

  // 语法高亮 (VS Code Dark+)
  syntax: {
    keyword: "#569cd6",
    type: "#4ec9b0",
    variable: "#9cdcfe",
    literal: "#b5cea8",
    operator: "#d4d4d4",
    punctuation: "#d4d4d4",
    default: "#d4d4d4",
  },

  // 状态颜色
  status: {
    scanning: "#4ec9b0",
    matched: "#f1c40f",
    unmatched: "#2d2d30",
    warning: "#e74c3c",
    info: "#569cd6",
  },
};

// ============================================================
// 🌊 背景样式
// ============================================================
export const backgroundStyleV2 = {
  background: `linear-gradient(to bottom,
    ${COLORS_V2.background.top} 0%,
    ${COLORS_V2.background.middle} 40%,
    ${COLORS_V2.background.bottom} 100%
  )`,
  position: "relative" as const,
  overflow: "hidden",
};

// ============================================================
// 🖼️ 代码框样式 (MG 增强版)
// ============================================================
export const codeFrameStyleV2 = {
  container: {
    backgroundColor: COLORS_V2.codeFrame.background,
    border: `1px solid ${COLORS_V2.codeFrame.border}`,
    borderRadius: 8,
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
    overflow: "hidden",
    width: "100%",
    maxWidth: "1200px",
  },

  titleBar: {
    backgroundColor: COLORS_V2.codeFrame.titleBar,
    borderBottom: `1px solid ${COLORS_V2.codeFrame.border}`,
    padding: "8px 16px",
    display: "flex",
    alignItems: "center",
    gap: 8,
  },

  tab: {
    backgroundColor: COLORS_V2.codeFrame.background,
    padding: "6px 16px",
    borderRadius: 4,
    fontSize: 14,
    color: COLORS_V2.text.primary,
    borderTop: `2px solid ${COLORS_V2.codeFrame.titleBarActive}`,
    fontFamily: '"Microsoft YaHei", sans-serif',
  },

  windowControls: {
    container: {
      marginLeft: "auto",
      display: "flex",
      gap: 8,
    },
    button: {
      width: 12,
      height: 12,
      borderRadius: "50%",
    },
    close: {
      backgroundColor: COLORS_V2.windowControls.close,
    },
    minimize: {
      backgroundColor: COLORS_V2.windowControls.minimize,
    },
    maximize: {
      backgroundColor: COLORS_V2.windowControls.maximize,
    },
  },

  content: {
    padding: "24px 32px",
    fontFamily: 'Consolas, "Courier New", monospace',
    fontSize: 26,
    lineHeight: 1.8,
    backgroundColor: COLORS_V2.codeFrame.background,
    color: COLORS_V2.text.primary,
  },
};

// ============================================================
// 🎯 格子样式 (演示元素)
// ============================================================
export const gridBoxStyleV2 = {
  size: 100,
  gap: 20,
  borderWidth: 3,
  borderColor: COLORS_V2.status.info,
  borderRadius: 12,
  fontSize: 42,
  shadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
  shadowScanning: "0 0 25px rgba(78, 201, 176, 0.9)",
};

// ============================================================
// 📝 字体常量
// ============================================================
export const FONTS = {
  ui: '"Microsoft YaHei", "微软雅黑", Arial, sans-serif',
  code: 'Consolas, "Courier New", monospace',
};

// ============================================================
// 🧩 CodeFrame 组件 v2.0 (锁定样式)
// ============================================================
import React from "react";

export const CodeFrame: React.FC<{
  filename?: string;
  children: React.ReactNode;
}> = ({ filename = "main.cpp", children }) => {
  return (
    <div style={codeFrameStyleV2.container}>
      <div style={codeFrameStyleV2.titleBar}>
        <div style={codeFrameStyleV2.tab}>{filename}</div>
        <div style={codeFrameStyleV2.windowControls.container}>
          <div style={{ ...codeFrameStyleV2.windowControls.button, ...codeFrameStyleV2.windowControls.close }} />
          <div style={{ ...codeFrameStyleV2.windowControls.button, ...codeFrameStyleV2.windowControls.minimize }} />
          <div style={{ ...codeFrameStyleV2.windowControls.button, ...codeFrameStyleV2.windowControls.maximize }} />
        </div>
      </div>
      <div style={codeFrameStyleV2.content}>{children}</div>
    </div>
  );
};