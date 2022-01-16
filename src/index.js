import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Global, css} from '@emotion/react';
import {BrowserRouter} from 'react-router-dom';

import App from './App';
import store from './redux/store';

const globalStyle = css`
  body{
    padding: 0;
    margin: 0;
    background: rgb(216,245,241);
    //font-family: 'Yusei Magic', sans-serif;
  }
`;

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Global styles={globalStyle}/>
          <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
