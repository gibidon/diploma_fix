import { useDispatch, useSelector } from 'react-redux';
import { removeReviewAsync, openModal, CLOSE_MODAL } from '#actions';
import { selectUserRole } from '#selectors';
import { ROLES } from '#constants';
import { useThemeContext } from '#hooks';
import styles from './review.module.scss';

export const Review = ({ content, author, hotelId, reviewId }) => {
	const dispatch = useDispatch();
	const userRole = useSelector(selectUserRole);
	const { theme } = useThemeContext();

	const isAdmin = [ROLES.ADMIN].includes(userRole);

	const onDeleteReview = (e) => {
		e.stopPropagation();

		dispatch(
			openModal({
				text: 'Удалить отзыв?',
				onConfirm: () => {
					dispatch(removeReviewAsync(hotelId, reviewId));
					dispatch(CLOSE_MODAL);
				},
				onCancel: () => {
					dispatch(CLOSE_MODAL);
				},
			}),
		);
	};

	return (
		<div className={theme === 'light' ? styles.review : styles.reviewDark}>
			<div className={styles.content}>{content}</div>
			<div className={styles.author}> Author: {author}</div>
			{isAdmin && <button onClick={onDeleteReview}>Delete</button>}
		</div>
	);
};
