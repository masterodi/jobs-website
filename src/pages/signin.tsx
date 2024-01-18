import { Show, createSignal } from 'solid-js';
import { InferType } from 'yup';
import { useSessionContext } from '../Provider';
import { signInUser, signUpUser } from '../api/authentication';
import Button from '../components/Button';
import Dialog from '../components/Dialog';
import InputLabeled from '../components/InputLabeled';
import { registerSchema, signinSchema } from '../schemas/form';
import createFields from '../signals/createFields';
import { useAction } from '../useAction';

const RegisterDialog = (props: any) => {
  const { refetch } = useSessionContext();
  const { fields, fieldErrors, onInput, validate } = createFields({ email: '', password: '' });
  const { execute, isLoading, error } = useAction({
    action: (data: InferType<typeof registerSchema>) => signUpUser(data),
  });

  const register = async (e: SubmitEvent) => {
    e.preventDefault();
    if (!(await validate(registerSchema))) return;
    await execute(fields);
    if (!error()) {
      await refetch();
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
        <Show when={error()}>
          <div class="font-semibold text-red-500">{error()?.message}</div>
        </Show>
        <Button fluid type="submit" loading={isLoading()}>
          Register
        </Button>
      </form>
    </Dialog>
  );
};

const Signin = () => {
  const { refetch } = useSessionContext();
  const [isRegisterOpen, setIsRegisterOpen] = createSignal(false);
  const { fields, fieldErrors, onInput, validate } = createFields({ email: '', password: '' });
  const { execute, isLoading, error } = useAction({
    action: (data: InferType<typeof signinSchema>) => signInUser(data),
  });

  const signIn = async (e: SubmitEvent) => {
    e.preventDefault();
    if (!(await validate(signinSchema))) return;
    await execute(fields);
    if (!error()) {
      await refetch();
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
            <Show when={error()}>
              <div class="font-semibold text-red-500">{error()?.message}</div>
            </Show>
            <Button fluid type="submit" loading={isLoading()}>
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

export default Signin;
