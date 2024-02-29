import { useState, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserRole } from '#selectors';
import { addReviewAsync } from '#actions';
import { ROLES } from '#constants';
import { Review } from './review';
import styles from './reviews.module.css';

//React.memo helps reduce rerenders a bit,though not necessary

export const Reviews = ({ reviews, hotelId }) => {
	const [newReview, setNewReview] = useState('');

	const dispatch = useDispatch();
	const userRole = useSelector(selectUserRole);

	const isGuest = userRole === ROLES.GUEST;

	const onNewReviewAdd = (hotelId, newReview) => {
		dispatch(addReviewAsync(hotelId, newReview));
		setNewReview('');
	};

	return (
		<div className={styles.reviews}>
			<div className={styles.header}>Reviews:</div>

			{reviews.map(({ _id, content, author }) => (
				<Review
					key={_id}
					content={content}
					author={author.login ?? author}
					reviewId={_id}
					hotelId={hotelId}
				/>
			))}

			{/* only logged-in users can leave reviews  */}
			{!isGuest && (
				<div className={styles.newComment}>
					<textarea
						className={styles.textarea}
						value={newReview}
						name="comment"
						placeholder="Добавить отзыв.."
						onChange={({ target }) => {
							setNewReview(target.value);
						}}
					></textarea>

					<button
						className={styles.addBtn}
						onClick={() => onNewReviewAdd(hotelId, newReview)}
					>
						add review
					</button>
				</div>
			)}
		</div>
	);
	// });
};
