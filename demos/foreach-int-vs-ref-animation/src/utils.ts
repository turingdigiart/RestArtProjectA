// ============================================
// 工具函数
// ============================================

import { interpolate } from "remotion";

/**
 * 安全的插值函数
 * 防止数值超出范围
 */
export const safeInterpolate = (
  frame: number,
  inputRange: number[],
  outputRange: number[],
  options?: { extrapolateRight?: string; extrapolateLeft?: string }
): number => {
  return interpolate(frame, inputRange, outputRange, {
    extrapolateRight: options?.extrapolateRight ?? "clamp",
    extrapolateLeft: options?.extrapolateLeft ?? "clamp",
  });
};

/**
 * 创建淡入动画的透明度值
 * @param frame 当前帧
 * @param startFrame 开始帧
 * @param duration 动画时长（帧）
 */
export const fadeInOpacity = (
  frame: number,
  startFrame: number,
  duration: number = 15
): number => {
  return safeInterpolate(
    frame,
    [startFrame, startFrame + duration],
    [0, 1]
  );
};

/**
 * 创建淡出动画的透明度值
 * @param frame 当前帧
 * @param endFrame 结束帧
 * @param duration 动画时长（帧）
 */
export const fadeOutOpacity = (
  frame: number,
  endFrame: number,
  duration: number = 15
): number => {
  return safeInterpolate(
    frame,
    [endFrame - duration, endFrame],
    [1, 0]
  );
};

/**
 * 创建循环动画值（如闪烁、脉冲效果）
 * @param frame 当前帧
 * @param cycleLength 循环周期长度
 * @param minValue 最小值
 * @param maxValue 最大值
 */
export const cyclingValue = (
  frame: number,
  cycleLength: number,
  minValue: number,
  maxValue: number
): number => {
  const cyclePos = frame % cycleLength;
  const progress = cyclePos / (cycleLength / 2);

  if (progress < 1) {
    return minValue + (maxValue - minValue) * progress;
  } else {
    return maxValue - (maxValue - minValue) * (progress - 1);
  }
};

/**
 * 计算当前阶段
 * @param frame 当前帧
 * @param stages 阶段配置数组
 */
export const getCurrentStage = (
  frame: number,
  stages: Array<{ from: number; end: number }>
): number => {
  for (let i = 0; i < stages.length; i++) {
    if (frame >= stages[i].from && frame < stages[i].end) {
      return i + 1;
    }
  }
  return stages.length;
};

/**
 * 创建流动箭头的透明度动画
 * @param frame 当前帧
 * @param startFrame 开始帧
 * @param cycleLength 循环周期
 */
export const flowArrowAlpha = (
  frame: number,
  startFrame: number,
  cycleLength: number = 75
): number => {
  if (frame < startFrame) return 0;

  const cyclePos = (frame - startFrame) % cycleLength;
  if (cyclePos < cycleLength * 0.4) {
    return cyclePos / (cycleLength * 0.4);
  } else {
    return (cycleLength - cyclePos) / (cycleLength * 0.6);
  }
};

/**
 * 数字滚动动画
 * 用于展示数值变化过程
 * @param frame 当前帧
 * @param startFrame 开始帧
 * @param duration 动画时长
 * @param startValue 起始值
 * @param endValue 结束值
 */
export const numberRolling = (
  frame: number,
  startFrame: number,
  duration: number,
  startValue: number,
  endValue: number
): number => {
  if (frame < startFrame) return startValue;
  if (frame > startFrame + duration) return endValue;

  const progress = (frame - startFrame) / duration;
  const midValue = startValue + (endValue - startValue) * 0.5;

  if (progress < 0.5) {
    return startValue + (midValue - startValue) * (progress * 2);
  } else {
    return midValue + (endValue - midValue) * ((progress - 0.5) * 2);
  }
};

/**
 * 弹性缩放动画
 * 用于元素入场效果
 * @param frame 当前帧
 * @param startFrame 开始帧
 * @param maxScale 最大缩放值
 */
export const elasticScale = (
  frame: number,
  startFrame: number,
  maxScale: number = 1.1
): number => {
  if (frame < startFrame) return 0;

  const elapsed = frame - startFrame;
  const duration = 30;

  if (elapsed > duration) return 1;

  const progress = elapsed / duration;
  const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic

  if (progress < 0.7) {
    return maxScale * eased / 0.7;
  } else {
    return maxScale - (maxScale - 1) * ((progress - 0.7) / 0.3);
  }
};

/**
 * 计算迭代索引
 * 用于数组遍历动画
 * @param frame 当前帧
 * @param startFrame 开始帧
 * @param elementDelay 元素间延迟
 * @param maxIndex 最大索引
 */
export const getIterationIndex = (
  frame: number,
  startFrame: number,
  elementDelay: number,
  maxIndex: number
): number => {
  if (frame < startFrame) return 0;

  const elapsed = frame - startFrame;
  return Math.min(maxIndex, Math.floor(elapsed / elementDelay));
};