import { createSignal, Show } from 'solid-js';
import { signInUser } from '../api/authentication';
import Button from '../components/Button';
import Dialog from '../components/Dialog';
import InputLabeled from '../components/InputLabeled';
import createFields from '../signals/createFields';

const Login = () => {
  const [fields, _, onInput] = createFields({ email: '', password: '' });
  const [isRegisterOpen, setIsRegisterOpen] = createSignal(false);
  const [isLoading, setIsLoading] = createSignal(false);

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
    <div class="m-4">
      <div class="grid min-h-[80vh] place-items-center">
        <form class="mx-auto w-full max-w-3xl [&>*+*]:mt-8" onSubmit={signIn}>
          <InputLabeled name="email" id="email" label="Email" onInput={onInput} />
          <InputLabeled name="password" id="password" label="Password" type="password" onInput={onInput} />
          <Button fluid type="submit" disabled={isLoading()}>
            Click
          </Button>
          <Button fluid type="button" onClick={() => setIsRegisterOpen((prev) => !prev)}>
            No account? Register here
          </Button>
        </form>
      </div>

      <Show when={isRegisterOpen()}>
        <Dialog open={isRegisterOpen} setOpen={setIsRegisterOpen}>
          <h1 class="text-2xl font-bold">Create account</h1>
          <form class="mx-auto mt-8 max-w-3xl lg:min-w-80 [&>*+*]:mt-8">
            <InputLabeled name="email" id="email" label="Email" />
            <InputLabeled name="password" id="password" label="Password" />
            <Button fluid type="button">
              Register
            </Button>
          </form>
        </Dialog>
      </Show>
    </div>
  );
};

export default Login;
