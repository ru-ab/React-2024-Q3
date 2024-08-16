import { useSelector } from 'react-redux';
import { Card, Link } from '~/components';
import { selectForms } from '~/features';

export function MainPage() {
  const forms = useSelector(selectForms);

  return (
    <>
      <Link to="/uncontrolled-components">Uncontrolled components form</Link>
      <Link to="/react-hook-form">React Hook Form</Link>
      <ul>
        {forms.map((form) => (
          <li key={form.id}>
            <Card data={form} />
          </li>
        ))}
      </ul>
    </>
  );
}
