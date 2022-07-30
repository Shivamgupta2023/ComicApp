import { createReducer } from '@reduxjs/toolkit';
import { setCharacterList } from './Action';

const CharListReducer = createReducer(initialState = {}, {
  [setCharacterList]: (state,action) => ({...state, ...(action.payload ?? {})})
})

export default CharListReducer;
