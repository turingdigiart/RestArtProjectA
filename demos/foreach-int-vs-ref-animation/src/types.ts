// ============================================
// 类型定义
// ============================================

/**
 * 动画阶段配置
 */
export interface StageConfig {
  from: number;      // 开始帧
  end: number;       // 结束帧
  duration: number;  // 持续时间（帧）
}

/**
 * 动画时间常量
 */
export interface TimingConfig {
  fadeIn: number;          // 淡入动画时长
  fadeOut: number;         // 淡出动画时长
  elementDelay: number;    // 元素间延迟
  highlightPause: number;  // 高亮停留时间
  modificationAnim: number; // 修改动画时长
  summaryPause: number;    // 总结阶段停留时间
}

/**
 * Spring 缓动配置
 */
export interface SpringConfig {
  gentle: object;   // 柔和入场
  bouncy: object;   // 弹性效果
  smooth: object;   // 平滑过渡
}

/**
 * 动画配置总接口
 */
export interface AnimationConfig {
  stages: StageConfig[];
  timing: TimingConfig;
  spring: SpringConfig;
}

/**
 * 数组数据配置
 */
export interface ArrayConfig {
  data: number[];
  modifiedValue: number;
  gridSize: number;
  gap: number;
}