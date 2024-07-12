import { useState } from 'react';
import { Button } from '../Button/Button';
import { BuggyButtonProps } from './BuggyButton.props';

export function BuggyButton(props: BuggyButtonProps) {
  const [error, setError] = useState<Error>();

  const onClick = () => {
    setError(new Error('Bug!'));
  };

  if (error) {
    throw error;
  }

  return (
    <Button onClick={onClick} appearance="red" {...props}>
      Throw an error
    </Button>
  );
}
