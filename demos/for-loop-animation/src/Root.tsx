import {Composition} from 'remotion';
import {ForLoopDemo} from './ForLoopDemo';

export const RemotionRoot: React.FC = () => {
	return (
		<>
			<Composition
				id="ForLoopDemo"
				component={ForLoopDemo}
				durationInFrames={500}
				fps={30}
				width={1920}
				height={1080}
				defaultProps={{
					// Add default props here
				}}
			/>
		</>
	);
};
