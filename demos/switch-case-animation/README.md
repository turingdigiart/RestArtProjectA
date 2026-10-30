# switch-case-animation

## 🎯 项目说明

switch-case 条件判断演示动画项目，用于 EasyC++ 课程教学。

## 🚀 快速开始

### 预览动画
1. 双击 `预览.bat` 启动预览服务器
2. 浏览器访问 `http://localhost:3000`
3. 开始预览动画效果

## 📁 项目结构

```
switch-case-animation/
├── 📄 预览.bat           ← 启动预览
├── 📁 src/
│   ├── index.ts          ← 入口文件
│   ├── Root.tsx          ← 根组件
│   ├── SwitchCaseDemo.tsx ← 主演示组件
│   └── components/       ← 可复用组件
├── 📄 package.json
├── 📄 tsconfig.json
├── 📄 remotion.config.ts
└── 📄 DESIGN_STYLE.md    ← 设计规范
```

## 🎨 开发指南

- 修改 `src/SwitchCaseDemo.tsx` 编辑动画内容
- 添加组件到 `src/components/`
- 遵循 `DESIGN_STYLE.md` 的设计规范

## 📝 动画内容

演示 switch-case 语句的执行流程：
- switch 表达式的计算
- case 分支的匹配
- break 语句的作用
- default 分支的处理

## 📋 注意事项

- 所有项目共享依赖，无需单独安装 node_modules
- 使用 VS Code Dark+ 主题配色
- 遵循 EasyC++ 统一设计规范