import { PasswordComplexityProps } from './PasswordComplexity.props';

function getComplexityDescription(complexity: number) {
  switch (complexity) {
    case 4: {
      return 'Strong';
    }
    case 3: {
      return 'Medium';
    }
    case 2: {
      return 'Weak';
    }
    case 1: {
      return 'Very weak';
    }
    default: {
      return '';
    }
  }
}

export function PasswordComplexity({ complexity }: PasswordComplexityProps) {
  return (
    <>
      <progress value={complexity / 4} />
      {getComplexityDescription(complexity)}
    </>
  );
}
