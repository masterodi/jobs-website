import { Show, createSignal } from 'solid-js';
import { unwrap } from 'solid-js/store';
import Button from '../components/Button';
import Dialog from '../components/Dialog';
import InputLabeled from '../components/InputLabeled';
import createFields from '../signals/createFields';

const RegisterDialog = (props: any) => {
  const [fields, _, onInput] = createFields({ email: '', password: '' });

  const register = async (e: SubmitEvent) => {
    e.preventDefault();
    console.log(unwrap(fields));
  };

  return (
    <Dialog open={props.open} setOpen={props.setOpen}>
      <h1 class="text-2xl font-bold">Create account</h1>
      <form onSubmit={register} class="mx-auto mt-8 max-w-3xl lg:min-w-80 [&>*+*]:mt-8">
        <InputLabeled name="email" id="email" label="Email" onInput={onInput} />
        <InputLabeled name="password" id="password" label="Password" type="password" onInput={onInput} />
        <Button fluid type="submit">
          Register
        </Button>
      </form>
    </Dialog>
  );
};

const Login = () => {
  const [fields, _, onInput] = createFields({ email: '', password: '' });
  const [isRegisterOpen, setIsRegisterOpen] = createSignal(false);

  const signIn = async (e: SubmitEvent) => {
    e.preventDefault();
    console.log(unwrap(fields));
  };

  return (
    <>
      <div class="m-4">
        <div class="grid min-h-[80vh] place-items-center">
          <form onSubmit={signIn} class="mx-auto w-full max-w-3xl [&>*+*]:mt-8">
            <InputLabeled name="email" id="email" label="Email" onInput={onInput} />
            <InputLabeled name="password" id="password" label="Password" type="password" onInput={onInput} />
            <Button fluid type="submit">
              Sign In
            </Button>
            <Button fluid type="button" onClick={() => setIsRegisterOpen((prev) => !prev)}>
              No account? Register here
            </Button>
          </form>
        </div>
      </div>

      <Show when={isRegisterOpen()}>
        <RegisterDialog open={isRegisterOpen} setOpen={setIsRegisterOpen} />
      </Show>
    </>
  );
};

export default Login;
