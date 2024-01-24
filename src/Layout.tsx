import { Show } from 'solid-js';
import Footer from './Footer';
import Navbar from './Navbar';
import { useSessionContext } from './Provider';
import LoadingScreen from './components/LoadingScreen';

const Layout = (props: any) => {
  const { session } = useSessionContext();

  return (
    <Show when={!session.loading} fallback={<LoadingScreen />}>
      <Navbar />
      {props.children}
      <Footer />
    </Show>
  );
};

export default Layout;
