# Remotion 动画特化指南

## 🎯 如何基于标准进行特化

本指南说明如何在 `for-loop-animation` demo 的标准基础上，针对不同算法类型进行特化和扩展。

---

## 📊 算法分类与动画策略

### 类别 1: 线性遍历算法

**适用算法**: 
- 线性查找 (Linear Search)
- 数组遍历 (Array Traversal)
- 累加/累乘 (Accumulation)
- 最大值/最小值查找

**基础模式**: 搜索-处理 (Search-Process)

**标准实现参考**: `ForLoopDemo.tsx`

#### 特化要点

```typescript
// 🔍 线性查找特化
const isComparing = currentIndex === targetIndex;
const isFound = currentIndex === targetValue;

// 比较时闪烁效果
if (isComparing) {
  hasGlow = true;
  boxColor = '#ff9f43';  // 橙色表示比较中
}

// 找到后绿色高亮
if (isFound) {
  boxColor = '#27ca3f';  // 绿色表示成功
  hasGlow = true;
}
```

#### 扩展时序

```typescript
// 标准遍历速度
const frameDelay = 12;  // 0.4秒/元素

// 特化: 找到目标后暂停强调
if (isFound) {
  const emphasizeDuration = 45;  // 1.5秒强调
  // 显示找到的动画...
}
```

---

### 类别 2: 排序算法

**适用算法**:
- 冒泡排序 (Bubble Sort)
- 选择排序 (Selection Sort)
- 插入排序 (Insertion Sort)

**基础模式**: 比较高亮 + 交换动画

#### 特化模板

```typescript
// 🔀 交换动画核心
const animateSwap = (indexA: number, indexB: number, startFrame: number) => {
  const progress = spring({
    frame: frame - startFrame,
    fps,
    config: { damping: 200, stiffness: 180, mass: 0.6 }
  });
  
  // 位置插值
  const posA = interpolate(progress, [0, 1], [
    indexA * itemWidth, 
    indexB * itemWidth
  ]);
  const posB = interpolate(progress, [0, 1], [
    indexB * itemWidth, 
    indexA * itemWidth
  ]);
  
  return { posA, posB };
};

// 🔍 比较状态
const renderBox = (index: number, comparingWith?: number) => {
  let color = '#2d2d30';
  let hasGlow = false;
  
  if (comparingWith !== undefined) {
    // 比较中的两个元素
    color = '#ff9f43';  // 橙色
    hasGlow = true;
  } else if (isSorted(index)) {
    // 已排序部分
    color = '#27ca3f';  // 绿色
  }
  
  return { color, hasGlow };
};
```

#### 冒泡排序特化时序

```typescript
// 每次比较
const comparisonDelay = 15;  // 0.5秒/比较

// 每次交换
const swapDuration = 20;  // 0.67秒完成交换

// 一轮结束后的暂停
const roundPause = 30;  // 1秒展示当前状态

// 最终完成强调
const finalEmphasize = 60;  // 2秒展示完全排序的数组
```

#### 选择排序特化

```typescript
// 🎯 选择排序: 记录最小值
let minIndex = currentStart;
let minColor = '#4ec9b0';  // 青色标记当前最小

// 每找到一个更小的值
if (newValue < minValue) {
  minIndex = newIndex;
  minColor = '#27ca3f';  // 绿色更新最小值
}

// 一轮结束交换最小值到位置
const swapProgress = spring({
  frame: frame - swapStartFrame,
  fps,
  config: { damping: 200, stiffness: 180, mass: 0.6 }
});
```

---

### 类别 3: 递归算法

**适用算法**:
- 斐波那契数列 (Fibonacci)
- 阶乘计算 (Factorial)
- 二分查找 (Binary Search)
- 快速排序 (Quick Sort)

**基础模式**: 调用栈可视化 + 缩进层级

#### 特化模板

