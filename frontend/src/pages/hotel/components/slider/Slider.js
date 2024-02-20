import { useState } from 'react';
import { TbArrowBigLeft, TbArrowBigRight } from 'react-icons/tb';
import styles from './slider.module.scss';

export const Slider = ({ images }) => {
	const [imageIndex, setImageIndex] = useState(0);

	const showPrevImage = () =>
		setImageIndex((index) => {
			if (index === 0) return images.length - 1;
			return imageIndex - 1;
		});
	const showNextImage = () => {
		setImageIndex((index) => {
			if (index === images.length - 1) return 0;
			return imageIndex + 1;
		});
	};

	return (
		<div className={styles.slider}>
			<div className={styles.sliderImage}>
				<img src={images[imageIndex]} alt={'img'} />
			</div>

			<button
				className={styles.imgSliderBtn}
				style={{ left: 0 }}
				onClick={showPrevImage}
			>
				<TbArrowBigLeft />
			</button>
			<button
				className={styles.imgSliderBtn}
				style={{ right: 0 }}
				onClick={showNextImage}
			>
				<TbArrowBigRight />
			</button>
		</div>
	);
};
