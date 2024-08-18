import { LinkProps as RouterLinkProps } from 'react-router-dom';

export type LinkProps = RouterLinkProps &
  React.RefAttributes<HTMLAnchorElement>;
