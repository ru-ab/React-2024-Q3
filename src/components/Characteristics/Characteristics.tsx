import { CharacteristicsProps } from './Characteristics.props';
import styles from './Characteristics.module.css';
import { Badges } from '../Badges/Badges';

export function Characteristics({ item, ...props }: CharacteristicsProps) {
  return (
    <div className={styles['characteristics']} {...props}>
      {item.level && (
        <>
          <span className={styles['label']}>Level</span>
          <div>{item.level}</div>
        </>
      )}
      {item.hp && (
        <>
          <span className={styles['label']}>HP</span>
          <div>{item.hp}</div>
        </>
      )}
      {item.types && (
        <>
          <span className={styles['label']}>Types</span>
          <Badges values={item.types} />
        </>
      )}
      {item.subtypes && (
        <>
          <span className={styles['label']}>Subtypes</span>
          <Badges values={item.subtypes} />
        </>
      )}
      {item.weaknesses && (
        <>
          <span className={styles['label']}>Weakness</span>
          <Badges
            values={item.weaknesses.map(
              (weakness) => `${weakness.type} ${weakness.value}`
            )}
          />
        </>
      )}
      {item.artist && (
        <>
          <span className={styles['label']}>Artist</span>
          <span>{item.artist}</span>
        </>
      )}
    </div>
  );
}
