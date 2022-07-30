import {configureStore} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import {combineReducers} from 'redux';
import comicListReducer from './comiListReducer'
import CharListReducer from './CharListReducer'
import CreatorListReducer from './CreatorListReducer';
import rootSaga from './rootSaga';

const rootReducer = combineReducers({
  comicListReducer,
  CharListReducer,
  CreatorListReducer,
});

const sagaMiddleware = createSagaMiddleware();

export default configureStore({
  reducer: rootReducer,
  middleware: [sagaMiddleware],
  devTools: true,
});

sagaMiddleware.run(rootSaga);
