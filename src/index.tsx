/* @refresh reload */
import { render } from 'solid-js/web';

import App from './App';
import { Provider } from './Provider';
import './index.css';

const root = document.getElementById('root');

render(
  () => (
    <Provider>
      <App />
    </Provider>
  ),
  root!,
);
