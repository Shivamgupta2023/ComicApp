

import { createReducer } from '@reduxjs/toolkit';
import { setComicList } from './Action';

const comicListReducer = createReducer(initialState = {}, {
  [setComicList]: (state, action) => ({...state,...(action?.payload ?? {})} )
});

export default comicListReducer;

