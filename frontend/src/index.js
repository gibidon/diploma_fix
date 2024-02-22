import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { AppContextProvider } from '#providers';
import { App } from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
	<React.StrictMode>
		<Provider store={store}>
			<AppContextProvider>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</AppContextProvider>
		</Provider>
	</React.StrictMode>,
);
