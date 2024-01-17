import { Show, children, splitProps } from 'solid-js';
import LoadingIndicator from './LoadingIndicator';

const Button = (props: any) => {
  const [_, rest] = splitProps(props, ['class', 'disabled', 'children']);
  const c = children(() => props.children);
  return (
    <button
      class="relative rounded-md bg-indigo-500 px-4 py-2 outline-none focus:outline-indigo-500 active:bg-indigo-600 disabled:cursor-not-allowed disabled:bg-indigo-500/75"
      classList={{ 'w-full': props.fluid }}
      disabled={props.loading}
      {...rest}
    >
      <Show when={props.loading}>
        <span class="absolute left-1/2 -translate-x-1/2">
          <LoadingIndicator />
        </span>
      </Show>

      <span classList={{ invisible: props.loading }}>{c()}</span>
    </button>
  );
};

export default Button;
