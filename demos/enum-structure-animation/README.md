# enum-structure-animation

## 🎯 项目说明

枚举结构演示动画项目，用于 EasyC++ 课程教学。

## 🚀 快速开始

### 预览动画
1. 双击 `预览.bat` 启动预览服务器
2. 浏览器访问 `http://localhost:3000`
3. 开始预览动画效果

## 📁 项目结构

```
enum-structure-animation/
├── 📄 预览.bat           ← 启动预览
├── 📁 src/
│   ├── index.ts          ← 入口文件
│   ├── Root.tsx          ← 根组件
│   ├── EnumStructureDemo.tsx ← 主演示组件
│   └── components/       ← 可复用组件
├── 📄 package.json
├── 📄 tsconfig.json
├── 📄 remotion.config.ts
└── 📄 DESIGN_STYLE.md    ← 设计规范
```

## 🎨 开发指南

- 修改 `src/EnumStructureDemo.tsx` 编辑动画内容
- 添加组件到 `src/components/`
- 遵循 `DESIGN_STYLE.md` 的设计规范

## 📝 动画内容

演示 C++ enum 的结构和用法：
- enum 关键字的作用
- 枚举类型的定义
- 枚举值的分配规则
- 默认值机制

## ⏱️ 动画时间轴

- **0-1秒**：代码框架淡入
- **1-3秒**：enum 关键字演示
- **3-5秒**：类型名展示
- **5-7秒**：成员列表演示
- **7-12秒**：默认值规则讲解
- **12-18秒**：完整概念回顾

## 📋 注意事项

- 所有项目共享依赖，无需单独安装 node_modules
- 使用 VS Code Dark+ 主题配色
- 遵循 EasyC++ 统一设计规范