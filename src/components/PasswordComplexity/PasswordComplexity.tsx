import { PasswordComplexityProps } from './PasswordComplexity.props';
import styles from './PasswordComplexity.module.css';
import cn from 'classnames';

function getComplexityDescription(complexity: number) {
  switch (complexity) {
    case 4: {
      return { description: 'Strong', className: 'strong' };
    }
    case 3: {
      return { description: 'Medium', className: 'medium' };
    }
    case 2: {
      return { description: 'Weak', className: 'weak' };
    }
    case 1: {
      return { description: 'Very weak', className: 'very-weak' };
    }
    default: {
      return { description: '', className: '' };
    }
  }
}

export function PasswordComplexity({ complexity }: PasswordComplexityProps) {
  const { description, className } = getComplexityDescription(complexity);
  return (
    <div className={styles['component']}>
      <progress
        value={complexity}
        max={4}
        className={cn(styles['progress'], styles[className])}
      />
      <div className={styles['value']}>{description}</div>
    </div>
  );
}
