import { Link } from 'react-router-dom';
import styles from './404.module.scss';

export const Page404 = () => {
	return (
		<div className={styles.main}>
			<div className={styles.text}>Oops,looks like the page is not found..</div>
			<br />
			<div>
				<Link to="/">
					<button className={styles.button}>Go to the main page</button>
				</Link>
			</div>
		</div>
	);
};
