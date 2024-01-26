import { Show, children, splitProps } from 'solid-js';
import LoadingIndicator from './LoadingIndicator';

const Button = (props: any) => {
  const [_, rest] = splitProps(props, ['class', 'disabled', 'children']);
  const c = children(() => props.children);
  return (
    <button
      class="bg-primary-500 focus:outline-primary-500 active:bg-primary-600 disabled:bg-primary-500/75 relative rounded-md px-4 py-2 outline-none disabled:cursor-not-allowed"
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
