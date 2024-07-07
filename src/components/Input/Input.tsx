import { Component } from 'react';
import { InputProps } from './Input.props';
import styles from './Input.module.css';

type Props = InputProps;
export class Input extends Component<Props> {
  render(): JSX.Element {
    return <input className={styles['input']} {...this.props} />;
  }
}
