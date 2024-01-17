import { Route, Router } from '@solidjs/router';
import App from './App';
import Home from './pages/home';
import Login from './pages/login';

const AppRouter = () => {
  return (
    <Router root={App}>
      <Route path="/" component={Home} />
      <Route path="/login" component={Login} />
    </Router>
  );
};

export default AppRouter;
