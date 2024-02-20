import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ROLES } from '#constants/roles';
import { yupResolver } from '@hookform/resolvers/yup';
import { useResetForm } from '#hooks';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import { selectUserRole } from '#selectors';
import { Button, Input } from '#components';
import { setUser } from '#actions';
import { request } from '#utils';
import styles from './registration.module.scss';

const regFormSchema = yup.object().shape({
	login: yup
		.string()
		.required('Заполните логин')
		.matches(/^\w+$/, 'Неверно заполнен логин.Допускаются только буквы и цифры')
		.min(3, 'Неверно заполнен логин. Минимум 3 символа')
		.max(15, 'Неверно заполнен логин. Не больше 15 символов'),
	password: yup
		.string()
		.required('Заполните пароль')
		.matches(
			/^[\w#%]+$/,
			'Неверно заполнен пароль.Допускаются буквы,цифры и знаки #,%',
		)
		.min(6, 'Неверно заполнен пароль. Минимум 6 символов')
		.max(30, 'Неверно заполнен пароль. Не больше 30 символов'),
	passcheck: yup
		.string()
		.required('Заполните повтор пароля')
		.oneOf([yup.ref('password'), null], 'Пароли не совпадают'),
});

export const Registration = () => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		defaultValues: {
			login: '',
			password: '',
			passcheck: '',
		},
		resolver: yupResolver(regFormSchema),
	});
	const dispatch = useDispatch();
	const [serverError, setServerError] = useState(null);
	const roleId = useSelector(selectUserRole);
	const navigate = useNavigate();

	useResetForm(reset);

	const onSubmit = ({ login, password }) => {
		request('/register', 'POST', { login, password }).then(
			({ error, user }) => {
				if (error) {
					setServerError(`Ошибка запроса, ${error}`);
					return;
				}

				dispatch(setUser(user));
				sessionStorage.setItem('userData', JSON.stringify(user));
				navigate('/');
			},
		);
	};

	const formError =
		errors?.login?.message ||
		errors?.password?.message ||
		errors?.passcheck?.message;

	const errorMessage = formError || serverError;

	if (roleId !== ROLES.GUEST) {
		return <Navigate to="/" />;
	}

	return (
		<div className={styles.container}>
			<h1>Create account</h1>
			<br />
			<form onSubmit={handleSubmit(onSubmit)}>
				<div>
					<label htmlFor="login">Login</label>
					<br />
					<Input
						type="text"
						placeholder="enter login"
						id="login"
						{...register('login', {
							onChange: () => {
								setServerError(null);
							},
						})}
						autoFocus
					/>
				</div>
				<div>
					<label htmlFor="password">Password</label>
					<br />
					<Input
						type="password"
						placeholder="password"
						id="password"
						{...register('password', {
							onChange: () => {
								setServerError(null);
							},
						})}
					/>
				</div>
				<div>
					<label htmlFor="passcheck">Confirm password</label>
					<br />
					<Input
						type="password"
						placeholder="confirm password"
						id="passcheck"
						{...register('passcheck', {
							onChange: () => {
								setServerError(null);
							},
						})}
					/>
				</div>
				<Button className={styles.submitBtn} type="submit">
					Create account
				</Button>
			</form>
			<br />
			<div>
				<Link to="/login">Have an account? Log in</Link>
			</div>
			<div className={styles.errorMessage}>{errorMessage}</div>
		</div>
	);
};
