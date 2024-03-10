import { Route, Router } from '@solidjs/router';
import Layout from './Layout';
import Home from './pages/home';
import InternalStyling from './pages/internal/styling';
import Jobs from './pages/jobs';
import Signin from './pages/signin';
import NoSessionGuard from './router/NoSessionGuard';

export default function App() {
  return (
    <Router root={Layout}>
      <Route path="/" component={NoSessionGuard}>
        <Route path="/signin" component={Signin} />
      </Route>
      <Route path="/jobs/:id?" component={Jobs} />

      <Route path="/internal">
        <Route path="/styling" component={InternalStyling} />
      </Route>

      <Route path="/" component={Home} />
    </Router>
  );
}
