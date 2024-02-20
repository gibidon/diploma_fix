import styles from './toggle-switch.module.scss';

export const ToggleSwitch = ({ toggleTheme }) => {
	return (
		<>
			<label className={styles.switch}>
				<input type="checkbox" onClick={toggleTheme} />
				<span className={styles.sliderRound}></span>
			</label>
		</>
	);
};
