import { HeadingProps } from './Heading.props';
import cn from 'classnames';
import styles from './Heading.module.css';

export function Heading({ children, className, ...props }: HeadingProps) {
  return (
    <h1 className={cn(styles['heading'], className)} {...props}>
      {children}
    </h1>
  );
}
