import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { FONT_UI } from "../styles";

interface FlowArrowProps {
  direction: "down" | "right" | "diagonal";
  label: string;
  color: string;
  alpha: number;
  animated?: boolean;
}

/**
 * 流动箭头组件
 * 用于展示数据流向（复制 vs 引用）
 */
export const FlowArrow: React.FC<FlowArrowProps> = ({
  direction,
  label,
  color,
  alpha,
  animated = true,
}) => {
  const frame = useCurrentFrame();

  // 动画虚线偏移
  const dashOffset = animated
    ? interpolate(frame, [0, 60], [0, -20], { extrapolateRight: "loop" })
    : 0;

  // 根据方向设置 SVG 尺寸
  const getSvgDimensions = () => {
    switch (direction) {
      case "right":
        return { width: 120, height: 50 };
      case "diagonal":
        return { width: 120, height: 50 };
      default:
        return { width: 80, height: 50 };
    }
  };

  const { width, height } = getSvgDimensions();

  // 渲染箭头线条和箭头
  const renderArrow = () => {
    const strokeProps = {
      stroke: color,
      strokeWidth: 4,
      strokeDasharray: "8 8",
      strokeDashoffset: dashOffset,
    };

    switch (direction) {
      case "down":
        return (
          <>
            <line x1="40" y1="5" x2="40" y2="35" {...strokeProps} />
            <polygon points="32,32 48,32 40,45" fill={color} />
          </>
        );

      case "right":
        return (
          <>
            <line x1="5" y1="25" x2="105" y2="25" {...strokeProps} />
            <polygon points="100,18 100,32 115,25" fill={color} />
          </>
        );

      case "diagonal":
        return (
          <>
            <line x1="10" y1="45" x2="100" y2="5" {...strokeProps} />
            <polygon points="95,2 102,8 108,0" fill={color} />
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div
      style={{
        opacity: alpha,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
        transition: "opacity 0.5s ease",
      }}
    >
      {/* 标签 */}
      <div
        style={{
          color,
          fontSize: 20,
          fontWeight: "bold",
          fontFamily: FONT_UI,
          padding: "6px 14px",
          backgroundColor: `${color}25`,
          borderRadius: 8,
          border: `2px solid ${color}`,
          boxShadow: `0 0 15px ${color}40`,
        }}
      >
        {label}
      </div>

      {/* 箭头 SVG */}
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        style={{ overflow: "visible" }}
      >
        {renderArrow()}
      </svg>
    </div>
  );
};