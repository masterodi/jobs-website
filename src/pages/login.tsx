import { Show, createSignal } from 'solid-js';
import { useSessionContext } from '../Provider';
import { signInUser, signUpUser } from '../api/authentication';
import Button from '../components/Button';
import Dialog from '../components/Dialog';
import InputLabeled from '../components/InputLabeled';
import { registerSchema, signinSchema } from '../schemas/form';
import createFields from '../signals/createFields';

const RegisterDialog = (props: any) => {
  const { refetch } = useSessionContext();
  const { fields, fieldErrors, onInput, validate } = createFields({ email: '', password: '' });
  const [isLoading, setIsLoading] = createSignal(false);

  const register = async (e: SubmitEvent) => {
    e.preventDefault();

    if (!(await validate(signinSchema))) return;

    try {
      setIsLoading(true);
      await signUpUser(fields);
      await refetch();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={props.open} setOpen={props.setOpen}>
      <h1 class="text-2xl font-bold">Create account</h1>
      <form onSubmit={register} class="mx-auto mt-8 max-w-3xl lg:min-w-80 [&>*+*]:mt-8">
        <InputLabeled
          name="email"
          id="email"
          label="Email"
          onInput={onInput}
          invalid={!!fieldErrors.email}
          error={fieldErrors.email}
        />
        <InputLabeled
          name="password"
          id="password"
          label="Password"
          type="password"
          onInput={onInput}
          invalid={!!fieldErrors.password}
          error={fieldErrors.password}
        />
        <Button fluid type="submit" loading={isLoading()}>
          Register
        </Button>
      </form>
    </Dialog>
  );
};

const Login = () => {
  const { refetch } = useSessionContext();
  const [isRegisterOpen, setIsRegisterOpen] = createSignal(false);
  const { fields, fieldErrors, onInput, validate } = createFields({ email: '', password: '' });
  const [isLoading, setIsLoading] = createSignal(false);

  const signIn = async (e: SubmitEvent) => {
    e.preventDefault();
    if (!(await validate(registerSchema))) return;

    try {
      setIsLoading(true);
      await signInUser(fields);
      await refetch();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div class="m-4">
        <div class="grid min-h-[80vh] place-items-center">
          <form onSubmit={signIn} class="mx-auto w-full max-w-3xl [&>*+*]:mt-8">
            <InputLabeled
              name="email"
              id="email"
              label="Email"
              onInput={onInput}
              invalid={!!fieldErrors.email}
              error={fieldErrors.email}
            />
            <InputLabeled
              name="password"
              id="password"
              label="Password"
              type="password"
              onInput={onInput}
              invalid={!!fieldErrors.password}
              error={fieldErrors.password}
            />
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
