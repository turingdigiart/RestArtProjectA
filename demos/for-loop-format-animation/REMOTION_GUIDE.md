# Remotion 动画工作指南

> 本项目使用 Remotion 制作教学动画，遵循 EasyC++ 官方设计规范

## 🎬 默认工作流

**当你提到"做动画"、"创建动画"或"动画demo"时，默认理解为：**

1. ✅ 使用 Remotion 框架
2. ✅ 遵循 `DESIGN_STYLE.md` 设计规范
3. ✅ 使用 VS Code Dark+ 主题
4. ✅ 应用官方锁定的背景样式和颜色系统

## 📂 项目结构

```
for-loop-format-animation/
├── DESIGN_STYLE.md          # 📌 官方设计规范（必须遵循）
├── package.json             # Remotion 依赖
├── remotion.config.ts       # Remotion 配置
├── tsconfig.json            # TypeScript 配置
└── src/
    ├── index.ts             # Remotion 入口
    ├── Root.tsx             # 根组件
    └── ForLoopFormatDemo.tsx # 动画组件（已遵循设计规范）
```

## 🎨 设计规范速查

### 背景渐变（锁定）

```typescript
background: `linear-gradient(to bottom,
  #000000 0%,    // 纯黑 - 顶部
  #1a1a1a 40%,   // 深灰 - 中部
  #2d2d30 100%   // 深灰 - 底部
)`
```

### VS Code Dark+ 语法高亮

```typescript
const COLORS = {
  keyword: "#569cd6",    // for, if, while
  type: "#4ec9b0",       // int, char
  variable: "#9cdcfe",   // 变量名
  number: "#b5cea8",     // 数字
  operator: "#d4d4d4",   // 操作符
  punctuation: "#d4d4d4",// 标点
};
```

### 状态颜色

```typescript
scanning: "#4ec9b0",     // 扫描中（青色）
matched: "#f1c40f",      // 匹配（黄色）
unmatched: "#2d2d30",    // 不匹配（深灰）
warning: "#e74c3c",      // 警告（红色）
```

### 布局常量

```typescript
const GRID_BOX = {
  size: 100,              // 格子大小 100×100px
  gap: 20,                // 间距 20px
  borderWidth: 3,         // 边框粗细 3px
  borderColor: "#569cd6", // 边框颜色（青色）
  borderRadius: 12,       // 圆角 12px
  fontSize: 42,           // 字号 42px
};
```

## 🚀 快速启动

```bash
# 安装依赖
npm install

# 启动 Remotion Studio
npm start

# 渲染视频（默认输出到 out/ 目录）
npm run build
```

## 📝 创建新动画

### 模板代码

```typescript
import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";

// 📌 导入官方颜色系统
const COLORS = {
  backgroundTop: "#000000",
  backgroundMiddle: "#1a1a1a",
  backgroundBottom: "#2d2d30",
  textPrimary: "#d4d4d4",
  keyword: "#569cd6",
  type: "#4ec9b0",
  variable: "#9cdcfe",
  number: "#b5cea8",
};

export const NewAnimation: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(to bottom,
          ${COLORS.backgroundTop} 0%,
          ${COLORS.backgroundMiddle} 40%,
          ${COLORS.backgroundBottom} 100%
        )`,
        color: COLORS.textPrimary,
        fontFamily: '"Microsoft YaHei", "微软雅黑", Arial, sans-serif',
        padding: 60,
      }}
    >
      {/* 你的动画内容 */}
    </AbsoluteFill>
  );
};
```

## ✅ 检查清单

在创建动画时，确保：

- [ ] 使用官方背景渐变（纯黑 → 深灰）
- [ ] VS Code Dark+ 语法高亮
- [ ] 字体：Consolas（代码）+ 微软雅黑（UI）
- [ ] 格子/卡片遵循布局常量
- [ ] 状态颜色符合规范（扫描/匹配/警告）
- [ ] 动画时长合理（通常 15-30 秒）

## 📚 相关文档

- **DESIGN_STYLE.md** - 完整设计规范（必读）
- **README.md** - 项目说明
- **remotion.config.ts** - Remotion 配置

## 🎯 工作流程

### 典型请求示例

**用户说**：
> "创建一个 while 循环的动画demo"

**Claude 理解为**：
1. 在 `Template/Demo/` 下创建新的 Remotion 项目
2. 应用 `DESIGN_STYLE.md` 中的所有规范
3. 使用 VS Code Dark+ 主题和官方背景
4. 遵循布局常量和状态颜色系统

### 修改现有动画

如果需要调整动画内容或样式：
1. 首先检查 `DESIGN_STYLE.md` 确认是否允许修改
2. 锁定的元素（背景、颜色系统）不可更改
3. 可以调整动画逻辑、文字内容、时长等

## 🔗 参考

- [Remotion 官方文档](https://www.remotion.dev/docs/)
- [VS Code Dark+ Theme](https://code.visualstudio.com/)
- [EasyC++ 设计规范](./DESIGN_STYLE.md)