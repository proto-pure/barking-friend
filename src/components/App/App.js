import { Suspense, lazy, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import { Header } from 'components/Header';
import { Spinner } from 'components/Spinner';

import { getBreedsList } from 'utils/utils';

// Lazy loading Pages
const Home = lazy(() => import('pages/Home'));
const Favorites = lazy(() => import('pages/Favorites'));
const Breed = lazy(() => import('pages/Breed'));
const About = lazy(() => import('pages/About'));

/**
 * The main component
 */
const App = () => {
  const { setBreedsList } = useSelector(state => state.actions);
  const { setFavoritesFromCache } = useSelector(state => state.actions);
  const dispatch = useDispatch();
  const savedFavorites = localStorage.getItem('favorite_breeds');

  // Getting the list of breeds from the server and
  // filling the UI with data
  useEffect(() => {
    (async () => {
      const breeds = await getBreedsList();

      if (breeds) {
        dispatch(setBreedsList(breeds));
      }
    })();
  });

  // Load saved favorite breeds, if any, for use in the UI
  useEffect(() => {
    if (savedFavorites) {
      /** @type {string[]} */
      const favorites = JSON.parse(savedFavorites);

      favorites?.length && dispatch(setFavoritesFromCache(favorites));
    }
  }, [savedFavorites, dispatch, setFavoritesFromCache]);

  return (
    <>
      <Header />

      <Suspense fallback={<Spinner />}>
        <Switch>
          <Route path='/' component={Home} exact />
          <Route path='/favorites' component={Favorites} exact />
          <Route path='/about' component={About} exact />
          <Route path={'/breed/:breed/:subBreed?'} component={Breed} exact />
        </Switch>
      </Suspense>
    </>
  );
};

export { App };
