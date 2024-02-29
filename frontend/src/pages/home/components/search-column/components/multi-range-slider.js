import styles from './multi-range-slider.module.css';

export const MultiRangeSlider = ({ min, max, onChange }) => {
	return (
		<>
			<input
				type="range"
				name="min"
				min="100"
				max="400"
				value={min}
				onChange={onChange}
			/>
			<input
				type="range"
				name="max"
				min="101"
				max="400"
				value={max}
				onChange={onChange}
			/>
			<div className="slider">
				<div className="slider__track" />
				<div className="slider__range" />
			</div>
		</>
	);
};
