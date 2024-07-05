import { Component } from 'react';
import { InputProps } from './Input.props';

type Props = InputProps;
export class Input extends Component<Props> {
  render(): JSX.Element {
    return <input {...this.props} />;
  }
}
