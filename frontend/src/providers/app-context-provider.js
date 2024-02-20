import { ApiProvider } from './api-provider';
import { LoadingProvider } from './loading-provider';
import { ThemeProvider } from './theme-provider';

export const AppContextProvider = ({ children }) => {
	return (
		<ApiProvider>
			<LoadingProvider>
				<ThemeProvider>{children}</ThemeProvider>
			</LoadingProvider>
		</ApiProvider>
	);
};
