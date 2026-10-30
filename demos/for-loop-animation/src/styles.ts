/**
 * EasyC++ 课程动画统一设计系统
 * EasyC++ Course Animation Design System
 *
 * 适用：所有 C++ 教学演示动画的样式规范
 * 风格：VS Code Dark+ Theme
 * 锁定版本：v1.0 (基于 for-loop-animation 项目确认)
 */

// ============================================================
// 🎨 调色板 (Palette) - 锁定
// ============================================================
export const COLORS = {
  // 背景层 (深→浅)
  background: {
    primary: '#1e1e1e',        // 主背景 (最深的黑)
    secondary: '#252526',      // 次背景 (编辑器标签栏)
    surface: '#2d2d30',        // 卡片表面 (格子默认)
  },

  // 边框
  border: {
    default: '#3c3c3c',        // 标准边框
    active: '#569cd6',         // 活动边框 (青色)
    focus: '#007acc',          // 焦点边框 (VS Code蓝)
  },

  // 文字层
  text: {
    primary: '#d4d4d4',        // 主文字 (浅灰)
    secondary: '#9cdcfe',      // 次文字 (变量-浅蓝)
    muted: '#5a5a5a',          // 弱化文字 (窗口按钮等)
  },

  // 语法高亮 (VS Code Dark+ 标准色)
  syntax: {
    keyword: '#569cd6',        // 蓝色 - for, if, while
    type: '#4ec9b0',           // 青色 - int, char, bool
    variable: '#9cdcfe',       // 浅蓝 - idx, cout
    literal: '#b5cea8',        // 绿色 - 0, 10, 数字字面量
    operator: '#d4d4d4',       // 灰 - +, -, %, ==
    punctuation: '#d4d4d4',    // 灰 - ;, (, ), {
    default: '#d4d4d4',        // 默认
  },

  // 状态颜色 (用于演示动画)
  status: {
    scanning: '#4ec9b0',       // 扫描中 - 青色 (青光晕)
    matched: '#f1c40f',        // 匹配 - 黄色 (符合条件)
    unmatched: '#2d2d30',      // 不匹配 - 深灰 (默认)
    warning: '#e74c3c',        // 警告 - 红色 (越界/条件失败)
    info: '#569cd6',           // 信息 - 蓝色 (状态提示)
  },

  // 阴影
  shadow: {
    soft: '0 8px 32px rgba(0, 0, 0, 0.4)',  // 卡片悬浮阴影
    glow: '0 0 25px rgba(78, 201, 176, 0.9)', // 扫描光晕
  },

  // 不透明
  overlay: 'rgba(0, 0, 0, 0.3)',  // 半透明遮罩
} as const;


// ============================================================
// 🖼️ 布局常量 (Layout)
// ============================================================
export const LAYOUT = {
  // 画布
  canvas: {
    width: 1920,
    height: 1080,
    padding: 60,  // 四周内边距
  },

  // 网格 (数字格子) - 应用于所有演示
  grid: {
    boxSize: 100,           // 格子大小 100×100px
    gap: 20,                // 格子间距 20px
    borderWidth: 3,         // 边框粗细
    borderRadius: 12,       // 圆角
    boxShadow: COLORS.shadow.soft,
  },

  // 代码编辑器 (锁定)
  codeFrame: {
    maxWidth: 1200,         // 最大宽度
    borderRadius: 8,        // 圆角
    borderColor: COLORS.border.default,
    borderWidth: 1,         // 边框粗细
    boxShadow: COLORS.shadow.soft,
    titleBarHeight: 40,     // 标题栏高度 (含 padding)
  },
} as const;


// ============================================================
// 📝 字体 (Typography)
// ============================================================
export const FONTS = {
  // 中文/UI 文字 - 黑体 (强制)
  sans: '"Microsoft YaHei", "微软雅黑", "SimHei", "黑体", Arial, sans-serif',

  // 代码 - 等宽
  mono: 'Consolas, "Courier New", monospace',
} as const;


// ============================================================
// 🔠 字号 (Type Scale)
// ============================================================
export const FONT_SIZES = {
  display: 64,        // 大标题 (例如: "C++ For Loop 演示")
  title: 32,          // 状态文字 (例如: "当前循环: idx = 5")
  body: 26,           // 代码正文
  caption: 16,        // 标签 (例如: "forloop.cpp")
  gridNumber: 42,     // 格子中的数字
} as const;


