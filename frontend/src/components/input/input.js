import { forwardRef } from 'react';
import { useThemeContext } from '#hooks';
import styles from './input.module.css';

export const Input = forwardRef(({ ...props }, ref) => {
	const { theme } = useThemeContext();

	return (
		<input
			className={theme === 'light' ? styles.input : styles.inputDark}
			{...props}
			ref={ref}
		></input>
	);
});
