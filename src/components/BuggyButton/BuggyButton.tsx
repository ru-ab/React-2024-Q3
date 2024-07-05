import { Component } from 'react';
import { Button } from '../Button/Button';
import { BuggyButtonState } from './BuggyButton.state';
import { BuggyButtonProps } from './BuggyButton.props';

type Props = BuggyButtonProps;
type State = BuggyButtonState;

export class BuggyButton extends Component<Props, State> {
  state: State = {
    throwError: false,
  };

  onClick = () => {
    this.setState({ throwError: true });
  };

  render(): JSX.Element {
    if (this.state.throwError) {
      throw new Error('Bug!');
    }

    return (
      <Button onClick={this.onClick} {...this.props}>
        Throw an error
      </Button>
    );
  }
}
