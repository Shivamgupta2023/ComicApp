import { createReducer } from '@reduxjs/toolkit';
import { setCreatorList } from './Action';

const CreatorListReducer = createReducer(initialState = {}, {
  [setCreatorList]: (state,action) => ({...state, ...(action.payload ?? {})})
})

export default CreatorListReducer;
