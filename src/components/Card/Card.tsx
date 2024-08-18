import cn from 'classnames';
import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { formsActions } from '~/features';
import styles from './Card.module.css';
import { CardProps } from './Card.props';

export function Card({ data }: CardProps) {
  const dispatch = useDispatch();
  const highlighted = useRef<boolean>(data.highlighted);

  useEffect(() => {
    if (!data.highlighted) {
      dispatch(formsActions.highlight({ id: data.id }));
    }
  }, [data.highlighted, data.id, dispatch]);

  return (
    <div
      className={cn(styles['card'], {
        [styles['highlight']]: !highlighted.current,
      })}
    >
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
