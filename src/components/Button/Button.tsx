import { Component } from 'react';
import { ButtonProps } from './Button.props';

type Props = ButtonProps;

export class Button extends Component<Props> {
  render(): JSX.Element {
    return <button {...this.props}>{this.props.children}</button>;
  }
}
