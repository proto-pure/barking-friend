import types from './action.types';

export const setBreedsList = breeds => ({
  type: types.SET_BREEDS_LIST,
  payload: breeds
});

export const searchBreed = term => ({
  type: types.SEARCH_BREED,
  payload: term
});

export const setAppReadyState = () => ({
  type: types.SET_APP_READY_STATE
});

export const handleImageInFavorites = image => ({
  type: types.HANDLE_IMAGE_IN_FAVORITES,
  payload: image
});

export const setFavoritesFromCache = data => ({
  type: types.SET_FAVORITES_FROM_CACHE,
  payload: data
});