```typescript
// 📚 递归调用栈组件
interface CallStackFrame {
  functionName: string;
  parameters: any[];
  returnValue?: any;
  depth: number;
  status: 'calling' | 'computing' | 'returning';
}

const RecursiveVisualization: React.FC<{
  callStack: CallStackFrame[];
}> = ({ callStack }) => {
  return (
    <div style={{
      position: 'absolute',
      left: '100px',
      top: '300px',
      width: '1100px',
    }}>
      {callStack.map((call, index) => {
        // 缩进 = 递归深度
        const indent = call.depth * 40;
        
        // 状态颜色
        const statusColor = {
          calling: '#4ec9b0',    // 青色 - 正在调用
          computing: '#f1c40f',  // 黄色 - 计算中
          returning: '#27ca3f',  // 绿色 - 返回结果
        }[call.status];
        
        return (
          <div key={index} style={{
            marginLeft: `${indent}px`,
            marginBottom: '15px',
            padding: '10px 15px',
            backgroundColor: '#1e1e1e',
            borderLeft: `4px solid ${statusColor}`,
            borderRadius: '6px',
            transform: `scale(${call.status === 'calling' ? 1.05 : 1})`,
            transition: 'all 0.3s ease',
          }}>
            <span style={{ color: '#9cdcfe' }}>
              {call.functionName}(
            </span>
            {call.parameters.map((p, i) => (
              <span key={i} style={{ 
                color: i === 0 ? '#b5cea8' : '#d4d4d4' 
              }}>
                {i > 0 && ', '}
                {p}
              </span>
            ))}
            <span style={{ color: '#9cdcfe' }}>): </span>
            {call.returnValue !== undefined ? (
              <span style={{ color: '#27ca3f' }}>
                = {call.returnValue}
              </span>
            ) : (
              <span style={{ color: '#808080' }}>computing...</span>
            )}
          </div>
        );
      })}
    </div>
  );
};
```

#### 斐波那契特化时序

```typescript
// 每层递归调用
const recursiveCallDelay = 25;  // 0.83秒/调用

// 返回时强调
const returnEmphasize = 20;  // 0.67秒展示返回值

// 重复计算警告
const duplicateWarning = 30;  // 1秒展示重复计算问题
```

#### 二分查找特化

```typescript
// 🔍 二分查找特化
const BinarySearchDemo: React.FC = () => {
  // 搜索范围可视化
  const renderSearchRange = () => {
    return (
      <div style={{ position: 'relative', width: '1200px' }}>
        {items.map((item, index) => {
          const inRange = index >= left && index <= right;
          const isMid = index === mid;
          
          return (
            <div
              key={index}
              style={{
                backgroundColor: inRange ? '#2d2d30' : '#0a0a0a',
                borderColor: isMid ? '#e74c3c' : '#569cd6',
                opacity: inRange ? 1 : 0.3,
                // ...
              }}
            >
              {item}
            </div>
          );
        })}
        
        {/* 范围标记 */}
        <div style={{
          position: 'absolute',
          left: `${left * 120}px`,
          top: '-30px',
          color: '#4ec9b0',
          fontSize: '24px',
        }}>
          L
        </div>
        <div style={{
          position: 'absolute',
          left: `${right * 120}px`,
          top: '-30px',
          color: '#4ec9b0',
          fontSize: '24px',
        }}>
          R
        </div>
        <div style={{
          position: 'absolute',
          left: `${mid * 120}px`,
          bottom: '-30px',
          color: '#e74c3c',
          fontSize: '24px',
        }}>
          Mid
        </div>
      </div>
    );
  };
};
```

---

### 类别 4: 树结构算法

**适用算法**:
- 二叉树遍历 (Pre-order/In-order/Post-order)
- 二叉搜索树 (BST)
- 堆 (Heap)
- AVL 树平衡

**基础模式**: 弹性入场 + 连接线动画

#### 特化模板

```typescript
// 🌳 树节点组件
const TreeNode: React.FC<{
  value: number;
  x: number;
  y: number;
  status: 'default' | 'visiting' | 'visited' | 'highlight';
}> = ({ value, x, y, status }) => {
  // 入场动画
  const progress = spring({
    frame: frame - startFrame,
    fps,
    config: { damping: 15, stiffness: 100, mass: 1 }
  });
  
  const scale = interpolate(progress, [0, 0.6, 1], [0, 1.1, 1]);
  const opacity = interpolate(progress, [0, 0.3], [0, 1]);
  
  // 状态颜色
  const statusColor = {
    default: '#2d2d30',
    visiting: '#4ec9b0',    // 青色 - 正在访问
    visited: '#f1c40f',    // 黄色 - 已访问
    highlight: '#e74c3c',  // 红色 - 特别标记
  }[status];
  
  return (
    <div
      style={{
        position: 'absolute',
        left: `${x}px`,
        top: `${y}px`,
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        backgroundColor: statusColor,
        transform: `scale(${scale})`,
        opacity,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '32px',
        fontWeight: 'bold',
        color: '#1e1e1e',
        boxShadow: status === 'visiting' 
          ? '0 0 20px rgba(78, 201, 176, 0.8)' 
          : 'none',
      }}
    >
      {value}
    </div>
  );
};

// 🔗 连接线组件
const EdgeLine: React.FC<{
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  progress: number;
}> = ({ startX, startY, endX, endY, progress }) => {
  const currentX = interpolate(progress, [0, 1], [startX, endX]);
  const currentY = interpolate(progress, [0, 1], [startY, endY]);
  
  return (
    <svg style={{
      position: 'absolute',
      left: '0',
      top: '0',
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
    }}>
      <line
        x1={startX + 40}  // 节点中心
        y1={startY + 40}
        x2={currentX + 40}
        y2={currentY + 40}
        stroke="#569cd6"
        strokeWidth="3"
        strokeDasharray="5,5"
        opacity={0.6}
      />
    </svg>
  );
};
```

