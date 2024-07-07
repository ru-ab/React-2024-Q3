import { Component } from 'react';
import { ButtonProps } from './Button.props';
import styles from './Button.module.css';

type Props = ButtonProps;

export class Button extends Component<Props> {
  render(): JSX.Element {
    const { appearance, size } = this.props;

    return (
      <button
        className={`${styles['button']} ${styles[appearance]} ${styles[size]}`}
        {...this.props}
      >
        {this.props.children}
      </button>
    );
  }
}
