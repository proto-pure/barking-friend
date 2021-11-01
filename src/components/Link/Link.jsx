import { Link as RouterLink } from 'react-router-dom';

import styles from './styles.module.scss';

/**
 * A component that displays the link
 * @param {Object} props Component props
 * @param {string} props.to Internal URL of the app
 * @param {React.ReactNode} props.children Link content/name to render
 */
const Link = props => (
  <span className={styles.linkWrapper}>
    <RouterLink className={styles.link} to={props.to}>
      {props.children}
    </RouterLink>
  </span>
);

export { Link };
