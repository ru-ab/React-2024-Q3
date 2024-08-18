import cn from 'classnames';
import { Link as RouterLink } from 'react-router-dom';
import styles from './Link.module.css';
import { LinkProps } from './Link.props';

export function Link({ children, className, ...props }: LinkProps) {
  return (
    <RouterLink className={cn(styles['link'], className)} {...props}>
      {children}
    </RouterLink>
  );
}
