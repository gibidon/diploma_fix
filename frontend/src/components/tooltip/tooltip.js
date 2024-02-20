import { useState, useRef } from 'react';
import styles from './tooltip.scss';

export const ToolTip = ({ children, text }) => {
	const [showToolTip, setShowToolTip] = useState(false);
	const timeout = useRef(null);

	const onMouseEnter = () => {
		timeout.current = setTimeout(() => {
			setShowToolTip(true);
		}, 250);
	};

	const onMouseLeave = () => {
		clearTimeout(timeout.current);
		setShowToolTip(false);
	};

	return (
		<div
			className={styles.container}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
		>
			{children}
			{showToolTip && <div className={styles.tooltip}>{text}</div>}
		</div>
	);
};
