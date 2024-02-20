import { useThemeContext } from '#hooks';
import styles from './layout-page.module.scss';

export const LayoutPage = ({ children }) => {
	const { theme } = useThemeContext();

	return (
		<div className={theme === 'light' ? styles.pageLight : styles.pageDark}>
			{children}
		</div>
	);
};
