import { Show } from 'solid-js';
import { InferType } from 'yup';
import { useSessionContext } from '../Provider';
import { signInUser } from '../api/authentication';
import Button from '../components/Button';
import { Input } from '../components/Input';
import { signinSchema } from '../schemas';
import createFields from '../signals/createFields';
import { useAction } from '../useAction';

const Signin = () => {
  const { refetch } = useSessionContext();
  const storeFields = createFields({ email: '', password: '' }, signinSchema);
  const { execute, isLoading, error } = useAction({
    action: (data: InferType<typeof signinSchema>) => signInUser(data),
  });

  const signIn = async (event: SubmitEvent) => {
    event.preventDefault();

    if (!(await storeFields.validate())) {
      return;
    }

    await execute(storeFields.fields);

    if (!error()) {
      await refetch();
    }
  };

  return (
    <div class="grid min-h-screen place-items-center">
      <div class="container p-4">
        <h1 class="title-1 mb-12 text-center">Enter Your Jobbler Account</h1>
        <form onSubmit={signIn} class="mx-auto mb-4 max-w-2xl [&>*+*]:mt-8">
          <Input
            label="Email"
            type="text"
            id="email"
            name="email"
            onInput={storeFields.onInput}
            error={storeFields.fieldErrors.email}
          />
          <Input
            label="Password"
            type="password"
            id="password"
            name="password"
            onInput={storeFields.onInput}
            error={storeFields.fieldErrors.password}
          />
          <Show when={error()}>
            <div class="text-error-500">{error()?.message}</div>
          </Show>
          <Button fluid type="submit" loading={isLoading()}>
            Sign In
          </Button>
          <Button href="/signup" fluid variant="text" color="neutral">
            I don't have an account
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Signin;
