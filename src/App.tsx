import { createEffect, createSignal, onMount } from 'solid-js';
import { createStore } from 'solid-js/store';
import { signInUser } from './api/authentication';

type InputEv = InputEvent & {
  currentTarget: HTMLInputElement;
  target: HTMLInputElement;
};

function App() {
  let dialogRef: HTMLDialogElement;
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

  createEffect(() => {
    if (isRegisterOpen()) {
      dialogRef.showModal();
    }
  });

  const closeDialog = (e) => {
    if (!e.target.contains(dialogRef)) return;
    dialogRef.close();
    setIsRegisterOpen(false);
  };

  onMount(() => {
    document.addEventListener('click', closeDialog);
  });

  return (
    <>
      <h1 class="text-3xl font-bold underline">Hello world!</h1>
      <form class="mx-auto max-w-3xl [&>*+*]:mt-8" onSubmit={signIn}>
        <div class="grid">
          <label for="email">Email</label>
          <input
            class="rounded-md bg-indigo-500/25 px-2 py-2 focus:bg-indigo-500/35"
            name="email"
            id="email"
            onInput={handleInput}
          />
        </div>
        <div class="grid">
          <label for="password">Password</label>
          <input
            class="rounded-md bg-indigo-500/25 px-2 py-2 focus:bg-indigo-500/35"
            name="password"
            id="password"
            onInput={handleInput}
          />
        </div>
        <button
          class="w-full rounded-md bg-indigo-500 px-4 py-2 focus-within:border-2 focus-within:border-red-500 focus-within:outline-red-500  active:bg-indigo-600 disabled:cursor-not-allowed disabled:bg-indigo-500/75"
          type="submit"
          disabled={isLoading()}
        >
          Click
        </button>
        <button
          type="button"
          class="w-full rounded-md bg-indigo-500 px-4 py-2 focus-within:border-2 focus-within:border-red-500 focus-within:outline-red-500  active:bg-indigo-600 disabled:cursor-not-allowed disabled:bg-indigo-500/75"
          onClick={() => setIsRegisterOpen((prev) => !prev)}
        >
          No account? Register here
        </button>
      </form>

      <dialog ref={dialogRef!} class="w-[80%] rounded-lg backdrop:bg-black/50 backdrop:backdrop-blur-md">
        <div class="max-w-lg p-8 lg:p-12">
          <h1 class="text-2xl font-bold">Create account</h1>
          <form class="mx-auto mt-8 max-w-3xl lg:min-w-80 [&>*+*]:mt-8">
            <div class="grid">
              <label for="email">Email</label>
              <input
                class="rounded-md bg-indigo-500/25 px-2 py-2 focus:bg-indigo-500/35"
                name="email"
                id="email"
                onInput={handleInput}
              />
            </div>
            <div class="grid">
              <label for="password">Password</label>
              <input
                class="rounded-md bg-indigo-500/25 px-2 py-2 focus:bg-indigo-500/35"
                name="password"
                id="password"
                onInput={handleInput}
              />
            </div>
            <button class="w-full rounded-md bg-indigo-500 px-4 py-2 focus-within:border-2 focus-within:border-red-500 focus-within:outline-red-500  active:bg-indigo-600 disabled:cursor-not-allowed disabled:bg-indigo-500/75">
              Register
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
}

export default App;
