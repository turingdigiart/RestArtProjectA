/**
 * CodeFrame 组件 - VS Code 风格代码框
 *
 * 使用方式：
 * <CodeFrame
 *   filename="forloop.cpp"
 *   lines={[{ text: '...', keywords: ['for', 'idx'] }]}
 *   highlight={['idx']}  // 高亮条件判断
 * />
 */
import React from 'react';
import { COLORS, FONTS, FONT_SIZES, LAYOUT } from './styles';

export interface CodeLine {
  text: string;
  keywords: string[];
  highlight?: string[];  // 高亮的关键词
}

export interface CodeFrameProps {
  filename: string;
  lines: CodeLine[];
  width?: string;
}

export const CodeFrame: React.FC<CodeFrameProps> = ({ filename, lines, width = '100%' }) => {
  // 渲染单行代码，支持语法高亮 + 条件高亮
  const renderLine = (line: CodeLine) => {
    let parts: string[] = [line.text];

    // 第一步：高亮所有关键词
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
            let color: string = COLORS.syntax.default;
            if (keyword === 'for' || keyword === 'if' || keyword === 'while') color = COLORS.syntax.keyword;
            else if (keyword === 'int' || keyword === 'char' || keyword === 'bool' || keyword === 'void') color = COLORS.syntax.type;
            else if (keyword === 'idx' || keyword === 'cout' || keyword === 'endl') color = COLORS.syntax.variable;
            else color = COLORS.syntax.default;

            // 检查是否需要高亮为警告色（红色）
            const isHighlighted = line.highlight?.includes(keyword);
            const finalColor = isHighlighted ? COLORS.status.warning : color;

            newParts.push(`<span style="color: ${finalColor}">${keyword}</span>`);
          }
        }
      });
      parts = newParts;
    });

    return parts.join('');
  };

  return (
    <div style={{
      backgroundColor: COLORS.background.primary,
      border: `${LAYOUT.codeFrame.borderWidth}px solid ${COLORS.border.default}`,
      borderRadius: `${LAYOUT.codeFrame.borderRadius}px`,
      boxShadow: LAYOUT.codeFrame.boxShadow,
      overflow: 'hidden',
      width: width,
      maxWidth: `${LAYOUT.codeFrame.maxWidth}px`,
    }}>
      {/* 标题栏 */}
      <div style={{
        backgroundColor: COLORS.background.secondary,
        borderBottom: `1px solid ${COLORS.border.default}`,
        padding: '8px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
      }}>
        {/* Tab */}
        <div style={{
          backgroundColor: COLORS.background.primary,
          padding: '6px 16px',
          borderRadius: '4px',
          fontSize: '14px',
          color: COLORS.text.primary,
          borderTop: `2px solid ${COLORS.border.focus}`,
          fontFamily: FONTS.sans,
        }}>
          {filename}
        </div>

        {/* 窗口控制按钮 */}
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '4px' }}>
          <div style={{ width: '12px', height: '12px', backgroundColor: COLORS.text.muted, borderRadius: '50%' }} />
          <div style={{ width: '12px', height: '12px', backgroundColor: COLORS.text.muted, borderRadius: '50%' }} />
          <div style={{ width: '12px', height: '12px', backgroundColor: COLORS.text.muted, borderRadius: '50%' }} />
        </div>
      </div>

      {/* 代码内容 */}
      <div style={{
        padding: '24px 32px',
        fontFamily: FONTS.mono,
        fontSize: `${FONT_SIZES.body}px`,
        lineHeight: 1.8,
        backgroundColor: COLORS.background.primary,
      }}>
        <pre style={{ margin: 0, whiteSpace: 'pre', color: COLORS.text.primary }}>
          {lines.map((line, i) => (
            <div key={i} dangerouslySetInnerHTML={{ __html: renderLine(line) }} />
          ))}
        </pre>
      </div>
    </div>
  );
};
