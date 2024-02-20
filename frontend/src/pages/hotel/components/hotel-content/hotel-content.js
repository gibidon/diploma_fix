import { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectUserRole, selectUserId } from '#selectors';
import { ROLES } from '#constants';
import { PrivateContent } from '#components';
import { Slider } from '../slider/Slider';
import { Reviews } from '../reviews/Reviews';
import { BookingForm } from '../booking-form/booking-form';
import { request } from '#utils';
import styles from './hotel-content.module.scss';

export const HotelContent = ({ hotel }) => {
	const [showReservationForm, setShowReservationForm] = useState(false);
	const [error, setError] = useState('');
	const formRef = useRef(null);

	const { id, title, images, country, reviews, description, price, rating } = hotel;

	const userId = useSelector(selectUserId);
	const userRole = useSelector(selectUserRole);
	const isLogged = userRole !== ROLES.GUEST;
	const isAdmin = userRole === ROLES.ADMIN;

	const submitReservationForm = async (formData) => {
		try {
			const { error } = await request(`/users/${userId}/reservations`, 'POST', {
				...formData,
				user: userId,
				hotel: id,
			});

			if (error) setError(error);
		} catch (error) {
			throw new Error('Something wrong happened when submitting form..');
		}

		setShowReservationForm(false);
	};

	return (
		<div className={styles.hotelContent}>
			<div className={styles.header}>
				<div className={styles.leftAligned}>
					<h1>{title}</h1>
					<span className={styles.stars}>
						{[...Array(Number(rating))].map((star, index) => (
							<span key={index} className={styles.rating}>
								&#9733;
							</span>
						))}
					</span>
				</div>
				<div className={styles.rightAligned}>
					{isAdmin && (
						<PrivateContent accessRoles={[ROLES.ADMIN]}>
							<Link to={`/hotel/${id}/edit`}>
								<span className={styles.editPanel}>Edit hotel</span>
							</Link>
						</PrivateContent>
					)}
				</div>
			</div>

			<div className={styles.content}>
				<Slider images={images} />
				<div className={styles.description}>
					<span className={styles.description_country}>Country: {country}</span>
					{description}
					<span className={styles.description_price}>Price: {price} $ per night</span>

					<button
						className={isLogged ? styles.bookBtn : styles.bookBtnDisabled}
						disabled={!isLogged}
						onClick={(e) => {
							e.stopPropagation();
							setShowReservationForm(true);
							formRef.current?.scrollIntoView({ behavior: 'smooth' });
							setError('');
						}}
					>
						Book now
					</button>
				</div>
			</div>
			<div className={styles.errorMessage}>{error && <div>Error: {error}</div>}</div>

			<div ref={formRef}>
				{showReservationForm && (
					<BookingForm
						submitForm={submitReservationForm}
						cancelForm={() => setShowReservationForm(!showReservationForm)}
					/>
				)}
			</div>

			<Reviews reviews={reviews} hotelId={id} />
		</div>
	);
};
