import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { Routes } from 'data/data';

import styles from './styles.module.scss';

/**
 * A component that renders the app header, including the
 * logo/branding, navigation, etc
 */
const Header = () => {
  const favorites = useSelector(state => state.favorites);

  return (
    <header className={styles.header}>
      <NavLink className={styles.brand} to={Routes.home.url}>
        <div className={styles.brandTitle}>BF</div>
        <div className={styles.brandFullTitle}>Barking Friend</div>
      </NavLink>

      <nav className={styles.nav}>
        {Object.entries(Routes).map(([key, route]) => (
          <NavLink
            key={key}
            className={styles.link}
            to={route.url}
            activeClassName={styles.active}
            exact
          >
            {route.title +
              (key === 'favorites' ? ` (${favorites.length})` : '')}
          </NavLink>
        ))}
      </nav>
    </header>
  );
};

export { Header };
