import { createSignal } from 'solid-js';
import { createStore } from 'solid-js/store';
import { signInUser } from './api/authentication';
import Button from './components/Button';
import Dialog from './components/Dialog';
import InputLabeled from './components/InputLabeled';

type InputEv = InputEvent & {
  currentTarget: HTMLInputElement;
  target: HTMLInputElement;
};

function App() {
  const [fields, setFields] = createStore({ email: '', password: '' });
  const [isRegisterOpen, setIsRegisterOpen] = createSignal(false);
  const [isLoading, setIsLoading] = createSignal(false);

  const handleInput = (e: InputEv) => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;
    setFields({ ...fields, [name]: value });
  };

  const signIn = async (e: Event) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await signInUser(fields);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <h1 class="text-3xl font-bold underline">Hello world!</h1>
      <form class="mx-auto max-w-3xl [&>*+*]:mt-8" onSubmit={signIn}>
        <InputLabeled name="email" id="email" label="Email" onInput={handleInput} />
        <InputLabeled name="password" id="password" label="Password" onInput={handleInput} />
        <Button type="submit" disabled={isLoading()}>
          Click
        </Button>
        <Button type="button" onClick={() => setIsRegisterOpen((prev) => !prev)}>
          No account? Register here
        </Button>
      </form>

      <Dialog open={isRegisterOpen} setOpen={setIsRegisterOpen}>
        <h1 class="text-2xl font-bold">Create account</h1>
        <form class="mx-auto mt-8 max-w-3xl lg:min-w-80 [&>*+*]:mt-8">
          <InputLabeled name="email" id="email" label="Email" onInput={handleInput} />
          <InputLabeled name="password" id="password" label="Password" onInput={handleInput} />
          <Button type="button">Register</Button>
        </form>
      </Dialog>
    </>
  );
}

export default App;
