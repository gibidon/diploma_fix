import { useState, useEffect } from 'react';
import { useLoading } from '#hooks';
import { useParams } from 'react-router-dom';
import { Loader } from '#components';
import { BookingTemplate } from './components/booking-template';
import { request } from '#utils';
import styles from './user-page.module.scss';

export const UserPage = () => {
	const params = useParams();
	const [shouldUpdate, setShouldUpdate] = useState(false);
	const [userReservations, setUserReservations] = useState(null);
	const [error, setError] = useState(null);

	const { loading, setLoading } = useLoading();

	useEffect(() => {
		setLoading(true); //excessive?? together with updating and deleting function

		request(`/users/${params.id}/reservations`)
			.then((data) => {
				setUserReservations(data);
			})
			.catch((e) => setError(e))
			.finally(() => setLoading(false));
	}, [params.id, shouldUpdate, setLoading]);

	if (loading) return <Loader />;

	return (
		<>
			{error ? (
				<div>Error loading data</div>
			) : (
				<div>
					{userReservations?.length >= 1 ? (
						<div className={styles.userPage}>
							<h1>My bookings: </h1>

							<div className={styles.bookings}>
								{userReservations?.map(
									({ id, user, checkIn, checkOut, guestQuantity, hotel }) => (
										<BookingTemplate
											key={id}
											id={id}
											userLogin={user.login}
											checkIn={checkIn}
											checkOut={checkOut}
											guestQuantity={guestQuantity}
											hotel={hotel}
											updatePage={() => setShouldUpdate(!shouldUpdate)}
										/>
									),
								)}
							</div>
						</div>
					) : (
						<div>You have no bookings yet</div>
					)}
				</div>
			)}
		</>
	);
};
