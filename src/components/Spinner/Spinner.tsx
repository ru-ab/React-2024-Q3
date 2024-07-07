import { Component } from 'react';
import styles from './Spinner.module.css';
import { SpinnerProps } from './Spinner.props';

type Props = SpinnerProps;

export class Spinner extends Component<Props> {
  render() {
    const { className, ...props } = this.props;
    return (
      <div
        className={`${styles['spinner']} ${className ?? ''}`}
        {...props}
      ></div>
    );
  }
}
