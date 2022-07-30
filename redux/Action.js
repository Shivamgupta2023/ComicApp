import { createAction } from "@reduxjs/toolkit";



export const setComicList = createAction('SET_COMIC_LIST');
export const getComicList = createAction('GET_COMIC_LIST');


export const getNewComicList = createAction('GET_NEW_COMIC_LIST');

export const getCharacterList = createAction('GET_CHARACTER_LIST');
export const setCharacterList = createAction('SET_CHARACTER_LIST');

export const getCreatorList = createAction('GET_CREATOR_LIST');
export const setCreatorList = createAction('SET_CREATOR_LIST');