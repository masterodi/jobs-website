import { Route, Router } from '@solidjs/router';
import Layout from './Layout';
import Home from './pages/home';
import Jobs from './pages/jobs';
import Signin from './pages/signin';
import NoSessionGuard from './router/NoSessionGuard';

export default function App() {
  return (
    <Router root={Layout}>
      <Route path="/" component={NoSessionGuard}>
        <Route path="/signin" component={Signin} />
      </Route>
      <Route path="/jobs" component={Jobs} />
      <Route path="/" component={Home} />
    </Router>
  );
}
