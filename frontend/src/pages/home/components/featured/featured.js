import { Link } from 'react-router-dom';
import { bestPriceImage } from '#*/images/best-price1.jpg';

export const Featured = () => {
	return (
		<Link to="/featured">
			<div>
				<h2>Best deals? Right place!</h2>
				<div>{/* <img src={bestPriceImage} alt="best price" /> */}</div>
			</div>
		</Link>
	);
};
