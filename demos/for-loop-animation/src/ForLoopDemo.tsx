import {AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Sequence} from 'remotion';
import { COLORS_V2, backgroundStyleV2 } from './styles-v2';
import { CodeFrameV2 } from './CodeFrameV2';

export const ForLoopDemo: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	// Animation timing - 11 numbers (0-10, where 10 represents out-of-bounds)
	const initialShowFrame = 30;
	const searchStartFrame = 60;
	const frameDelay = 12; // Faster search (12 frames per number)
	const searchEndIndex = 10; // Search up to idx=10 which would be out-of-bounds
	const finalSearchFrame = searchStartFrame + (searchEndIndex * frameDelay);
	const conditionRejectFrame = finalSearchFrame + 20; // After idx=10, condition turns red
	const conditionRejectDuration = 30; // Show red condition for 1 second
	const fadeOutStartFrame = conditionRejectFrame + conditionRejectDuration;
	const fadeOutDuration = 20;
	const gatherStartFrame = fadeOutStartFrame + fadeOutDuration;
	const gatherDuration = 45;
	const pauseAfterGather = 30;

	const currentSearchIndex = Math.min(10, Math.floor(Math.max(0, (frame - searchStartFrame) / frameDelay)));
	const isSearching = frame >= searchStartFrame && frame < finalSearchFrame;
	const isConditionReject = frame >= finalSearchFrame && frame < fadeOutStartFrame;
	const isFadingOut = frame >= fadeOutStartFrame && frame < fadeOutStartFrame + fadeOutDuration;
	const isGathering = frame >= gatherStartFrame && frame < gatherStartFrame + gatherDuration;
	const isPaused = frame >= gatherStartFrame + gatherDuration && frame < gatherStartFrame + gatherDuration + pauseAfterGather;
	const isComplete = frame >= gatherStartFrame + gatherDuration + pauseAfterGather;

	const evenNumbers = [0, 2, 4, 6, 8];

	// Code lines - we want to highlight the condition
	const renderCodeLine = (line: string, keywords: string[], highlightCondition: boolean) => {
		let parts = [line];
		keywords.forEach(keyword => {
			const newParts: string[] = [];
			parts.forEach(part => {
				const splits = part.split(keyword);
				for (let i = 0; i < splits.length; i++) {
					newParts.push(splits[i]);
					if (i < splits.length - 1) {
						let color = COLORS_V2.syntax.default;
						if (keyword === 'for' || keyword === 'if') color = COLORS_V2.syntax.keyword;
						else if (keyword === 'int') color = COLORS_V2.syntax.type;
						else if (keyword === 'idx' || keyword === 'cout' || keyword === 'endl') color = COLORS_V2.syntax.variable;

						// Highlight the condition idx < 10 in red when out-of-bounds check
						const isConditionPart = keyword === 'idx' && highlightCondition;

						newParts.push(`<span style="color: ${isConditionPart ? '#e74c3c' : color}">${keyword}</span>`);
					}
				}
				parts = newParts;
			});
		});
		return parts.join('');
	};

	// Compute X position for each number (0-10)
	// 11 numbers at 120px apart = total span 1200px (from 0 to 1200)
	// 5 even numbers gathered at 120px apart = total 480px (from startX to startX+480)
	// To center 5 numbers in 1200px span: (1200 - 480) / 2 = 360px
	const GATHER_START_X = 360;

	const getXPosition = (num: number): number => {
		if (isGathering || isPaused || isComplete) {
			const isEven = num % 2 === 0 && num !== 10; // 10 is out-of-bounds
			if (!isEven) return 0;
			const targetIndex = evenNumbers.indexOf(num);
			return GATHER_START_X + targetIndex * 120;
		}
		return num * 120;
	};

	const getSmoothX = (num: number): number => {
		if (isGathering || isPaused || isComplete) {
			const isEven = num % 2 === 0 && num !== 10;
			if (!isEven) return 0;
			const targetX = getXPosition(num);
			const startX = num * 120;
			const progress = spring({
				frame: frame - gatherStartFrame,
				fps,
				config: {damping: 200, stiffness: 180, mass: 0.6}
			});
			return interpolate(progress, [0, 1], [startX, targetX]);
		}
		return num * 120;
	};

	// Render all 11 boxes (0-10)
	const renderAllBoxes = () => {
		return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => {
			const isEven = num % 2 === 0;
			const isOutOfBounds = num === 10;

			// Determine colors
			let boxColor = '#2d2d30';
			let textColor = '#d4d4d4';
			let hasGlow = false;

			if (isSearching) {
				const searchedIndex = currentSearchIndex;
				if (num < searchedIndex) {
					// Already searched
					if (isEven && !isOutOfBounds) {
						boxColor = '#f1c40f';
						textColor = '#1e1e1e';
					}
				} else if (num === searchedIndex) {
					// Currently being searched - cyan with glow
					boxColor = '#4ec9b0';
					textColor = '#1e1e1e';
					hasGlow = true;
				}
			} else if (frame >= finalSearchFrame) {
				if (isEven && !isOutOfBounds) {
					boxColor = '#f1c40f';
					textColor = '#1e1e1e';
				}
			}

			// Opacity for fade out (odd numbers AND the out-of-bounds 10)
			let opacity = 1;
			if (isFadingOut && (!isEven || isOutOfBounds)) {
				opacity = interpolate(frame, [fadeOutStartFrame, fadeOutStartFrame + fadeOutDuration], [1, 0], {extrapolateRight: 'clamp'});
			} else if ((isGathering || isPaused || isComplete) && (!isEven || isOutOfBounds)) {
				opacity = 0;
			}

			// Initial appearance animation
			const initialScale = spring({
				frame: frame - initialShowFrame,
				fps,
				config: {damping: 15, stiffness: 100, mass: 1}
			});

			const xPos = getSmoothX(num);

			return (
				<div
					key={num}
					style={{
						position: 'absolute',
						left: `${xPos}px`,
						width: '100px',
						height: '100px',
						boxSizing: 'border-box',
						borderRadius: '12px',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						fontSize: '42px',
						fontWeight: 'bold',
						fontFamily: '"Microsoft YaHei", "SimHei", Arial, sans-serif',
						backgroundColor: boxColor,
						color: textColor,
						border: '3px solid #569cd6',
						transform: `scale(${frame >= initialShowFrame ? initialScale : 0})`,
						opacity: opacity,
						boxShadow: hasGlow ? '0 0 25px rgba(78, 201, 176, 0.9)' : 'none',
					}}
				>
					{num}
				</div>
			);
		});
	};

	return (
        <AbsoluteFill style={{
			background: `linear-gradient(to bottom, ${COLORS_V2.background.top} 0%, ${COLORS_V2.background.middle} 40%, ${COLORS_V2.background.bottom} 100%)`,
			color: COLORS_V2.text.primary,
			fontFamily: '"Microsoft YaHei", "SimHei", Arial, sans-serif',
			display: 'flex',
			flexDirection: 'column',
			padding: '60px',
			position: 'relative',
			overflow: 'hidden',
		}}>
            {/* Code Display - Top Section */}
            <Sequence from={0} durationInFrames={500} style={{
                transform: 'translateY(300px)',
                translate: "0px -92.6px"
            }}>
				<div style={{
					flex: 1,
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'flex-start',
					alignItems: 'center',
					marginBottom: '40px'
				}}>
					{/* 使用 CodeFrameV2 组件 - MG风格窗口控件 */}
					<CodeFrameV2
						filename="forloop.cpp"
						lines={[
							{text: 'for (int idx = 0; idx < 10; idx++) {', keywords: ['for', 'int', 'idx'], highlight: isConditionReject ? ['idx'] : []},
							{text: '    if (idx % 2 == 0) {', keywords: ['if', 'idx']},
							{text: '        cout << idx << endl;', keywords: ['cout', 'idx', 'endl']},
							{text: '    }', keywords: []},
							{text: '}', keywords: []},
						]}
					/>
				</div>
			</Sequence>
            {/* Loop Visualization - Bottom Section */}
            <Sequence
                from={initialShowFrame}
                durationInFrames={500}
                style={{
                    transform: 'translateY(300px)',
                    translate: "0px -102.4px"
                }}>
				<div style={{
					flex: 1,
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center'
				}}>
					<div style={{
						position: 'relative',
						width: '1300px',
						height: '100px'
					}}>
						{renderAllBoxes()}
					</div>

					<div style={{
						marginTop: '60px',
						fontSize: '32px',
						color: isConditionReject ? '#e74c3c' : '#569cd6',
						fontFamily: '"Microsoft YaHei", "SimHei", Arial, sans-serif',
						textAlign: 'center',
						fontWeight: 'bold'
					}}>
						{frame < searchStartFrame ? '数字0-10就绪，开始循环检查' :
						 isSearching ? `检查 idx = ${currentSearchIndex}` :
						 isConditionReject ? 'idx < 10 条件不满足，停止循环' :
						 isFadingOut ? '筛选偶数...' :
						 isGathering ? '收集结果...' :
						 isPaused ? '偶数: 0, 2, 4, 6, 8' :
						 '输出结果: 0, 2, 4, 6, 8'}
					</div>
				</div>
			</Sequence>
        </AbsoluteFill>
    );
};
