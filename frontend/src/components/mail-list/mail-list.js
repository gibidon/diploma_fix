import { useThemeContext } from '#hooks';
import { request } from '#utils';
import { useDispatch } from 'react-redux';
import { openModal, CLOSE_MODAL } from '#actions';
import styles from './mail-list.module.scss';

export const MailList = () => {
	const { theme } = useThemeContext();
	const dispatch = useDispatch();

	const addSubscription = (e) => {
		e.stopPropagation();

		dispatch(
			openModal({
				text: 'Подписаться на рассылку?',
				onConfirm: async () => {
					await request('/subscriptions', 'POST', e.target.value);
					dispatch(CLOSE_MODAL);
				},
				onCancel: () => {
					dispatch(CLOSE_MODAL);
				},
			}),
		);
	};

	return (
		<div className={theme === 'light' ? styles.mail : styles.mailDark}>
			<h1 className={styles.mailTitle}>Save time, save money!</h1>
			<span className={styles.mailDesc}>
				Sign up and we'll send the best deals to you
			</span>
			<div className={styles.mailInputContainer}>
				<input type="text" placeholder="Your Email" />
				<button onClick={addSubscription}>Subscribe</button>
			</div>
		</div>
	);
};
