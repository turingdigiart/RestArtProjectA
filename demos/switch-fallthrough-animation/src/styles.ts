// 纯常量定义文件 - 不包含 JSX

export const COL = {
  bgTop: "#000000",
  bgMid: "#1a1a1a",
  bgBot: "#2d2d30",
  textPri: "#d4d4d4",
  textWeak: "#5a5a5a",
  keyword: "#569cd6",
  type: "#4ec9b0",
  variable: "#9cdcfe",
  literal: "#b5cea8",
  enumName: "#dcdcaa",
  textDefault: "#d4d4d4",

  cfBg: "#1e1e1e",
  cfTitleBg: "#252526",
  cfBorder: "#3c3c3c",
  cfActive: "#007acc",
  ctrlClose: "#ff5f56",
  warning: "#ff5f56",       // break/穿透警告用红
  ctrlMin: "#ffbd2e",
  ctrlMax: "#27ca3f",
};

export const FONT_UI = "Microsoft YaHei, 微软雅黑, Arial, sans-serif";
export const FONT_CODE = "Consolas, Courier New, monospace";

export const backgroundStyle = {
  background: `linear-gradient(to bottom, ${COL.bgTop} 0%, ${COL.bgMid} 40%, ${COL.bgBot} 100%)`,
  position: "relative" as const,
  overflow: "hidden",
};

// 代码框样式对象（用于 CodeFrame 组件）
export const codeFrameStyles = {
  container: {
    backgroundColor: COL.cfBg,
    border: `1px solid ${COL.cfBorder}`,
    borderRadius: 8,
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
    overflow: "hidden",
    width: "100%",
    maxWidth: "1200px",
  },
  titleBar: {
    backgroundColor: COL.cfTitleBg,
    borderBottom: `1px solid ${COL.cfBorder}`,
    padding: "8px 16px",
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  tab: {
    backgroundColor: COL.cfBg,
    padding: "6px 16px",
    borderRadius: 4,
    fontSize: 14,
    color: COL.textPri,
    borderTop: `2px solid ${COL.cfActive}`,
    fontFamily: FONT_UI,
  },
  controlsRow: {
    marginLeft: "auto" as const,
    display: "flex",
    gap: 8,
  },
  controlDot: {
    width: 12,
    height: 12,
    borderRadius: "50%",
  },
  content: {
    padding: "24px 32px",
    fontFamily: FONT_CODE,
    fontSize: 26,
    lineHeight: 1.8,
    backgroundColor: COL.cfBg,
    color: COL.textPri,
  },
};