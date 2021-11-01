import types from './action.types';
import { handleImageInFavorites } from '../utils/utils';

const reducer = (state, action) => {
  switch (action.type) {
    case types.SET_BREEDS_LIST:
      return {
        ...state,
        breeds: { ...action.payload }
      };

    case types.SEARCH_BREED:
      return { ...state, searchTerm: action.payload };

    case types.SET_APP_READY_STATE:
      return { ...state, appReady: true };

    case types.HANDLE_IMAGE_IN_FAVORITES:
      return {
        ...state,
        favorites: handleImageInFavorites(state.favorites, action.payload)
      };

    case types.SET_FAVORITES_FROM_CACHE:
      return { ...state, favorites: [...state.favorites, ...action.payload] };

    default:
      return state;
  }
};

export default reducer;
