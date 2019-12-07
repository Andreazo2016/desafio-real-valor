import React from 'react';
import './App.css'
import Header from './components/Header';
import Rotas from './routes';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Header />
        <Rotas />
      </Provider>
    </BrowserRouter>
  );
}

export default App;
