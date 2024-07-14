import { useNavigate } from 'react-router-dom';
import { Button } from '../Button/Button';
import styles from './NotFound.module.css';

export function NotFound() {
  const navigate = useNavigate();

  return (
    <div className={styles['wrapper']}>
      <p className={styles['message']}>
        This page not exists. You can follow the home link.
      </p>
      <Button size="l" onClick={() => navigate('/')}>
        To Home Page
      </Button>
    </div>
  );
}
