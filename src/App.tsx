import { Route, Router } from '@solidjs/router';
import Navbar from './Navbar';
import Home from './pages/home';
import Login from './pages/login';
import NoSessionGuard from './router/NoSessionGuard';

function App(props: any) {
  return (
    <>
      <Navbar />
      <Router root={App}>
        <Route path="/" component={NoSessionGuard}>
          <Route path="/login" component={Login} />
        </Route>
        <Route path="/" component={Home} />
      </Router>
    </>
  );
}

export default App;
