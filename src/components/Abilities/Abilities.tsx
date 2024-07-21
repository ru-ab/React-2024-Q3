import { Fragment } from 'react/jsx-runtime';
import { AbilitiesProps } from './Abilities.props';
import styles from './Abilities.module.css';

export function Abilities({ abilities }: AbilitiesProps) {
  if (!abilities) {
    return <></>;
  }

  return (
    <div className={styles['abilities']}>
      {abilities.map((ability) => (
        <Fragment key={ability.name}>
          <span className={styles['name']}>{ability.name}</span>
          <span className={styles['type']}>{ability.type}</span>
          <span className={styles['text']}>{ability.text}</span>
        </Fragment>
      ))}
    </div>
  );
}
