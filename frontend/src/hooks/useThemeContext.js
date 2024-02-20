import { useContext } from 'react';
import { ThemeContext } from '#contexts';

export const useThemeContext = () => {
	const { theme, toggleTheme } = useContext(ThemeContext);

	if (!theme) throw new Error('UseThemeContext should be in Theme Provider');

	return { theme, toggleTheme };
};
