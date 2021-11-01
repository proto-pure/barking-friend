import { useSelector, useDispatch } from 'react-redux';

import styles from './styles.module.scss';

/**
 * A component that displays the breed search field
 */
const Search = () => {
  const { searchBreed } = useSelector(state => state.actions);
  const searchTerm = useSelector(state => state.searchTerm);
  const dispatch = useDispatch();

  return (
    <div className={styles.search}>
      <input
        type='text'
        value={searchTerm}
        placeholder='Search for the breed...'
        onChange={e => dispatch(searchBreed(e.target.value))}
      />
    </div>
  );
};

export { Search };
