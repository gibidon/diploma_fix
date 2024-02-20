import { useState } from 'react';
import { FaBed } from 'react-icons/fa6';
import { CiCalendar } from 'react-icons/ci';
import { BsPersonStanding } from 'react-icons/bs';
import { DateRange } from 'react-date-range';
import format from 'date-fns/format';
import styles from './header-search.module.scss';

export const HeaderSearch = () => {
	const [openDate, setOpenDate] = useState(false);
	const [openOptions, setOpenOptions] = useState(false);
	const [options, setOptions] = useState({ adult: 1, children: 0, room: 1 });
	const [date, setDate] = useState([
		{
			startDate: new Date(),
			endDate: new Date(),
			key: 'selection',
		},
	]);

	const handleOption = (e, name, operation) => {
		e.stopPropagation();
		setOptions((prev) => ({
			...prev,
			[name]: operation === 'increase' ? options[name] + 1 : options[name] - 1,
		}));
	};

	return (
		<div className={styles.headerSearch}>
			<div className={styles.headerSearchItem}>
				<FaBed />
				<input
					type="text"
					placeholder="where are you going?"
					className={styles.headerSearchInput}
				/>
			</div>
			<div className={styles.headerSearchItem}>
				<CiCalendar />
				<span
					onClick={() => setOpenDate(!openDate)}
					className={styles.headerSearchText}
				>{`${format(date[0].startDate, 'MM//dd/yyyy')} to ${format(
					date[0].startDate,
					'MM//dd/yyyy',
				)}`}</span>
				{openDate && (
					<DateRange
						editableDateInputs={true}
						onChange={(item) => setDate([item.selection])}
						moveRangeOnFirstSelection={false}
						ranges={date}
						className={styles.date}
					/>
				)}
			</div>
			<div className={styles.headerSearchItem}>
				<BsPersonStanding />
				<span
					onClick={() => setOpenOptions(!openOptions)}
					className={styles.headerSearchText}
				>
					{`${options.adult} adult | ${options.children} children | ${options.room} room`}
					{openOptions && (
						<div className={styles.options}>
							<div className={styles.optionItem}>
								<span className={styles.optionText}>Adult</span>
								<div className={styles.optionCounter}>
									<button
										className={styles.optionCounterButton}
										onClick={(e) => handleOption(e, 'adult', 'decrease')} //component TODO
										disabled={options.adult <= 1} //useClickOutside
									>
										-
									</button>
									<span className={styles.optionCounterNumber}>
										{options.adult}
									</span>
									<button
										className={styles.optionCounterButton}
										onClick={(e) => handleOption(e, 'adult', 'increase')}
									>
										+
									</button>
								</div>
							</div>
							<div className={styles.optionItem}>
								<span className={styles.optionText}>Children</span>
								<div className={styles.optionCounter}>
									<button
										className={styles.optionCounterButton}
										onClick={(e) => handleOption(e, 'children', 'decrease')}
										disabled={options.children <= 0}
									>
										-
									</button>
									<span className={styles.optionCounterNumber}>
										{options.children}
									</span>
									<button
										className={styles.optionCounterButton}
										onClick={(e) => handleOption(e, 'children', 'increase')}
									>
										+
									</button>
								</div>
							</div>
							<div className={styles.optionItem}>
								<span className={styles.optionText}>Room</span>
								<div className={styles.optionCounter}>
									<button
										className={styles.optionCounterButton}
										onClick={(e) => handleOption(e, 'room', 'decrease')} //TODO component
										disabled={options.room <= 1}
									>
										-
									</button>
									<span className={styles.optionCounterNumber}>
										{options.room}
									</span>
									<button
										className={styles.optionCounterButton}
										onClick={(e) => handleOption(e, 'room', 'increase')}
									>
										+
									</button>
								</div>
							</div>
						</div>
					)}
				</span>
			</div>
			<div className={styles.headerSearchItem}>
				<button className={styles.headerBtn}>Search</button>
			</div>
		</div>
	);
};
