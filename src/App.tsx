import { Component } from 'react';
import { Main, Header } from './widgets';
import styles from './App.module.css';
import { ItemsContextProvider } from './contexts';

export class App extends Component {
  render(): JSX.Element {
    return (
      <ItemsContextProvider>
        <div className={styles['page']}>
          <Header />
          <Main />
        </div>
      </ItemsContextProvider>
    );
  }
}
