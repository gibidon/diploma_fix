import { useEffect, useLayoutEffect, useState } from 'react';
import { useParams, useMatch } from 'react-router-dom';
import { loadHotelAsync, RESET_HOTEL_DATA } from '#actions';
import { useLoading } from '#hooks';
import { ROLES } from '#constants';
import { useDispatch, useSelector } from 'react-redux';
import { selectHotel } from '#selectors';
import { HotelForm, HotelContent } from './components';
import { Loader, PrivateContent } from '#components';

export const Hotel = () => {
	const [error, setError] = useState(null);
	const { loading, setLoading } = useLoading();

	const params = useParams();
	const dispatch = useDispatch();
	const hotel = useSelector(selectHotel);

	const isCreating = useMatch('/hotel/create');
	const isEditing = useMatch(`/hotel/${params.id}/edit`);

	useLayoutEffect(() => {
		dispatch(RESET_HOTEL_DATA);
	}, [dispatch, isCreating]);

	useEffect(() => {
		if (isCreating) {
			setLoading(false);
			return;
		}

		setLoading(true);

		dispatch(loadHotelAsync(params.id)).then((hotel) => {
			setError(hotel.error);
			setLoading(false);
		});
	}, [dispatch, params.id, isCreating, setLoading]);

	const SpecificHotelPage =
		isEditing || isCreating ? (
			<PrivateContent accessRoles={[ROLES.ADMIN]} serverError={error}>
				<HotelForm hotel={hotel} />
			</PrivateContent>
		) : (
			<HotelContent hotel={hotel} />
		);

	if (loading) return <Loader />;

	return error ? <div>Error: {error} </div> : SpecificHotelPage;
};
