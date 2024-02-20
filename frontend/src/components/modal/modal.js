import { useRef } from 'react';
import { Button } from '../button/button';
import { useSelector } from 'react-redux';
import {
	selectModalIsOpen,
	selectModalOnCancel,
	selectModalOnConfirm,
	selectModalText,
} from '#selectors';
import { useClickOutside } from '../../hooks/use-click-outside';
import styles from './styles.module.scss';

export const Modal = () => {
	const text = useSelector(selectModalText);
	const isOpen = useSelector(selectModalIsOpen);
	const onConfirm = useSelector(selectModalOnConfirm);
	const onCancel = useSelector(selectModalOnCancel);

	const boxRef = useRef(null);

	useClickOutside(boxRef, onCancel);

	if (!isOpen) {
		return null;
	}

	return (
		<div className={styles.modal}>
			<div className={styles.overlay}></div>
			<div className={styles.box} ref={boxRef}>
				<h3>{text}</h3>
				<div className={styles.buttons}>
					<Button width="120px" onClick={onConfirm}>
						Да
					</Button>
					<Button width="120px" onClick={onCancel}>
						Отмена
					</Button>
				</div>
			</div>
		</div>
	);
};