#### 树遍历特化时序

```typescript
// 访问每个节点
const visitDelay = 35;  // 1.17秒/节点

// 前序/中序/后序强调顺序
const orderEmphasize = 20;  // 0.67秒展示访问顺序

// 树结构生成动画
const treeBuildDelay = 25;  // 0.83秒/节点
```

---

### 类别 5: 图算法

**适用算法**:
- 深度优先搜索 (DFS)
- 广度优先搜索 (BFS)
- 最短路径 (Dijkstra)
- 最小生成树 (Prim/Kruskal)

**基础模式**: 节点搜索 + 边的动态可视化

#### 特化模板

```typescript
// 🕸️ 图节点
const GraphNode: React.FC<{
  id: string;
  x: number;
  y: number;
  status: 'unvisited' | 'queue' | 'visiting' | 'visited' | 'path';
}> = ({ id, x, y, status }) => {
  const statusStyle = {
    unvisited: { bg: '#2d2d30', border: '#569cd6' },
    queue: { bg: '#f1c40f', border: '#f39c12' },      // 黄色 - 队列中
    visiting: { bg: '#4ec9b0', border: '#16a085' },    // 青色 - 正在访问
    visited: { bg: '#27ca3f', border: '#1e8449' },     // 绿色 - 已访问
    path: { bg: '#e74c3c', border: '#c0392b' },       // 红色 - 最终路径
  }[status];
  
  return (
    <div style={{
      position: 'absolute',
      left: `${x}px`,
      top: `${y}px`,
      width: '60px',
      height: '60px',
      borderRadius: '50%',
      backgroundColor: statusStyle.bg,
      border: `3px solid ${statusStyle.border}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#1e1e1e',
      boxShadow: status === 'visiting' 
        ? '0 0 25px rgba(78, 201, 176, 0.9)' 
        : 'none',
    }}>
      {id}
    </div>
  );
};

