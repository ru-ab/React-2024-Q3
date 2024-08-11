import { Abilities, Attacks, Characteristics } from '~/components';
import { useTheme } from '~/hooks';
import styles from './DetailedCard.module.css';
import { DetailedCardProps } from './DetailedCard.props';

export function DetailedCard({ card }: DetailedCardProps) {
  const { theme } = useTheme();

  return (
    <>
      <div className={styles['info']}>
        <img
          src={card.images.small}
          alt={card.name}
          className={`${styles['image']} ${styles[theme]}`}
        />
        <Characteristics item={card} />
      </div>
      <h2 className={styles['heading']}>{card.name}</h2>
      <h3 className={styles['heading']}>Description</h3>
      <div className={styles['description']}>
        {card.flavorText ?? 'No description'}
      </div>
      {card.abilities && <h3 className={styles['heading']}>Abilities</h3>}
      <Abilities abilities={card.abilities} />
      {card.attacks && (
        <>
          <h3 className={styles['heading']}>Attacks</h3>
          <Attacks attacks={card.attacks} />
        </>
      )}
    </>
  );
}
