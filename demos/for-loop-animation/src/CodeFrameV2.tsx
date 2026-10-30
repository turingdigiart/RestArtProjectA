/**
 * CodeFrame 组件 v2.0 - MG增强版
 * VS Code 风格 + 鲜艳窗口控件 + 可配置样式
 */
import React from 'react';
import { COLORS_V2, codeFrameStyleV2 } from './styles-v2';

export interface CodeLine {
  text: string;
  keywords: string[];
  highlight?: string[];  // 高亮为警告色的关键词
}

export interface CodeFrameProps {
  filename: string;
  lines: CodeLine[];
  width?: string;
}

export const CodeFrameV2: React.FC<CodeFrameProps> = ({ filename, lines, width = '100%' }) => {
  // 渲染单行代码，支持语法高亮 + 条件高亮
  const renderLine = (line: CodeLine) => {
    let parts: string[] = [line.text];

    // 高亮所有关键词
    line.keywords.forEach(keyword => {
      const newParts: string[] = [];
      parts.forEach(part => {
        if (typeof part !== 'string') {
          newParts.push(part);
          return;
        }
        const splits = part.split(keyword);
        for (let i = 0; i < splits.length; i++) {
          newParts.push(splits[i]);
          if (i < splits.length - 1) {
            // 选择颜色
            let color: string = COLORS_V2.syntax.default;
            if (keyword === 'for' || keyword === 'if' || keyword === 'while') color = COLORS_V2.syntax.keyword;
            else if (keyword === 'int' || keyword === 'char' || keyword === 'bool' || keyword === 'void') color = COLORS_V2.syntax.type;
            else if (keyword === 'idx' || keyword === 'cout' || keyword === 'endl') color = COLORS_V2.syntax.variable;
            else color = COLORS_V2.syntax.default;

            // 检查是否需要高亮为警告色（红色）
            const isHighlighted = line.highlight?.includes(keyword);
            const finalColor = isHighlighted ? '#e74c3c' : color;

            newParts.push(`<span style="color: ${finalColor}">${keyword}</span>`);
          }
        }
      });
      parts = newParts;
    });

    return parts.join('');
  };

  return (
    <div style={codeFrameStyleV2.container}>
      {/* 标题栏 */}
      <div style={codeFrameStyleV2.titleBar}>
        {/* Tab */}
        <div style={codeFrameStyleV2.tab}>
          {filename}
        </div>

        {/* 窗口控件 - MG风格（鲜艳色 + hover效果） */}
        <div style={codeFrameStyleV2.windowControls.container}>
          <div style={{
            ...codeFrameStyleV2.windowControls.button,
            ...codeFrameStyleV2.windowControls.close,
          }} />
          <div style={{
            ...codeFrameStyleV2.windowControls.button,
            ...codeFrameStyleV2.windowControls.minimize,
          }} />
          <div style={{
            ...codeFrameStyleV2.windowControls.button,
            ...codeFrameStyleV2.windowControls.maximize,
          }} />
        </div>
      </div>

      {/* 代码内容 */}
      <div style={codeFrameStyleV2.content}>
        <pre style={codeFrameStyleV2.pre}>
          {lines.map((line, i) => (
            <div key={i} dangerouslySetInnerHTML={{ __html: renderLine(line) }} />
          ))}
        </pre>
      </div>
    </div>
  );
};
