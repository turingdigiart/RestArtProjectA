# 🎨 EasyC++ 课程动画设计样式规范 v2.0

> **锁定日期**：2026-07-19
> **基础项目**：for-loop-animation
> **风格**：VS Code Dark+ Theme + 黑灰渐变背景 v2.0
> **说明**：本样式对当前项目有效，未来的其他demo也将沿用此背景样式

---

## 📌 核心原则

1. **视觉一致性** - 所有 EasyC++ 课程动画使用同一套样式
2. **专业感** - VS Code 风格让代码演示贴近真实开发环境
3. **清晰层次** - 通过颜色编码让概念变得直观
4. **正中文体** - 所有 UI 文字强制使用黑体（Microsoft YaHei）

---

## 🎨 调色板 (Palette) - **锁定**

### 背景层 - **官方标准 (锁定)**

**应用范围**：当前项目所有 demo，未来其他 demo 也使用此背景

| 用途 | 色值 | 说明 |
|------|------|------|
| **主背景** | `#000000` | 纯黑 - 顶部 (高级、深邃) |
| **中间过渡** | `#1a1a1a` | 深灰 - 中部 (柔和过渡) |
| **卡片表面** | `#2d2d30` | 深灰 - 底部 (与代码框背景一致) |

**使用方式**：
```tsx
background: `linear-gradient(to bottom,
  #000000 0%,    /* 纯黑 - 顶部 */
  #1a1a1a 40%,   /* 深灰过渡 - 中部 */
  #2d2d30 100%    /* 深灰 - 底部 */
)`
```

**历史版本**（仅用于理解，不使用）：
- v1.0: 纯 `#1e1e1e` 单色背景
- v2.0-alpha: 紫色 (`#151040`) + 蓝色 (`#0f1528`) + 灰 (`#1a1a1e`) 渐变

### 边框层

| 用途 | 色值 | 说明 |
|------|------|------|
| **标准边框** | `#3c3c3c` | 编辑器边框 |
| **活动边框** | `#569cd6` | 格子的青色边框 |
| **焦点边框** | `#007acc` | 编辑器 tab 的蓝色下划线 |

### 文字层

| 用途 | 色值 | 说明 |
|------|------|------|
| **主文字** | `#d4d4d4` | 默认文字（浅灰） |
| **次文字** | `#9cdcfe` | 变量（浅蓝） |
| **弱化文字** | `#5a5a5a` | 窗口按钮等装饰元素 |

### 语法高亮 (VS Code Dark+ 标准)

| 语法 | 色值 | 示例 |
|------|------|------|
| **关键字** | `#569cd6` | `for`, `if`, `while` |
| **类型** | `#4ec9b0` | `int`, `char`, `bool` |
| **变量** | `#9cdcfe` | `idx`, `cout`, `endl` |
| **字面量** | `#b5cea8` | `0`, `10`, 数字 |
| **操作符** | `#d4d4d4` | `+`, `-`, `%`, `==` |
| **标点** | `#d4d4d4` | `;`, `(`, `)`, `{` |

### 状态颜色（演示动画）

| 状态 | 色值 | 用途 |
|------|------|------|
| 🔵 **扫描中** | `#4ec9b0` | 正在搜索的数字（青色+光晕） |
| 🟡 **匹配** | `#f1c40f` | 符合条件的元素（黄色） |
| ⚫ **不匹配** | `#2d2d30` | 默认深灰色 |
| 🔴 **警告** | `#e74c3c` | 越界/条件失败（红色） |
| 🔵 **信息** | `#569cd6` | 状态提示文字 |

---

## 🖼️ 布局常量 - **锁定**

### 画布

```
画布尺寸:    1920 × 1080
四周内边距:  60px
```

### 数字格子 (应用于所有演示)

```
格子大小:      100 × 100px
格子间距:      20px (gap)
边框粗细:      3px
边框颜色:      #569cd6 (青色)
圆角:          12px
字号:          42px (粗体)
阴影:          0 8px 32px rgba(0, 0, 0, 0.4) [默认]
             或 0 0 25px rgba(78, 201, 176, 0.9) [扫描光晕]
```

