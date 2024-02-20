import { useState, useLayoutEffect } from 'react';
import { saveHotelAsync, removeHotelAsync } from '#actions';
import { useMatch, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Input } from '#components';
import { FiSave } from 'react-icons/fi';
import { MdDeleteOutline } from 'react-icons/md';
import styles from './hotel-form.module.scss';

const emptyFormData = {
	title: '',
	description: '',
	price: '',
	country: '',
	rating: '',
	images: [],
};

export const HotelForm = ({ hotel }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const isCreating = useMatch('/hotel/create');

	const { id } = hotel;

	const [formState, setFormState] = useState({
		...hotel,
	});

	// if we come to url /hotel/edit,form data is taken from hotel(redux store). Otherwise we clean the form in useLayoutEffect:
	useLayoutEffect(() => {
		if (!id) setFormState(emptyFormData);
	}, [id]);

	const onSave = () => {
		dispatch(saveHotelAsync(id, formState)).then(({ id }) => {
			navigate(`/hotel/${id}`);
		});
	};

	const onDelete = () => {
		dispatch(removeHotelAsync(id)).then(() => {
			navigate('/');
		});
	};

	const onChange = ({ target }) =>
		setFormState({ ...formState, [target.name]: target.value });

	const onImageChange = (index, imageUrl) => {
		const newformState = { ...formState };
		newformState.images[index] = imageUrl;
		setFormState(newformState);
	};

	const deleteImageInForm = (index) => {
		setFormState({
			...formState,
			images: formState.images.toSpliced(index, 1),
		});
	};

	return (
		<form className={styles.form} onSubmit={(e) => e.preventDefault()}>
			<h1>{isCreating ? 'Создание' : 'Данные'} отеля</h1>

			<div>
				<Input
					name="title"
					id={'title'}
					value={formState.title}
					placeholder="Название отеля.."
					onChange={onChange}
				/>
			</div>

			<div>
				<textarea
					name="description"
					value={formState.description}
					placeholder="Описание.."
					className={styles.textarea}
					onChange={onChange}
				/>
			</div>

			<div>
				<Input
					name="country"
					value={formState.country}
					placeholder="Введите страну нахождения.."
					onChange={onChange}
				/>
			</div>
			<div>
				<Input
					name="price"
					value={formState.price}
					placeholder="Цена.."
					onChange={onChange}
				/>
			</div>
			<div>
				<Input
					name="rating"
					value={formState.rating}
					placeholder="Рейтинг.."
					onChange={onChange}
				/>
			</div>
			<div className={styles.images}>
				<h3>Image urls:</h3>
				{formState.images.map((image, index) => (
					<div key={index} className={styles.imageUrlRow}>
						<Input
							key={index}
							id={index}
							label={index}
							value={image}
							onChange={({ target }) => onImageChange(index, target.value)}
						/>
						<button
							onClick={() => {
								deleteImageInForm(index);
							}}
						>
							Delete
						</button>
					</div>
				))}
			</div>
			<button
				className={styles.addImageBtn}
				onClick={() =>
					setFormState({
						...formState,
						images: [...formState.images, ''],
					})
				}
			>
				add imageUrl
			</button>

			<button className={styles.saveBtn} onClick={onSave}>
				<FiSave size="21px" margin="0 10px 0 0" />
			</button>

			{/* if not a creating mode,show delete button */}
			{!isCreating && (
				<button className={styles.deleteBtn} onClick={onDelete}>
					<MdDeleteOutline size="21px" margin="0 10px 0 0" />
				</button>
			)}
		</form>
	);
};
