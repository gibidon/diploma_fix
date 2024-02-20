import { Link } from 'react-router-dom';
import styles from './logo.module.scss';

export const Logo = () => {
	return (
		<div className={styles.logo}>
			<Link to="/">Hotels.com</Link>
		</div>
	);
};
