import { useSelector } from 'react-redux';
import { Card, Heading } from '~/components';
import { selectForms } from '~/features';
import styles from './Main.module.css';

export function MainPage() {
  const forms = useSelector(selectForms);

  return (
    <>
      <Heading>Home</Heading>
      {!forms.length && <div className={styles['no-data']}>No data</div>}
      {!!forms.length && (
        <ul className={styles['list']}>
          {forms.map((form) => (
            <li key={form.id}>
              <Card data={form} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
