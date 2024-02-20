import styles from './container.module.scss';

export const Container = ({ children, maxWidth, ...props }) => {
	return (
		<div
			className={styles.container}
			style={{ maxWidth: maxWidth + 'px', ...props }}
		>
			{children}
		</div>
	);
};
