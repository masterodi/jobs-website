/* @refresh reload */
import { render } from 'solid-js/web';

import AppRouter from './AppRouter';
import './index.css';

const root = document.getElementById('root');

render(() => <AppRouter />, root!);
