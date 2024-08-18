import { CardProps } from './Card.props';
import styles from './Card.module.css';

export function Card({ data }: CardProps) {
  return (
    <div className={styles['card']}>
      <div className={styles['label']}>Name:</div>
      <div>{data.name}</div>
      <div className={styles['label']}>Age:</div>
      <div>{data.age}</div>
      <div className={styles['label']}>Email:</div>
      <div>{data.email}</div>
      <div className={styles['label']}>Password:</div>
      <div>{data.password}</div>
      <div className={styles['label']}>Gender:</div>
      <div>{data.gender}</div>
      <div className={styles['label']}>Agreement accepted:</div>
      <div>{data.agreement ? 'yes' : 'no'}</div>
      <div className={styles['label']}>Country:</div>
      <div>{data.country}</div>
      <div className={styles['label']}>Image:</div>
      <img className={styles['image']} src={data.image} />
    </div>
  );
}
