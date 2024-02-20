import { Input } from '#components';
import { IoCheckmark } from 'react-icons/io5';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { convertDateToString } from '#utils';
import { YYYYMMDDRegex } from '#constants';
import styles from './booking-form.module.scss';

import { useClickOutside } from '../../../../hooks/use-click-outside';
import { useRef } from 'react';

const bookingFormSchema = yup.object().shape({
	checkIn: yup
		.date('Укажите дату в формате ГГГГ-ММ-ДД')
		.required('Обязательное поле')
		.min(new Date(), 'Дата начала не ранее чем сегодня')
		.test('yyyy-mm-dd', (value) => YYYYMMDDRegex.test(convertDateToString(value))),

	checkOut: yup
		.date('Укажите дату в формате ГГГГ-ММ-ДД')
		.min(yup.ref('checkIn'), 'Дата выезда не может быть ранее даты заезда')
		.required('Обязательное поле')
		.test('yyyy-mm-dd', (value) => YYYYMMDDRegex.test(convertDateToString(value))),

	guestQuantity: yup
		.number('Укажите количество гостей в числовом формате')
		.required('Укажите количество гостей')
		.positive('Число посетителей должно быть не менее 1')
		.integer('Допустимо только целое число'),
});

export const BookingForm = ({ submitForm, cancelForm }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: { checkIn: '', checkOut: '', guestQuantity: 1 },
		resolver: yupResolver(bookingFormSchema),
	});

	const formRef = useRef(null);
	useClickOutside(formRef, () => cancelForm());

	const onSubmit = ({ checkIn, checkOut, guestQuantity }) => {
		submitForm({ checkIn, checkOut, guestQuantity });
	};

	const errorMessage =
		errors?.checkIn?.message ||
		errors?.checkOut?.message ||
		errors?.guestQuantity?.message;

	return (
		<form className={styles.form} onSubmit={handleSubmit(onSubmit)} ref={formRef}>
			<h1 className={styles.title}>Пожалуйста, заполните детали поездки:</h1>

			<div>
				<Input placeholder="Дата заезда yyyy-mm-dd" {...register('checkIn')} />
			</div>

			<div>
				<Input
					name="checkOut"
					placeholder="Дата выезда yyyy-mm-dd"
					{...register('checkOut')}
				/>
			</div>

			<div>
				<Input
					name="guestQuantity"
					placeholder="Количество гостей.."
					{...register('guestQuantity')}
				/>
			</div>

			<div>{errorMessage}</div>
			<div className={styles.buttons}>
				<button className={styles.sendFormBtn} type="submit">
					<IoCheckmark size="20px" />
				</button>

				<button className={styles.cancelFormBtn} onClick={() => cancelForm()}>
					Cancel
				</button>
			</div>
		</form>
	);
};
