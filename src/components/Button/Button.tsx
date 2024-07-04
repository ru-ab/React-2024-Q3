import { Component } from 'react';
import { ButtonProps } from './Button.props';

export class Button extends Component<ButtonProps> {
  render(): JSX.Element {
    return <button {...this.props}>{this.props.children}</button>;
  }
}
