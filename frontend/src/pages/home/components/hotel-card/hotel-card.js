import { Link } from 'react-router-dom';
import { useThemeContext } from '#hooks';
import styles from './hotel-card.module.scss';

export const HotelCard = ({ id, images, title }) => {
	const { theme } = useThemeContext();

	return (
		<Link to={`/hotel/${id}`}>
			<div className={theme === 'light' ? styles.card : styles.cardDark}>
				<div className={styles.title}>{title}</div>
				<img src={images[0]} alt={images[0]} />
			</div>
		</Link>
	);
};
