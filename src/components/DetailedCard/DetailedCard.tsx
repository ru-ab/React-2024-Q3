import { Attacks, Characteristics, Spinner } from '@/components';
import { useCard } from '@/hooks';
import styles from './DetailedCard.module.css';
import { DetailedCardProps } from './DetailedCard.props';

export function DetailedCard({ cardId }: DetailedCardProps) {
  const { card, isFetching, error } = useCard({ cardId });

  if (isFetching) {
    return (
      <aside className={styles['panel']}>
        <Spinner className={styles['spinner']} />
      </aside>
    );
  }

  if (error) {
    return <>{error}</>;
  }

  if (!card) {
    return <></>;
  }

  return (
    <>
      <div className={styles['info']}>
        <img
          src={card.images.small}
          alt={card.name}
          className={styles['image']}
        />
        <Characteristics item={card} />
      </div>
      <h2 className={styles['heading']}>{card.name}</h2>
      <h3 className={styles['heading']}>Description</h3>
      <div className={styles['description']}>
        {card.flavorText ?? 'No description'}
      </div>
      {card.attacks && (
        <>
          <h3 className={styles['heading']}>Attacks</h3>
          <Attacks attacks={card.attacks} />
        </>
      )}
    </>
  );
}
