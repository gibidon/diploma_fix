import { useState } from 'react';
import styles from './dropdown.module.scss';

export const Dropdown = ({ children, openBtnText, closeBtnText }) => {
	const [state, setState] = useState(false);

	return (
		<div>
			<button className={styles.button} onClick={() => setState(!state)}>
				{state ? closeBtnText : openBtnText}
			</button>
			<div>{state && children}</div>
		</div>
	);
};
