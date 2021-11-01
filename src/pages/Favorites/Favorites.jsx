import { useSelector } from 'react-redux';

import { BreedWrapper } from 'components/BreedWrapper';

/**
 * A component that renders the `Favorites` section when the
 * user navigates to it
 */
const Favorites = () => {
  /** @type {string[]} */
  const favorites = useSelector(state => state.favorites);

  return (
    <div className='page'>
      {favorites.map((image, index) => (
        <BreedWrapper key={index} url={image} breed='dog' />
      ))}
    </div>
  );
};

export { Favorites };
