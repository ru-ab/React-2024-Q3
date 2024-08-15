import { LinkProps, Link as RouterLink } from 'react-router-dom';

export function Link(
  props: LinkProps & React.RefAttributes<HTMLAnchorElement>
) {
  return <RouterLink {...props}></RouterLink>;
}
