import { useState, useRef, useEffect } from 'react';
import styles from './editable-input.scss';

export const EditableInput = ({ id, label, value, ...props }) => {
	const [editMode, setEditMode] = useState(false);
	const inputRef = useRef();

	const stopEditMode = () => {
		setEditMode(false);
	};

	const startEditMode = () => {
		setEditMode(true);
	};

	// const onEditHandler = () => {
	// 	stopEditMode();
	// };
	const onEditHandler = () => {
		stopEditMode();
	};

	useEffect(() => {
		if (!editMode) return;

		inputRef?.current?.focus();
	}, [editMode]);

	return (
		<div className={styles.inputWrapper}>
			<div className={styles.header}>
				<label htmlFor={id}>{label}</label>
				{editMode ? (
					<>
						{/* <button className={styles.actionBtn} onClick={onEditHandler}> */}
						<button className={styles.actionBtn} onClick={stopEditMode}>
							Save
						</button>
						<button className={styles.actionBtn} onClick={stopEditMode}>
							Cancel
						</button>
					</>
				) : (
					<button className={styles.actionBtn} onClick={startEditMode}>
						Edit
					</button>
				)}
			</div>
			<input
				id={id}
				{...props}
				value={value}
				ref={inputRef}
				className={styles.input}
				readOnly={!editMode}
			/>
		</div>
	);
};