### VS Code 代码框 (锁定)

```
最大宽度:      1200px
外圆角:        8px
外边框:        1px solid #3c3c3c
外阴影:        0 8px 32px rgba(0, 0, 0, 0.4)

标题栏高度:    约 40px (含 padding)
标签栏背景:    #252526
标签栏下边框:  1px solid #3c3c3c

代码内边距:    24px 32px
代码字号:      26px
代码行高:      1.8
```

---

## 📝 字体规则

```css
/* UI 文字 - 黑体 (强制) */
font-family: "Microsoft YaHei", "微软雅黑", "SimHei", "黑体", Arial, sans-serif;

/* 代码 - 等宽字体 */
font-family: Consolas, "Courier New", monospace;
```

### 字号表

| 用途 | 字号 |
|------|------|
| 大标题 | 64px |
| 状态文字 | 32px |
| 代码正文 | 26px |
| Tab 标签 | 14px |
| 格子中数字 | 42px |

---

## 🎬 动画规范

### 时间常量 (30fps)

```typescript
duration: {
  pageEnter: 30,         // 0.5秒
  initialShow: 30,       // 0.5秒
  searchDelay: 12,       // 0.4秒/格 (紧凑扫描)
  fadeOut: 20,           // 0.7秒
  gather: 45,            // 1.5秒 (快且平滑)
  pause: 30,             // 1秒
  conditionReject: 30,   // 1秒 (警告停留)
}
```

### Spring 缓动

```typescript
// 入场 - 柔和
spring.enter = { damping: 15, stiffness: 100, mass: 1 }

// 聚集 - 快而平滑 (无回弹)
spring.gather = { damping: 200, stiffness: 180, mass: 0.6 }
```

### 通用动画阶段

1. **🖼️ 初始显示** - 元素 spring 入场
2. **🔍 搜索/扫描** - 青色高亮依次经过
3. **🎯 条件判定** - 黄色=符合，黑色=不符合
4. **⚠️ 异常处理** - 红色警告 (条件失败/越界)
5. **✨ 筛选** - 不符合的元素淡出 (0.7秒)
6. **🎪 聚集/合并** - 符合的元素优雅合并 (1.5秒)
7. **⏸️ 静态展示** - 1秒最终画面

---

## 📦 锁定元素 - **不可更改**

### 背景样式 (background)

```tsx
<AbsoluteFill style={{
  backgroundColor: '#1e1e1e',
  color: '#d4d4d4',
  fontFamily: '"Microsoft YaHei", "微软雅黑", "SimHei", "黑体", Arial, sans-serif',
  display: 'flex',
  flexDirection: 'column',
  padding: '60px',
}}>
```

### 代码框样式 (codeFrame)

- **结构**：标题栏 + 内容区
- **标题栏**：左 Tab + 右窗口控件（3 个灰色圆点）
- **代码**：VS Code Dark+ 语法高亮
- **应用**：所有 C++ 代码展示

---

## 🚀 使用方法

### 在 TypeScript 项目中导入

```typescript
import { COLORS, FONTS, backgroundStyle, codeFrameStyle, gridBoxStyle } from './styles';
import { CodeFrame } from './styles.example';
```

### 示例 - 创建新课程动画

```tsx
import { backgroundStyle, CodeFrame } from './styles';

export const NewAnimation: React.FC = () => {
  return (
    <AbsoluteFill style={backgroundStyle}>
      <CodeFrame
        filename="lesson1.cpp"
        lines={[
          { text: 'int main() {', keywords: ['int', 'main'] },
          { text: '    // your code here', keywords: [] },
          { text: '}', keywords: [] },
        ]}
      />
    </AbsoluteFill>
  );
};
```

---

## 📜 版本历史

| 版本 | 日期 | 说明 |
|------|------|------|
| v1.0 | 2026-07-19 | 初版：基于 for-loop-animation 锁定背景和代码框样式 |

---

## 🎯 下一步

- [ ] 抽象更多复用组件（格子、状态文字等）
- [ ] 编写其他课程（while循环、if-else等）验证样式系统
- [ ] 优化动画过渡细节
