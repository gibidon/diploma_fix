import { useState } from 'react';
import { request } from '#utils';
import { useLoading } from '#hooks';
import { EditableInput, Loader } from '#components';
import styles from './booking-template.module.scss';

export const BookingTemplate = ({
	id,
	userLogin,
	checkIn,
	checkOut,
	guestQuantity,
	hotel,
	updatePage,
}) => {
	const [formState, setFormState] = useState({
		id,
		userLogin,
		checkIn,
		checkOut,
		guestQuantity,
		hotel,
	});

	const { loading, setLoading } = useLoading();

	const onChange = ({ target }) =>
		setFormState({ ...formState, [target.name]: target.value });

	const updateReservation = (id) => {
		setLoading(true);

		request(`/users/reservations/${id}`, 'PATCH', {
			checkIn: formState.checkIn,
			checkOut: formState.checkOut,
			guestQuantity: formState.guestQuantity,
		})
			.catch(() => {
				throw new Error('Error updating reservetion');
			})
			.finally(() => updatePage());
	};

	const deleteReservation = (id) => {
		setLoading(true);

		request(`/users/reservations/${id}/hotels/${hotel}`, 'DELETE').then(() =>
			updatePage(),
		);
	};

	if (loading) return <Loader />;

	return (
		<div className={styles.template}>
			<div>Booking id: {id}</div>
			<div>User: {userLogin}</div>
			<div>
				<EditableInput
					id={'check-in'}
					label={'Check-in date:'}
					type={'text'}
					value={formState.checkIn.substring(0, 10)}
					name={'checkIn'}
					placeholder={'yyyy-mm-dd'}
					onChange={onChange}
				/>
			</div>
			<div>
				<EditableInput
					id={'check-out'}
					label={'Check-out date:'}
					type={'text'}
					value={formState.checkOut.substring(0, 10)}
					name={'checkOut'}
					placeholder={'yyyy-mm-dd'}
					onChange={onChange}
				/>
			</div>

			<div>
				<EditableInput
					id={'guestQuantity'}
					label={'Guest quantity:'}
					type={'number'}
					value={formState.guestQuantity}
					name={'guestQuantity'}
					onChange={onChange}
				/>
			</div>
			<div>Hotel: {hotel}</div>
			<div className={styles.buttons}>
				<button className={styles.removeBtn} onClick={() => deleteReservation(id)}>
					Delete reservation
				</button>
				<button className={styles.updateBtn} onClick={() => updateReservation(id)}>
					Update reservation
				</button>
			</div>
		</div>
	);
};