// 🔗 可视化边
const GraphEdge: React.FC<{
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  weight?: number;
  status: 'inactive' | 'exploring' | 'selected' | 'path';
}> = ({ fromX, fromY, toX, toY, weight, status }) => {
  const strokeColor = {
    inactive: '#3c3c3c',
    exploring: '#4ec9b0',   // 青色 - 正在探索
    selected: '#f1c40f',   // 黄色 - 已选择
    path: '#e74c3c',       // 红色 - 最短路径
  }[status];
  
  return (
    <svg style={{
      position: 'absolute',
      left: '0',
      top: '0',
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
    }}>
      <line
        x1={fromX}
        y1={fromY}
        x2={toX}
        y2={toY}
        stroke={strokeColor}
        strokeWidth={status === 'path' ? 5 : 3}
        opacity={status === 'inactive' ? 0.3 : 1}
      />
      {weight !== undefined && (
        <text
          x={(fromX + toX) / 2}
          y={(fromY + toY) / 2 - 10}
          fill="#d4d4d4"
          fontSize="20"
          textAnchor="middle"
        >
          {weight}
        </text>
      )}
    </svg>
  );
};
```

#### BFS 特化

```typescript
// 🌊 BFS 层级可视化
const BFSVisualization: React.FC = () => {
  const levels = [
    [0],           // 第0层
    [1, 2],        // 第1层
    [3, 4, 5, 6],  // 第2层
    // ...
  ];
  
  return (
    <div>
      {levels.map((level, levelIndex) => (
        <div key={levelIndex} style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '20px',
          marginTop: '80px',
        }}>
          {level.map(nodeId => (
            <GraphNode
              key={nodeId}
              id={nodeId}
              x={nodeXPositions[nodeId]}
              y={levelIndex * 150}
              status={nodeStatus[nodeId]}
            />
          ))}
        </div>
      ))}
    </div>
  );
};
```

#### Dijkstra 特化

```typescript
// 🎯 Dijkstra 距离可视化
const DistanceLabel: React.FC<{
  nodeId: string;
  distance: number;
  isFinal: boolean;
}> = ({ nodeId, distance, isFinal }) => {
  return (
    <div style={{
      position: 'absolute',
      left: `${nodeX[nodeId] + 70}px`,
      top: `${nodeY[nodeId]}px`,
      backgroundColor: isFinal ? '#27ca3f' : '#f1c40f',
      padding: '4px 8px',
      borderRadius: '4px',
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#1e1e1e',
    }}>
      d={distance === Infinity ? '∞' : distance}
    </div>
  );
};
```

---

## 🎨 数据结构特化

### 数组 vs 链表

```typescript
// 🔗 链表节点特化
const ListNode: React.FC<{
  value: number;
  next?: ListNode;
}> = ({ value }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      {/* 节点 */}
      <div style={{
        width: '80px',
        height: '80px',
        borderRadius: '12px',
        backgroundColor: '#2d2d30',
        border: '3px solid #569cd6',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '32px',
        fontWeight: 'bold',
      }}>
        {value}
      </div>
      
      {/* 指针 */}
      <div style={{
        fontSize: '48px',
        color: '#4ec9b0',
        fontWeight: 'bold',
      }}>
        →
      </div>
    </div>
  );
};
```

### 栈 vs 队列

```typescript
// 📚 栈特化 (参考 StackHeapAnimation.tsx)
const StackVisualization: React.FC = () => {
  return (
    <div style={{
      position: 'relative',
      width: '600px',
      height: '400px',
      border: '3px solid #569cd6',
      borderTop: 'none',
      borderRadius: '0 0 12px 12px',
    }}>
      {/* 栈顶标记 */}
      <div style={{
        position: 'absolute',
        right: '-80px',
        top: '20px',
        color: '#4ec9b0',
        fontSize: '24px',
        fontWeight: 'bold',
      }}>
        TOP →
      </div>
      
      {/* 栈元素 (从上往下) */}
      {stackItems.map((item, index) => (
        <StackItem
          key={index}
          value={item}
          y={index * 50}  // 从顶部开始向下
        />
      ))}
    </div>
  );
};

// 🚶 队列特化
const QueueVisualization: React.FC = () => {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '20px',
    }}>
      {/* 入队端 */}
      <div style={{
        fontSize: '48px',
        color: '#4ec9b0',
      }}>
        ENQUEUE →
      </div>
      
      {/* 队列元素 */}
      <div style={{
        display: 'flex',
        gap: '10px',
        padding: '10px',
        border: '3px solid #569cd6',
        borderRadius: '12px',
        minWidth: '400px',
      }}>
        {queueItems.map((item, index) => (
          <QueueItem key={index} value={item} />
        ))}
      </div>
      
      {/* 出队端 */}
      <div style={{
        fontSize: '48px',
        color: '#27ca3f',
      }}>
        → DEQUEUE
      </div>
    </div>
  );
};
```

---

## ⚡ 性能优化建议

### 复杂算法可视化

```typescript
// ✅ 延迟渲染大型结构
const useLazyRender = (items: any[], delay: number) => {
  const [visibleItems, setVisibleItems] = useState(items.slice(0, 10));
  
  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleItems(prev => {
        const nextIndex = prev.length;
        if (nextIndex >= items.length) {
          clearInterval(interval);
          return prev;
        }
        return [...prev, items[nextIndex]];
      });
    }, delay);
    
    return () => clearInterval(interval);
  }, [items, delay]);
  
  return visibleItems;
};

// ✅ 虚拟化长列表
const VirtualizedList: React.FC<{ items: any[] }> = ({ items }) => {
  const [visibleRange, setVisibleRange] = useState({ start: 0, end: 10 });
  
  // 只渲染可见范围内的元素
  const visibleItems = items.slice(visibleRange.start, visibleRange.end);
  
  return (
    <div>
      {visibleItems.map(item => (
        <Item key={item.id} data={item} />
      ))}
    </div>
  );
};
```

---

## 📚 参考实现

本项目中的标准实现:
- `for-loop-animation/src/ForLoopDemo.tsx` - 线性遍历标准
- `stack-heap-animation/src/StackHeapAnimation.tsx` - 堆栈动画标准

推荐进一步研究:
- 排序算法可视化 (Sorting Visualization)
- 递归可视化 (Recursion Tree)
- 图算法 (Graph Traversal)

---

**最后更新**: 2026年7月19日  
**维护**: TuringTech Lab - EasyC++ 项目组
