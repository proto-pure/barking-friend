import { useSelector } from 'react-redux';

import { arrayChunks } from 'utils/utils';

import { Search } from 'components/Search';
import { Link } from 'components/Link';

import styles from './styles.module.scss';

/**
 * A component that renders the `Home` page when the
 * user navigates to it
 */
const Home = () => {
  const searchTerm = useSelector(state => state.searchTerm);
  const breeds = useSelector(state => state.breeds);
  const breedsKeys = Object.keys(breeds).filter(breed =>
    breed.toLowerCase().includes(searchTerm.trim().toLowerCase())
  );
  const breedsChunks = arrayChunks(breedsKeys, 10);

  return (
    <div className={styles.homePage}>
      <Search />

      <div className={styles.links}>
        {breedsChunks.map((slice, index) => (
          <div className={styles.linksWrapper} key={index}>
            {slice.map(breed => (
              <Link to={'breed/' + breed} key={breed}>
                {breed}
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export { Home };
