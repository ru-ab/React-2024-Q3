import { useSearchParams } from 'react-router-dom';
import styles from './DetailedCard.module.css';
import { useItem } from '../../hooks/useItem';
import { Spinner } from '../Spinner/Spinner';
import { Button } from '../Button/Button';
import { Attacks } from '../Attacks/Attacks';
import { Characteristics } from '../Characteristics/Characteristics';

export function DetailedCard() {
  const [searchParams, setSearchParams] = useSearchParams();

  const cardId = searchParams.get('details');
  const { item, loading } = useItem(cardId);

  if (loading) {
    return (
      <aside className={styles['panel']}>
        <Spinner className={styles['spinner']} />
      </aside>
    );
  }

  if (!item) {
    return <></>;
  }

  const clearDetails = () => {
    setSearchParams((params) => {
      params.delete('details');
      return params;
    });
  };

  return (
    <aside className={styles['panel']}>
      <div className={styles['wrapper']}>
        <div className={styles['detailed-card']}>
          <Button className={styles['close-button']} onClick={clearDetails}>
            X
          </Button>
          <div className={styles['info']}>
            <img
              src={item.images.small}
              alt={item.name}
              className={styles['image']}
            />
            <Characteristics item={item} />
          </div>
          <h2 className={styles['heading']}>{item.name}</h2>
          <h3 className={styles['heading']}>Description</h3>
          <div className={styles['description']}>
            {item.flavorText ?? 'No description'}
          </div>
          {item.attacks && (
            <>
              <h3 className={styles['heading']}>Attacks</h3>
              <Attacks attacks={item.attacks} />
            </>
          )}
        </div>
      </div>
    </aside>
  );
}
