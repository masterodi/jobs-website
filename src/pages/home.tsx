import { Show } from 'solid-js';
import { useSessionContext } from '../Provider';
import Button from '../components/Button';

const Home = () => {
  const { session } = useSessionContext();

  return (
    <header class="grid min-h-screen place-items-center text-center">
      <div class="container p-4">
        <h1 class="title-1 mb-8">
          Your <span class="text-sm">(no bs)</span> Solution to Career Opportunities
        </h1>
        <p>Made by people, for people.</p>
        <div class="mt-12 flex justify-center gap-8 [&>*]:flex-1">
          <Button href="/dashboard">Pave Your Career Path</Button>
          <Show when={!session()}>
            <Button href="/signup" variant="outlined">
              Sign Up
            </Button>
          </Show>
        </div>
      </div>
    </header>
  );
};

export default Home;
