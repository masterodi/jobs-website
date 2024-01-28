import { Component, JSX, Show, children, splitProps } from 'solid-js';
import LoadingIndicator from './LoadingIndicator';

type ButtonProps = JSX.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  fluid?: boolean;
  children: JSX.Element;
};

const Button: Component<ButtonProps> = (props) => {
  const [_, rest] = splitProps(props, ['class', 'disabled', 'children']);
  const c = children(() => props.children);

  return (
    <button
      class="relative rounded-md bg-primary-500 px-4 py-2 outline-none focus:outline-primary-500 active:bg-primary-600 disabled:cursor-not-allowed disabled:bg-primary-500/75"
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
