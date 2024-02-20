import { Input } from '#components';
import { useThemeContext } from '#hooks';
import styles from './search-column.module.scss';

export const SearchColumn = ({ searchPhrase, country, min, max, onChange }) => {
	const { theme } = useThemeContext();

	return (
		<div className={theme === 'light' ? styles.searchColumn : styles.searchColumnDark}>
			<h1>Search by:</h1>
			<div>
				<label htmlFor="searchPhrase">Title:</label>
				<Input
					type="text"
					id="searchPhrase"
					name="searchPhrase"
					// value={searchPhrase}
					onChange={onChange}
				/>
			</div>

			<div>
				<label>
					Country:
					<select onChange={onChange} name="country" className={styles.select}>
						<option value=""></option>
						<option value="Thailand">Thailand</option>
						<option value="Cyprus">Cyprus</option>
						<option value="Vietnam">Vietnam</option>
						<option value="Mauritius">Mauritius</option>
						<option value="Canary Islands">Canary Islands</option>
						<option value="Egypt">Egypt</option>
						<option value="Turkey">Turkey</option>
					</select>
				</label>
			</div>
			<div>
				<label htmlFor="min">Minimum price per night:</label>
				<Input
					type="number"
					id="min"
					name="min"
					// value={min}
					onChange={onChange}
					step="50"
				/>
			</div>
			<div>
				<label htmlFor="max">Maximum price per night:</label>
				<Input
					type="number"
					id="max"
					name="max"
					// value={max}
					onChange={onChange}
					step="50"
				/>
			</div>
		</div>
	);
};
