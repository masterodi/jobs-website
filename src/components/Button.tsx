import { Component, JSX, Show, children, splitProps } from 'solid-js';
import LoadingIndicator from './LoadingIndicator';

type ButtonProps = JSX.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  fluid?: boolean;
  children: JSX.Element;
  rounded?: boolean;
  variant?: 'primary' | 'flat';
};

const Button: Component<ButtonProps> = (props) => {
  const [local, rest] = splitProps(props, ['loading', 'fluid', 'rounded', 'class', 'disabled', 'children']);
  const c = children(() => props.children);

  return (
    <button
      class="transition-md relative bg-primary-500 outline-none hover:bg-primary-400 focus:outline-primary-500 active:bg-primary-600 disabled:cursor-not-allowed disabled:bg-primary-500/75"
      classList={{
        'rounded-md px-4 py-2': !local.rounded,
        'w-full': local.fluid,
        'rounded-full p-2 text-neutral-50 fill-neutral-50': local.rounded,
      }}
      disabled={local.loading}
      {...rest}
    >
      <Show when={local.loading}>
        <span class="absolute left-1/2 -translate-x-1/2">
          <LoadingIndicator />
        </span>
      </Show>

      <span classList={{ invisible: local.loading }}>{c()}</span>
    </button>
  );
};

export default Button;
