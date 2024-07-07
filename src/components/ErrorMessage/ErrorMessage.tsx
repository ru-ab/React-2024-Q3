import { Component } from 'react';
import styles from './ErrorMessage.module.css';
import { Button } from '../Button/Button';

export class ErrorMessage extends Component {
  render() {
    return (
      <div className={styles['wrapper']}>
        <p className={styles['message']}>Something went wrong</p>
        <Button
          appearance="primary"
          size="l"
          onClick={() => window.location.reload()}
        >
          Refresh
        </Button>
      </div>
    );
  }
}
