import styles from './styles.module.scss';

/**
 * A component that displays the spinner while loading content
 */
const Spinner = () => (
  <div className={styles.spinnerWrapper}>
    <div className={styles.spinner}></div>
  </div>
);

export { Spinner };
