import { Route, Router } from '@solidjs/router';
import Layout from './Layout';
import Dashboard from './pages/dashboard';
import Home from './pages/home';
import Signin from './pages/signin';
import Signup from './pages/signup';
import { PrivateRoute, WithoutSessionRoute } from './router';

const PrivateDashboard = (props: any) => {
  return (
    <PrivateRoute>
      <Dashboard {...props} />
    </PrivateRoute>
  );
};

export default function App() {
  return (
    <Router root={Layout}>
      <Route path="/dashboard" component={PrivateDashboard}>
        <Route path="/inbox" component={() => <div>inbox</div>} />
        <Route path="/jobs" component={() => <div>jobs</div>} />
        <Route path="/applies" component={() => <div>applies</div>} />
        <Route path="/statistics" component={() => <div>statistics</div>} />
        <Route path="/settings" component={() => <div>settings</div>} />
        <Route path="/" component={() => <div>dashboard</div>} />
      </Route>

      <Route path="/" component={WithoutSessionRoute}>
        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
        <Route path="/" component={Home} />
      </Route>
    </Router>
  );
}