// ============================================================
// 🎬 动画常量 (Motion)
// ============================================================
export const MOTION = {
  // 时间常量 (帧数 @ 30fps)
  duration: {
    pageEnter: 30,         // 0.5秒 - 页面入场
    initialShow: 30,       // 0.5秒 - 格子出现
    searchDelay: 12,       // 0.4秒/格 - 紧凑扫描
    fadeOut: 20,           // 0.7秒 - 消失
    gather: 45,            // 1.5秒 - 聚集 (快且平滑)
    pause: 30,             // 1秒 - 最终停顿
    conditionReject: 30,   // 1秒 - 警告停留
  },

  // Spring 缓动配置
  spring: {
    // 入场 - 柔和
    enter: { damping: 15, stiffness: 100, mass: 1 },
    // 聚集 - 快而平滑
    gather: { damping: 200, stiffness: 180, mass: 0.6 },
  },
} as const;


// ============================================================
// 🎨 样式对象 (Style Presets)
// ============================================================

/**
 * 主背景样式 - 锁定
 * 所有动画都使用这个背景
 */
export const backgroundStyle = {
  backgroundColor: COLORS.background.primary,
  color: COLORS.text.primary,
  fontFamily: FONTS.sans,
} as const;

/**
 * VS Code 风格代码框样式 - 锁定
 * 用于展示所有 C++ 代码
 */
export const codeFrameStyle = {
  // 外层容器
  container: {
    backgroundColor: COLORS.background.primary,
    border: `${LAYOUT.codeFrame.borderWidth}px solid ${COLORS.border.default}`,
    borderRadius: LAYOUT.codeFrame.borderRadius,
    boxShadow: LAYOUT.codeFrame.boxShadow,
    overflow: 'hidden',
    width: '100%',
    maxWidth: `${LAYOUT.codeFrame.maxWidth}px`,
  },

  // 标题栏 (含 tab 和窗口控件)
  titleBar: {
    backgroundColor: COLORS.background.secondary,
    borderBottom: `1px solid ${COLORS.border.default}`,
    padding: '8px 16px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },

  // Tab 标签 (例如: forloop.cpp)
  tab: {
    backgroundColor: COLORS.background.primary,
    padding: '6px 16px',
    borderRadius: '4px',
    fontSize: `${FONT_SIZES.caption - 2}px`,  // 14px
    color: COLORS.text.primary,
    borderTop: `2px solid ${COLORS.border.focus}`,
    fontFamily: FONTS.sans,
  },

  // 窗口控制按钮 (红黄绿三点)
  windowControls: {
    container: {
      marginLeft: 'auto',
      display: 'flex',
      gap: '4px',
    },
    button: {
      width: '12px',
      height: '12px',
      backgroundColor: COLORS.text.muted,
      borderRadius: '50%',
    },
  },

  // 代码内容区
  content: {
    padding: '24px 32px',
    fontFamily: FONTS.mono,
    fontSize: `${FONT_SIZES.body}px`,
    lineHeight: 1.8,
    backgroundColor: COLORS.background.primary,
  },

  // 代码文字容器
  pre: {
    margin: 0,
    whiteSpace: 'pre',
    color: COLORS.text.primary,
  },
} as const;


/**
 * 数字格子样式 - 锁定
 * 用于展示所有数字/状态元素
 */
export const gridBoxStyle = (bgColor: string, textColor: string, hasGlow: boolean = false) => ({
  width: `${LAYOUT.grid.boxSize}px`,
  height: `${LAYOUT.grid.boxSize}px`,
  boxSizing: 'border-box',
  borderRadius: `${LAYOUT.grid.borderRadius}px`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: `${FONT_SIZES.gridNumber}px`,
  fontWeight: 'bold',
  fontFamily: FONTS.sans,
  backgroundColor: bgColor,
  color: textColor,
  border: `${LAYOUT.grid.borderWidth}px solid ${COLORS.border.active}`,
  boxShadow: hasGlow ? COLORS.shadow.glow : 'none',
});


// ============================================================
// 📜 版本信息
// ============================================================
export const VERSION = {
  number: '1.0.0',
  date: '2026-07-19',
  locked: ['background', 'codeFrameStyle', 'gridBoxStyle'], // 锁定元素
  scope: 'All EasyC++ course animations',
} as const;
