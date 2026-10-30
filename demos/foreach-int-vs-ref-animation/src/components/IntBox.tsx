import React from "react";
import { GridBox } from "./GridBox";
import { COL, FONT_UI } from "../styles";

interface IntBoxProps {
  label: string;
  subtitle: string;
  description?: string;
  color: string;
  value: number | string;
  highlight: boolean;
  changed: boolean;
  showPointer?: boolean;
  size?: number;
}

/**
 * 单个副本/引用盒子组件
 * 用于展示 foreach 循环中的变量
 */
export const IntBox: React.FC<IntBoxProps> = ({
  label,
  subtitle,
  description,
  color,
  value,
  highlight,
  changed,
  showPointer = false,
  size = 90,
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 10,
      }}
    >
      {/* 标签 */}
      <div
        style={{
          color,
          fontSize: 22,
          fontWeight: "bold",
          fontFamily: FONT_UI,
          textAlign: "center",
        }}
      >
        {label}
      </div>

      {/* 副标题 */}
      <div
        style={{
          color,
          fontSize: 16,
          fontFamily: FONT_UI,
          opacity: 0.75,
          textAlign: "center",
        }}
      >
        {subtitle}
      </div>

      {/* 描述 */}
      {description && (
        <div
          style={{
            color: COL.textPri,
            fontSize: 14,
            fontFamily: FONT_UI,
            textAlign: "center",
            maxWidth: 150,
            opacity: 0.85,
            lineHeight: 1.4,
          }}
        >
          {description}
        </div>
      )}

      {/* 主要格子 */}
      <GridBox
        value={value}
        highlight={highlight && !changed}
        changed={changed}
        color={color}
        size={size}
      />

      {/* 指针指示器 */}
      {showPointer && (
        <div
          style={{
            marginTop: 8,
            padding: "6px 12px",
            backgroundColor: `${color}20`,
            borderRadius: 8,
            border: `1px dashed ${color}`,
            fontSize: 14,
            color: COL.variable,
            fontFamily: "Consolas, monospace",
            fontWeight: "bold",
          }}
        >
          &arr[1]
        </div>
      )}
    </div>
  );
};