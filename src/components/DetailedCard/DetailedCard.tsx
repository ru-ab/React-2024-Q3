import { Attacks, Characteristics, Abilities, Spinner } from '@/components';
import { useCard, useTheme } from '@/hooks';
import styles from './DetailedCard.module.css';
import { DetailedCardProps } from './DetailedCard.props';
import Image from 'next/image';

export function DetailedCard({ cardId }: DetailedCardProps) {
  const { theme } = useTheme();
  const { card, isFetching, error } = useCard({ cardId });

  if (isFetching) {
    return <Spinner className={styles['spinner']} />;
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
        <Image
          src={card.images.small}
          width={248}
          height={345}
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
