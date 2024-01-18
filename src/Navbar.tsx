import { useNavigate } from '@solidjs/router';
import { Show } from 'solid-js';
import { useSessionContext } from './Provider';
import Button from './components/Button';

const Navbar = () => {
  const navigate = useNavigate();
  const { session } = useSessionContext();

  return (
    <nav class="sticky top-0 flex h-[60px] items-center justify-between gap-12 bg-gray-600/75 px-4 backdrop-blur-sm">
      <div class="flex items-center gap-8">
        <h2 class="text-2xl font-bold">
          <a href="/">Placeholder</a>
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
        <Button onClick={() => navigate('/login')}>Get Started</Button>
      </Show>
      <Show when={session()}>
        <Button onClick={() => {}}>Sign out</Button>
      </Show>
    </nav>
  );
};

export default Navbar;
