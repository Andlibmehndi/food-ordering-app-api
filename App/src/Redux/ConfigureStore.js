import { createStore, applyMiddleware, compose } from 'redux';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';
import reducer from './Reducers';

export default function configureStore(initialState) {
	const composeEnhancers = process.env.NODE_ENV !== 'production' &&
							typeof window === 'object' &&
							window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
							window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) :
							compose;
	
	const middleware = [thunk];
	if (process.env.NODE_ENV !== 'production') {
		const logger = createLogger();
		middleware.push(logger);
	}
	
	const store = createStore(
		reducer,
		initialState,
		composeEnhancers(
			applyMiddleware(...middleware)
		));
	
	return store;
}