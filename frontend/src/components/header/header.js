import { ControlPanel, Logo, ToggleSwitch } from './components';
import { useThemeContext } from '#hooks';
import styles from './header.module.scss';

export const Header = () => {
	const { theme, toggleTheme } = useThemeContext();

	return (
		<div className={theme === 'light' ? styles.main : styles.mainDark}>
			{/* // <div className={styles.main}> */}
			<div className={styles.headerContent}>
				<div styles={styles.leftAligned}>
					<Logo />
				</div>

				<div className={styles.rightAligned}>
					<span>Switch to {theme === 'light' ? 'dark' : 'light'} mode</span>
					<ToggleSwitch toggleTheme={toggleTheme} />
					<ControlPanel />
				</div>
			</div>
		</div>
	);
};
