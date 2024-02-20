import { useThemeContext } from '#hooks';
import styles from './footer.module.scss';

export const Footer = () => {
	const { theme } = useThemeContext();

	return (
		<div className={theme === 'light' ? styles.footerLight : styles.footerDark}>
			<div className={styles.content}>🄯 all rights reversed</div>
		</div>
	);
};
