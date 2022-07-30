import {call, put, takeLatest, select} from 'redux-saga/effects';
import {setComicList, getComicList, getNewComicList} from './Action';
import {setCharacterList, getCharacterList} from './Action';
import {setCreatorList, getCreatorList} from './Action';
import md5 from 'md5';
import {getRequest} from './ApiRequest';

// ...

function* getComicList$(action) {
  yield put(setComicList({isLoading: true}));
  const ts = new Date().getTime();
  try {
    const response = yield call(
      getRequest,
      `https://gateway.marvel.com:443/v1/public/characters?ts=${ts}&apikey=32b90f27c93806c2bf3aee380b033051&hash=${md5(
        `${ts}b9e77abd4926f553c384f6741511d6d2c20e12ca32b90f27c93806c2bf3aee380b033051`,
      )}`,
    );
    if (response) {
      yield put(setComicList({characters: response?.data?.results}));
      yield put(setComicList({isLoading: false}));
    } else {
      yield put(setComicList({isLoading: false})); 
    }
  } catch (error) {
    console.log(error);
  }
}

function* getNewComicList$(action) {
  yield put(setComicList({isNewComicLoading: true}))
  const ts = new Date().getTime();
  const {offset} = action?.payload;
  const {comicData} = action?.payload
  yield put(setComicList({characters: comicData}));
  const state = yield select();
  try {
    const newResponse = yield call(
      getRequest,
      `https://gateway.marvel.com:443/v1/public/characters?ts=${ts}&offset=${offset}&apikey=32b90f27c93806c2bf3aee380b033051&hash=${md5(
        `${ts}b9e77abd4926f553c384f6741511d6d2c20e12ca32b90f27c93806c2bf3aee380b033051`,
      )}`,
    );
    if (newResponse) {
      yield put(setComicList({characters: state.comicListReducer.characters.length ? [...state.comicListReducer.characters, ...newResponse.data.results] : newResponse.data.results}));
      yield put(setComicList({isNewComicLoading: false}))
    }
    else{
      yield put(setComicList({isNewComicLoading: false}))
    }
    
  } catch (error) {
    console.log(error);
  }
}

function* getCharacterList$(action) {
  const ts = new Date().getTime();
  yield put(setCharacterList({isComicLoading: true}));

  const {charId} = action?.payload;
  try {
    const request = yield call(
      getRequest,
      `https://gateway.marvel.com:443/v1/public/characters/${charId}/comics?ts=${ts}&apikey=32b90f27c93806c2bf3aee380b033051&hash=${md5(
        `${ts}b9e77abd4926f553c384f6741511d6d2c20e12ca32b90f27c93806c2bf3aee380b033051`,
      )}`,
    );
    if (request) {
      yield put(setCharacterList({comic: request}));
      yield put(setCharacterList({isComicLoading: false}));
    } else {
      yield put(setCharacterList({isComicLoading: false}));
    }
  } catch (error) {
    console.log(error);
  }
}

function* getCreatorList$(action) {
  const ts = new Date().getTime();
  yield put(setCreatorList({isCreatorLoading: true}));
  const {comicId} = action?.payload;
  try {
    const comicReq = yield call(
      getRequest,
      `https://gateway.marvel.com:443/v1/public/comics/${comicId}/creators?ts=${ts}&apikey=32b90f27c93806c2bf3aee380b033051&hash=${md5(
        `${ts}b9e77abd4926f553c384f6741511d6d2c20e12ca32b90f27c93806c2bf3aee380b033051`,
      )}`,
    );

    if (comicReq) {
      yield put(setCreatorList({creator: comicReq}));
      yield put(setCreatorList({isCreatorLoading: false}));
    } else {
      yield put(setCreatorList({isCreatorLoading: false}));
    }
    yield put(setCreatorList({creator: comicReq}));
  } catch (error) {
    console.log(error);
  }
}

export default function* mySaga() {
  yield takeLatest(getComicList, getComicList$);
  yield takeLatest(getCharacterList, getCharacterList$);
  yield takeLatest(getCreatorList, getCreatorList$);
  yield takeLatest(getNewComicList, getNewComicList$);
}
