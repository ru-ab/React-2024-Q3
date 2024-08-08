'use client';
import { Button } from '@/components';
import { useState } from 'react';
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
