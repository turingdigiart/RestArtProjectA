import React from "react";
import { useCurrentFrame, interpolate, spring } from "remotion";
import { COL, FONT_CODE } from "../styles";

interface GridBoxProps {
  value: number | string;
  highlight?: boolean;
  changed?: boolean;
  size?: number;
  color?: string;
  showAddress?: boolean;
  addressIndex?: number;
}

/**
 * 格子组件 - 表示数组元素或变量
 * 用于展示数组中的单个元素或循环变量
 */
export const GridBox: React.FC<GridBoxProps> = ({
  value,
  highlight = false,
  changed = false,
  size = 90,
  color,
  showAddress = false,
  addressIndex = 0,
}) => {
  const frame = useCurrentFrame();

  // 入场动画 - 弹簧效果
  const scale = spring({
    frame,
    fps: 30,
    config: { damping: 15, stiffness: 100, mass: 1 },
  });

  // 值变化动画 - 数字滚动效果
  const valueChanged = interpolate(
    frame,
    [0, 22, 45],
    [0, 0.5, 1],
    { extrapolateRight: "clamp" }
  );

  // 处理显示值
  let displayValue = value;
  if (changed && typeof value === "number" && value === 999) {
    const originalValue = 2; // 假设原值是2
    displayValue = Math.floor(
      interpolate(frame, [0, 22, 45], [
        originalValue,
        originalValue + (999 - originalValue) / 2,
        999,
      ], { extrapolateRight: "clamp" })
    );
  }

  return (
    <div
      style={{
        width: size,
        height: size,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontSize: size * 0.45,
        fontWeight: "bold",
        fontFamily: FONT_CODE,
        borderRadius: 12,
        backgroundColor: changed
          ? "#ff5252"              // 被修改 → 红色
          : highlight
          ? "#4ec9b0"              // 当前活跃 → 青色
          : color || "#2d2d30",    // 默认 → 深灰
        color: highlight || changed ? "#000" : COL.textPri,
        border: changed
          ? `3px solid #ff5252`
          : highlight
          ? `3px solid #4ec9b0`
          : `2px solid #3c3c3c`,
        transform: `scale(${scale})`,
        transition: "all 0.3s ease",
        boxShadow: highlight
          ? "0 0 20px #4ec9b0"
          : changed
          ? "0 0 20px #ff5252"
          : "none",
        position: "relative",
      }}
    >
      {displayValue}
      {showAddress && (
        <div
          style={{
            position: "absolute",
            bottom: -28,
            fontSize: 14,
            color: COL.variable,
            fontFamily: "Microsoft YaHei, Arial, sans-serif",
            fontWeight: "normal",
          }}
        >
          0x{1000 + addressIndex * 4}
        </div>
      )}
    </div>
  );
};