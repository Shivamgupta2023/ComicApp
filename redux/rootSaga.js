import {all} from 'redux-saga/effects';
import mySaga from './Sagas';

export default function* rootSaga() {
    yield all([mySaga()]);
}