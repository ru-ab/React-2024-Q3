import { Component } from 'react';
import { InputProps } from './Input.props';

export class Input extends Component<InputProps> {
  render(): JSX.Element {
    return <input {...this.props} />;
  }
}
