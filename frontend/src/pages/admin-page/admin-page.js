import { useState, useEffect } from 'react';
import { BoldText, Loader, Dropdown, PrivateContent } from '#components';
import { useSelector } from 'react-redux';
import { ROLES } from '#constants';
import { useLoading } from '#hooks';
import { selectUserRole } from '#selectors';
import { checkAccess, request } from '#utils';
import { HotelForm } from '../hotel/components/hotel-form/hotel-form';
import styles from './admin-page.module.scss';

export const AdminPage = () => {
	const [users, setUsers] = useState([]);
	const [hotels, setHotels] = useState([]);
	const [shouldUpdatePage, setShouldUpdatePage] = useState(false);
	const { loading, setLoading } = useLoading();
	const userRole = useSelector(selectUserRole);

	useEffect(() => {
		if (!checkAccess([ROLES.ADMIN], userRole)) {
			return;
		}
		setLoading(true);

		Promise.all([request('/users'), request('/hotels?limit=30')]).then(
			([{ users }, { hotels }]) => {
				setUsers(users);
				setHotels(hotels);
				setLoading(false);
			},
		);
	}, [shouldUpdatePage, setLoading, userRole]);

	const deleteUser = (id) => {
		request(`/users/${id}`, 'DELETE').then(setShouldUpdatePage(!shouldUpdatePage));
	};

	if (loading) return <Loader />;

	return (
		<PrivateContent accessRoles={[ROLES.ADMIN]}>
			<h1>Admin page</h1>

			<div className={styles.userList}>
				<h2>User list: </h2>
				{users.map(({ id, login, reservations }, index) => (
					<div className={styles.user} key={index}>
						<BoldText>User login : {login} </BoldText>
						<Dropdown openBtnText={'More info'} closeBtnText={'Hide'}>
							<div>Id: {id}</div>
							<div>Login: {login}</div>
							<div>
								Reservations:
								{reservations.map((reservation) => (
									<div key={reservation}>{reservation}</div>
								))}
							</div>
							<div>
								<button onClick={() => deleteUser(id)}>Delete user</button>
							</div>
						</Dropdown>
					</div>
				))}
			</div>
			<div className={styles.hotelList}>
				<h2>Hotel list:</h2>

				{hotels.map((hotel, index) => (
					<div className={styles.hotel}>
						<div>Hotel №{index}</div>

						<Dropdown openBtnText={'more info'} closeBtnText={'hide'}>
							<HotelForm hotel={hotel} />
						</Dropdown>
					</div>
				))}
			</div>
		</PrivateContent>
	);
};
