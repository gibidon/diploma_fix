import { useState } from 'react';
import { useDebouncedFunction, useApi, useLoading } from '#hooks';
import { HotelCard, SearchColumn } from './components';
import { DEBOUNCE_DELAY, PAGINATION_LIMIT } from '#constants';
import { BoldText, Loader } from '#components';
import styles from './home.module.scss';

const initialSearchParams = {
	searchPhrase: '',
	page: 1,
	PAGINATION_LIMIT,
	country: '',
	min: 1,
	max: 1000,
	rating: null,
};

export const Home = () => {
	//option1,uncontrolled inputs in SearchColumn
	const [searchParams, setSearchParams] = useState(initialSearchParams);
	const { loading } = useLoading();
	const { searchPhrase, page, country, min, max } = searchParams;

	const {
		data: { hotels },
	} = useApi('hotels.all', searchPhrase, page, PAGINATION_LIMIT, country, min, max);

	const debouncedSearch = useDebouncedFunction(setSearchParams, DEBOUNCE_DELAY);

	const onChange = (e) => {
		debouncedSearch({
			...searchParams,
			[e.target.name]: e.target.value,
		});
	};

	return (
		<div className={styles.home}>
			<SearchColumn
				searchPhrase={searchPhrase}
				country={country}
				min={min}
				max={max}
				onChange={onChange}
			/>
			<div className={styles.content}>
				{loading && <Loader />}

				{hotels?.length >= 1 ? (
					hotels.map(({ title, id, images, price }) => (
						<HotelCard key={id} id={id} title={title} images={images} price={price} />
					))
				) : (
					<BoldText fontWeight={700}>
						По выбранным критериям не найдено результатов. Пожалуйста, уточните параметры
						поиска
					</BoldText>
				)}
			</div>
		</div>
	);
};

//option2

//below is the version with precise instructions, useEffect launched only once to load initial page:
//loadHotels function must preceed Home component,so it's a closure access
//this options allows making controlled inputs in SearchColumn

// const loadHotels = async (searchPhrase, page, PAGINATION_LIMIT, country, min, max) => {
// 	const response = await fetch(
// 		`/hotels?search=${searchPhrase}&page=${page}&limit=${PAGINATION_LIMIT}&country=${country}&min=${min}&max=${max}`,
// 	);
// 	const { hotels } = await response.json();
// 	return hotels;
// };

// -----------------------------------------------------------------

// const [hotels, setHotels] = useState([]);
// const [searchParams, setSearchParams] = useState(initialSearchParams);
// const { loading, setLoading } = useLoading();
// const { searchPhrase, page, country, min, max } = searchParams;
// let timeout = useRef(null);

// const onChange = async (e) => {
// 	const newParams = { ...searchParams, [e.target.name]: e.target.value };
// 	setSearchParams(newParams);

// 	const { searchPhrase, country, min, max } = newParams;
// 	clearTimeout(timeout.current);

// 	timeout.current = setTimeout(async () => {
// 		setLoading(true);

// 		const hotels = await loadHotels(
// 			searchPhrase,
// 			page,
// 			PAGINATION_LIMIT,
// 			country,
// 			min,
// 			max,
// 		);

// 		setLoading(false);
// 		setHotels(hotels);
// 	}, DEBOUNCE_DELAY);
// };

// useEffect(() => {
// 	setLoading(true);
// 	loadHotels(searchPhrase, page, PAGINATION_LIMIT, country, min, max)
// 		.then((hotels) => setHotels(hotels))
// 		.finally(() => setLoading(false));
// }, []);

//---------------------------------------------------------

//and option3
//with shouldUpdate flag
