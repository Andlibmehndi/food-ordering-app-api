import React from 'react';
import './App.css';
import Navigation from './Routes/routes';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from './Redux/ConfigureStore';

const store = configureStore();

function App() {
  return (
    <div>
      <Provider store={store}>
        <BrowserRouter>
          <Navigation />
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;