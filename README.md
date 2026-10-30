# RestArtProjectA｜EasyC++ 主案例与教学演示工程

> 图灵数字艺术教育 · 技术实验室 · `TECH-EASYCPP-RESTARTPROJECTA-001`
> 源自上游 `CaptainRex0428/RestArtProjectA`（C++ headfirst series）并做教学化改造
> 本地路径：`${DEV_ROOT}/TECH-EASYCPP-RESTARTPROJECTA-001`

## 这是什么

一套 **C++ 教学可运行示例**（11 个）+ 配套的 **逐帧演示动画**（7 个）。

- `ProjectNN/` → 学生打开就能跑的示例，讲语法与行为
- `demos/` → 老师录课用的 Remotion 动画工程（**未渲染**），渲染出的 mp4 交给剪辑

两者是"讲解"与"画面"的分工，不是同一件事。

## 快速开始

### C++ 示例

需要 **VS2022**（v143 / C++20）与 Premake（仓库内置）。

```powershell
.\Scripts\GenerateWIN.bat      # 重新生成解决方案
start RestArtProjectA.sln
```

每个 `ProjectNN/main.cpp` 是一个独立控制台示例。**部分示例是故意越界**（演示未定义行为、指针误用），运行异常是设计意图。

### 演示动画

依赖共享工具 **Framecraft**（`${TOOLS_ROOT}/framecraft`）：

```powershell
cd demos
powershell -File .\link-framecraft.ps1   # 按本机路径生成 Framecraft 依赖
pnpm install
pnpm --dir for-loop-animation start       # Remotion Studio 预览
pnpm --dir for-loop-animation build       # 渲染 mp4
```

路径解析：`TOOLS_ROOT` 环境变量 → `~/.turing/bindings.json` → 报错。**不要在 package.json 里手写盘符**。

## 目录

```
Project01…Project20/     11 个 C++ 教学示例
demos/                   7 个 Remotion 演示（未渲染）
  ├─ for-loop-animation/           for 循环
  ├─ for-loop-format-animation/    循环书写格式
  ├─ foreach-int-vs-ref-animation/ 值拷贝 vs 引用
  ├─ foreach-structure-animation/  结构化绑定
  ├─ enum-structure-animation/     enum 结构
  ├─ switch-case-animation/        switch 基础
  ├─ switch-fallthrough-animation/ 贯穿（fallthrough）
  └─ link-framecraft.ps1           生成 Framecraft 依赖
docs/demo-history/       演示系统的历史提案与选型记录
Scripts/GenerateWIN.bat  Premake → VS2022 解决方案
Build.lua / Directory.lua / Makefile   Premake 配置
```

## 演示动画的三条规矩

1. **帧数单一来源** —— `Root.tsx` 的 `durationInFrames` 从 `config.ts` 的 `STAGES` 推导，不在两处各写一个数字（历史缺陷：写死 540，配置排到 750，后段被截断）。
2. **帧驱动，不用 CSS 动画** —— `useCurrentFrame()` + `interpolate()` + `spring()`。
3. **语义必须对** —— 演示要与真实代码行为一致（例：`for (int& item : arr) { item = 999; }` 把**每个**元素变 999，不是只改一个）。

详细规范见 Framecraft 的 `docs/`。

## 环境

| 项 | 要求 |
|---|---|
| C++ | VS2022（v143）、C++20、Premake（内置） |
| 演示 | Node ≥ 18、pnpm ≥ 9、Remotion 4.0.492 |
| 共享工具 | `${TOOLS_ROOT}/framecraft`（`TOOL-ORG-FRAMECRAFT-001`） |

## 许可

上游项目及其第三方组件（`premake5.exe`、Raylib DLL）保留原许可，见 `LICENSE` 与各目录说明。

## 相关

- 工具：`TOOL-ORG-FRAMECRAFT-001`｜技能：`remotion-demo-director`
- 工程总览：`RestArtEducation/项目管理/TURING_ENGINEERING_OVERVIEW_v003_20261030.md`
- 课程媒体（同步盘，不含代码）：`TuringTechLab/课程/C++/EasyC++/`