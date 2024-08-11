import styles from './Badges.module.css';
import { BadgesProps } from './Badges.props';

export function Badges({ values, ...props }: BadgesProps) {
  return (
    <div className={styles['badges']} {...props}>
      {values.map((value, i) => (
        <span key={value + i}>{value}</span>
      ))}
    </div>
  );
}
