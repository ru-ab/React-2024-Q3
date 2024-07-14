import { AttacksProps } from './Attacks.props';
import styles from './Attacks.module.css';
import { Fragment } from 'react/jsx-runtime';
import { Badges } from '../Badges/Badges';

export function Attacks({ attacks, ...props }: AttacksProps) {
  return (
    <div className={styles['attacks']} {...props}>
      {attacks.map((attack) => (
        <Fragment key={attack.name}>
          <span className={styles['name']}>{attack.name}</span>
          <span className={styles['damage']}>
            {attack.damage && <>Damage: {attack.damage}</>}
          </span>
          <span className={styles['cost']}>
            Cost:
            <Badges values={attack.cost} />
          </span>
          <span className={styles['text']}>{attack.text}</span>
        </Fragment>
      ))}
    </div>
  );
}
