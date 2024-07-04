import { Component } from 'react';
import { Main, Header } from './widgets';
import styles from './App.module.css';
import { SearchContextProvider } from './contexts';

export class App extends Component {
  render(): JSX.Element {
    return (
      <SearchContextProvider>
        <div className={styles['page']}>
          <Header />
          <Main />
        </div>
      </SearchContextProvider>
    );
  }
}
