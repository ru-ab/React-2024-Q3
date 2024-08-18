import { forwardRef } from 'react';
import { InputProps } from './Input.props';
import styles from './Input.module.css';
import cn from 'classnames';
import { Label } from '../Label/Label';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { id, label, type, error, showErrors = true, ...props },
  ref
) {
  return (
    <div className={cn(styles['component'], { [styles[type!]]: !!type })}>
      <Label htmlFor={id}>{label}</Label>
      <input
        id={id}
        ref={ref}
        type={type}
        className={cn(styles['input'], { [styles['error']]: !!error })}
        {...props}
      />
      {showErrors && <ErrorMessage>{error}</ErrorMessage>}
    </div>
  );
});
