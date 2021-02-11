import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { persistStore, persistReducer } from 'redux-persist'; // imports from redux-persist
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

const persistConfig = {
  // configuration object for redux-persist
  key: 'root',
  storage, // define which storage to use
};

const persistedReducer = persistReducer(persistConfig, rootReducer); // create a persisted reducer

const initialState = {};

const middleware = [thunk];

const store = createStore(
  persistedReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

const persistor = persistStore(store); // used to create the persisted store, persistor will be used in the next step

export { store, persistor };
