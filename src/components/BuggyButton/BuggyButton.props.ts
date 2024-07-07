import { DetailedHTMLProps, HTMLAttributes } from 'react';

export type BuggyButtonProps = Omit<
  DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
  'ref'
>;
