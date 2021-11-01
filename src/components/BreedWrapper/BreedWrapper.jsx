import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';

import styles from './styles.module.scss';

/**
 * @typedef {Object} Props Component props
 * @prop {string} url URL of breed image
 * @prop {string} breed Breed ID
 */

/**
 * A component that displays a wrapper and an
 * image of the breed, as well as a button to
 * add/remove the breed to/from `Favorites`
 * @param {Props} props
 */
const BreedWrapper = props => {
  const { handleImageInFavorites } = useSelector(state => state.actions);
  const favorites = useSelector(state => state.favorites);
  const dispatch = useDispatch();
  const isAdded = favorites.includes(props.url);

  const buttonClasses = classNames(styles.button, {
    'button-primary': isAdded,
  });

  return (
    <div className={styles.breedImageWrapper}>
      <img
        className={styles.breedImage}
        src={props.url}
        alt={`${props.breed} breed`}
      />

      <button
        className={buttonClasses}
        onClick={() => dispatch(handleImageInFavorites(props.url))}
      >
        {isAdded ? 'Remove From Favorites' : 'Add To Favorites'}
      </button>
    </div>
  );
};

export { BreedWrapper };
