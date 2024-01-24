import { useNavigate } from '@solidjs/router';
import { Show } from 'solid-js';
import { useSessionContext } from './Provider';
import { signOutUser } from './api/authentication';
import Button from './components/Button';

const Navbar = () => {
  const navigate = useNavigate();
  const { session, refetch } = useSessionContext();

  const signOut = async () => {
    await signOutUser();
    await refetch();
  };

  return (
    <nav class="sticky top-0 z-30 flex h-[60px] items-center justify-between gap-12 bg-white/75 px-4 backdrop-blur-sm">
      <div class="flex items-center gap-8">
        <h2 class="text-xl font-bold">
          <a href="/">Place</a>
        </h2>
        <ul>
          <li>
            <a class="text-lg" href="#">
              Jobs
            </a>
          </li>
        </ul>
      </div>
      <Show when={!session()}>
        <Button onClick={() => navigate('/signin')}>Get Started</Button>
      </Show>
      <Show when={session()}>
        <Button onClick={signOut}>Sign out</Button>
      </Show>
    </nav>
  );
};

export default Navbar;
