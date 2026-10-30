# For Loop Format Animation

Remotion动画演示，介绍C++ for循环的基本格式。

## 快速开始

```bash
# 安装依赖
npm install

# 启动Remotion Studio（开发模式）
npm start

# 渲染视频到out目录
npm run build
```

## 动画结构

- **0-1秒**: 标题淡入
- **1-3秒**: 代码框架出现
- **3-5秒**: 初始化语句高亮 + 解释
- **5-7秒**: 循环条件高亮 + 解释
- **7-9秒**: 迭代表达式高亮 + 解释
- **9-13秒**: 循环执行过程可视化（i = 0, 1, 2, 3, 4）
- **13-15秒**: 总结要点

## 技术栈

- Remotion 4.0
- React 18
- TypeScript
- Tailwind CSS（可选）

## 自定义

修改 `src/ForLoopFormatDemo.tsx` 中的：
- `COLORS` 对象来调整配色
- 动画时长（修改各phase变量）
- 代码内容和样式