export const BoldText = ({ children, fontWeight, ...props }) => {
	return (
		<span style={{ fontWeight: fontWeight ? fontWeight : 600 }}>
			{children}
		</span>
	);
};
