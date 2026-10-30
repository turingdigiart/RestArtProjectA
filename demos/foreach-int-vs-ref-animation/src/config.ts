// ============================================
// 动画配置文件
// ============================================

import { AnimationConfig } from "./types";

/**
 * 完整的动画配置
 * 基于 30fps，总时长 25秒 = 750帧
 */
export const ANIMATION_CONFIG: AnimationConfig = {
  // 动画阶段配置
  stages: [
    { from: 0, end: 90, duration: 90 },       // 0-3s: 标题和初始数组展示
    { from: 90, end: 210, duration: 120 },    // 3-7s: int 复制演示
    { from: 210, end: 330, duration: 120 },    // 7-11s: 修改副本演示
    { from: 330, end: 450, duration: 120 },    // 11-15s: int& 引用演示
    { from: 450, end: 570, duration: 120 },    // 15-19s: 修改引用演示
    { from: 570, end: 750, duration: 180 },    // 19-25s: 对比总结
  ],

  // 动画时间常量 (30fps)
  timing: {
    fadeIn: 15,           // 0.5秒 - 淡入
    fadeOut: 15,          // 0.5秒 - 淡出
    elementDelay: 18,     // 0.6秒 - 元素延迟（增强展示效果）
    highlightPause: 30,   // 1秒 - 高亮停留（让用户看清）
    modificationAnim: 45, // 1.5秒 - 修改动画
    summaryPause: 60,     // 2秒 - 总结阶段
  },

  // Spring 缓动配置
  spring: {
    gentle: { damping: 15, stiffness: 100, mass: 1 },   // 柔和入场
    bouncy: { damping: 12, stiffness: 80, mass: 1 },    // 弹性效果
    smooth: { damping: 25, stiffness: 150, mass: 1 },   // 平滑过渡
  },
};

// 导出便捷引用
export const { stages: STAGES, timing: TIMING, spring: SPRING } = ANIMATION_CONFIG;

/**
 * 代码示例
 */
export const CODE_EXAMPLES = {
  int: `// int 副本演示
std::vector<int> arr = {1, 2, 3};
for (int item : arr) {
    item = 999;  // 修改副本
}
// arr 仍然是 {1, 2, 3}`,

  ref: `// int& 引用演示
std::vector<int> arr = {1, 2, 3};
for (int& item : arr) {
    item = 999;  // 修改原数组
}
// arr 变成 {1, 999, 3}`,
};

/**
 * 步骤标题和描述
 */
export const STEP_INFO = [
  {
    title: "原数组内容",
    description: "",
  },
  {
    title: "int 复制演示",
    description: "int item：每个元素被复制到独立变量",
  },
  {
    title: "修改副本",
    description: "修改副本不影响原数组",
  },
  {
    title: "int& 引用演示",
    description: "int& item：直接引用原数组元素",
  },
  {
    title: "修改引用",
    description: "修改引用直接影响原数组",
  },
  {
    title: "对比总结",
    description: "int：值传递 vs int&：引用传递",
  },
];

/**
 * 数组数据配置
 */
export const ARRAY_CONFIG = {
  data: [1, 2, 3],
  modifiedValue: 999,
  gridSize: 90,
  gap: 12,
};

/**
 * 常量导出
 */
export const ARRAY_DATA = ARRAY_CONFIG.data;
export const MODIFIED_VALUE = ARRAY_CONFIG.modifiedValue;
export const GRID_BOX_SIZE = ARRAY_CONFIG.gridSize;
export const GRID_GAP = ARRAY_CONFIG.gap;