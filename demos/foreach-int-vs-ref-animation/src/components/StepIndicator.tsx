import React from "react";
import { COL, FONT_UI } from "../styles";

interface StepIndicatorProps {
  current: number;
  total: number;
  title: string;
  description?: string;
}

/**
 * 步骤指示器组件
 * 显示当前动画处于哪个阶段，以及总体进度
 */
export const StepIndicator: React.FC<StepIndicatorProps> = ({
  current,
  total,
  title,
  description,
}) => {
  return (
    <div
      style={{
        position: "absolute",
        top: 40,
        left: 0,
        right: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
        zIndex: 10,
      }}
    >
      {/* 当前步骤标题 */}
      <div
        style={{
          color: COL.type,
          fontSize: 28,
          fontWeight: "bold",
          fontFamily: FONT_UI,
          textAlign: "center",
          textShadow: "0 2px 8px rgba(0,0,0,0.3)",
        }}
      >
        第 {current} / {total} 步：{title}
      </div>

      {/* 步骤描述 */}
      {description && (
        <div
          style={{
            color: COL.textPri,
            fontSize: 18,
            fontFamily: FONT_UI,
            textAlign: "center",
            opacity: 0.9,
            maxWidth: 600,
            lineHeight: 1.4,
          }}
        >
          {description}
        </div>
      )}

      {/* 进度条 */}
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        {Array.from({ length: total }, (_, i) => (
          <div
            key={i}
            style={{
              width: i === current - 1 ? 48 : 16,
              height: 16,
              borderRadius: 8,
              backgroundColor:
                i === current - 1
                  ? COL.type
                  : i < current - 1
                  ? `${COL.type}60`  // 已完成的步骤
                  : "#3c3c3c",      // 未完成的步骤
              transition: "all 0.4s ease",
              boxShadow:
                i === current - 1
                  ? `0 0 12px ${COL.type}80`
                  : "none",
            }}
          />
        ))}
      </div>

      {/* 百分比显示 */}
      <div
        style={{
          position: "absolute",
          top: -30,
          right: 100,
          color: COL.textWeak,
          fontSize: 14,
          fontFamily: FONT_UI,
        }}
      >
        {Math.round((current / total) * 100)}%
      </div>
    </div>
  );
};