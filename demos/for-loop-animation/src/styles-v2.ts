/**
 * EasyC++ 课程动画设计系统 v2.0
 * 重新设计：背景 + 代码框的MG风格
 * 新背景：渐变 + 流线型 + 噪点质感
 * 新代码框：保留VS Code风格，窗口部分更动感
 */

// ============================================================
// 🎨 v2.0 新配色方案
// ============================================================
export const COLORS_V2 = {
  // 官方标准背景 - 黑到深灰渐变 (锁定)
  // 所有 EasyC++ 课程动画必须使用此背景
  // 使用方式: background: `linear-gradient(to bottom, ${BACKGROUND.top} 0%, ${BACKGROUND.middle} 40%, ${BACKGROUND.bottom} 100%)`
  background: {
    top: '#000000',         // 纯黑 - 顶部 (高级、深邃)
    middle: '#1a1a1a',      // 深灰过渡 - 柔和过渡
    bottom: '#2d2d30',      // 深灰底部 - 与代码框背景色衔接
  },

  // 代码框 (保持 VS Code 风格)
  codeFrame: {
    background: '#1e1e1e',
    titleBar: '#252526',
    border: '#3c3c3c',
    titleBarActive: '#007acc',  // VS Code tab 蓝色
  },

  // MG 元素 - 窗口控件
  windowControls: {
    close: '#ff5f56',          // 红色 (更鲜艳)
    minimize: '#ffbd2e',      // 橙色
    maximize: '#27ca3f',      // 绿色
    hover: 'brightness(1.2)',  // 悬停亮起效果
  },

  // 文字 (保持不变)
  text: {
    primary: '#d4d4d4',
    secondary: '#9cdcfe',
    title: '#ffffff',         // 代码窗口标题文字用纯白
  },

  // 语法高亮 (保持 VS Code Dark+)
  syntax: {
    keyword: '#569cd6',
    type: '#4ec9b0',
    variable: '#9cdcfe',
    literal: '#b5cea8',
    operator: '#d4d4d4',
    punctuation: '#d4d4d4',
    default: '#d4d4d4',
  },

  // 状态颜色 (保持不变)
  status: {
    scanning: '#4ec9b0',
    matched: '#f1c40f',
    unmatched: '#2d2d30',
    warning: '#e74c3c',
    info: '#569cd6',
  },
} as const;


// ============================================================
// 🌊 v2.0 新背景组件
// ============================================================
export interface BackgroundStyle {
  background: string;
  position: string;
  overflow: string;
}

/**
 * 新背景样式 - 渐变 + 噪点 + 流线型
 * 应用于 AbsoluteFill
 */
export const backgroundStyleV2: BackgroundStyle = {
  background: `linear-gradient(to bottom,
    ${COLORS_V2.background.top} 0%,
    ${COLORS_V2.background.middle} 40%,
    ${COLORS_V2.background.bottom} 100%
  )`,
  position: 'relative',
  overflow: 'hidden',
} as const;


// ============================================================
// 🖼️ v2.0 代码框 - 增强MG感
// ============================================================

/**
 * VS Code 风格代码框 v2.0 - MG增强版
 * 窗口控件更鲜艳，支持hover动画
 */
export const codeFrameStyleV2 = {
  // 外层容器 - 保持不变
  container: {
    backgroundColor: COLORS_V2.codeFrame.background,
    border: `1px solid ${COLORS_V2.codeFrame.border}`,
    borderRadius: '8px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
    overflow: 'hidden',
    width: '100%',
    maxWidth: '1200px',
  },

  // 标题栏 - 保持不变
  titleBar: {
    backgroundColor: COLORS_V2.codeFrame.titleBar,
    borderBottom: `1px solid ${COLORS_V2.codeFrame.border}`,
    padding: '8px 16px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },

  // Tab 标签 - 保持不变
  tab: {
    backgroundColor: COLORS_V2.codeFrame.background,
    padding: '6px 16px',
    borderRadius: '4px',
    fontSize: '14px',
    color: COLORS_V2.text.primary,
    borderTop: `2px solid ${COLORS_V2.codeFrame.titleBarActive}`,
    fontFamily: '"Microsoft YaHei", sans-serif',
  },

  // 窗口控件 - 增强MG风格
  windowControls: {
    container: {
      marginLeft: 'auto',
      display: 'flex',
      gap: '8px',
    },
    button: {
      width: '12px',
      height: '12px',
      borderRadius: '50%',
      cursor: 'pointer',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      '&:hover': {
        transform: 'scale(1.15)',
        boxShadow: `0 0 10px currentColor`,
      },
    },
    close: {
      backgroundColor: COLORS_V2.windowControls.close,
      color: COLORS_V2.windowControls.close,
    },
    minimize: {
      backgroundColor: COLORS_V2.windowControls.minimize,
      color: COLORS_V2.windowControls.minimize,
    },
    maximize: {
      backgroundColor: COLORS_V2.windowControls.maximize,
      color: COLORS_V2.windowControls.maximize,
    },
  },

  // 代码内容区 - 保持不变
  content: {
    padding: '24px 32px',
    fontFamily: 'Consolas, "Courier New", monospace',
    fontSize: '26px',
    lineHeight: 1.8,
    backgroundColor: COLORS_V2.codeFrame.background,
  },

  // 代码文字容器 - 保持不变
  pre: {
    margin: 0,
    whiteSpace: 'pre',
    color: COLORS_V2.text.primary,
  },
} as const;
