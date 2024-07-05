import { Component } from 'react';
import { ButtonProps } from './Button.props';
import styles from './Button.module.css';

type Props = ButtonProps;

export class Button extends Component<Props> {
  render(): JSX.Element {
    const { appearance } = this.props;

    return (
      <button
        className={`${styles['button']} ${appearance === 'primary' ? styles['primary'] : styles['red']}`}
        {...this.props}
      >
        {this.props.children}
      </button>
    );
  }
}
