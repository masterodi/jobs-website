import { Route, Router } from '@solidjs/router';
import Layout from './Layout';
import Home from './pages/home';
import Login from './pages/login';
import NoSessionGuard from './router/NoSessionGuard';

export default function App() {
  return (
    <Router root={Layout}>
      <Route path="/" component={NoSessionGuard}>
        <Route path="/login" component={Login} />
      </Route>
      <Route path="/" component={Home} />
    </Router>
  );
}
