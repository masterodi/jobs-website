import { Show } from 'solid-js';
import { InferType } from 'yup';
import { useSessionContext } from '../Provider';
import { signInUser, signUpUser } from '../api/authentication';
import Button from '../components/Button';
import Carousel, { useCarouselContext } from '../components/Carousel';
import InputLabeled from '../components/InputLabeled';
import { registerSchema, signinSchema } from '../schemas';
import createFields from '../signals/createFields';
import { useAction } from '../useAction';

const SigninForm = () => {
  const { refetch } = useSessionContext();
  const { fields, fieldErrors, onInput, validate } = createFields({ email: '', password: '' });
  const { execute, isLoading, error } = useAction({
    action: (data: InferType<typeof signinSchema>) => signInUser(data),
  });
  const { index, setIndex } = useCarouselContext();

  const signIn = async (e: SubmitEvent) => {
    e.preventDefault();
    if (!(await validate(signinSchema))) return;
    await execute(fields);
    if (!error()) {
      await refetch();
    }
  };

  return (
    <Show when={index() === 0}>
      <form onSubmit={signIn} class="w-full p-8 [&>*+*]:mt-8">
        <h1 class="text-2xl font-bold">Enter Account</h1>
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
        <Button fluid type="button" onClick={() => setIndex(1)}>
          No account? Register here
        </Button>
      </form>
    </Show>
  );
};

const RegisterForm = () => {
  const { refetch } = useSessionContext();
  const { fields, fieldErrors, onInput, validate } = createFields({ email: '', password: '' });
  const { execute, isLoading, error } = useAction({
    action: (data: InferType<typeof registerSchema>) => signUpUser(data),
  });
  const { index, setIndex } = useCarouselContext();

  const register = async (e: SubmitEvent) => {
    e.preventDefault();
    if (!(await validate(registerSchema))) return;
    await execute(fields);
    if (!error()) {
      await refetch();
    }
  };

  return (
    <Show when={index() === 1}>
      <form onSubmit={register} class="w-full p-8 [&>*+*]:mt-8">
        <h1 class="text-2xl font-bold">Create Account</h1>
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
        <Button fluid type="button" onClick={() => setIndex(0)}>
          I already have an account
        </Button>
      </form>
    </Show>
  );
};

const Signin = () => {
  return (
    <>
      <div class="grid min-h-screen place-items-center bg-gradient-to-b from-primary-500 to-primary-100 p-4">
        <div class="w-full max-w-lg rounded-lg bg-white p-8 shadow-md">
          <Carousel>
            <SigninForm />
            <RegisterForm />
          </Carousel>
        </div>
      </div>
    </>
  );
};

export default Signin;
