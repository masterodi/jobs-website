import { cva } from 'class-variance-authority';
import { Component, JSX, Show, children, splitProps } from 'solid-js';
import LoadingIndicator from './LoadingIndicator';

const buttonVariants = cva(['transition-md', 'relative', 'outline-none', 'disabled:cursor-not-allowed'], {
  variants: {
    intent: {
      primary: ['bg-primary-500', 'hover:bg-primary-400', 'active:bg-primary-600', 'disabled:bg-primary-500/75'],
      neutral: ['bg-neutral-500', 'hover:bg-neutral-400', 'active:bg-neutral-600', 'disabled:bg-neutral-500/75'],
      flat: ['bg-transparent', 'hover:bg-neutral-100', 'active:bg-neutral-200'],
    },
    rounded: {
      false: 'rounded-md px-2 py-4',
      true: ' rounded-full p-2',
    },
    fluid: {
      true: 'w-full',
    },
  },
  defaultVariants: {
    intent: 'primary',
    rounded: false,
    fluid: false,
  },
});

type ButtonProps = JSX.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'neutral' | 'flat';
  rounded?: boolean;
  fluid?: boolean;
  loading?: boolean;
  children: JSX.Element;
};

const Button: Component<ButtonProps> = (props) => {
  const [local, rest] = splitProps(props, ['variant', 'rounded', 'fluid', 'loading', 'class', 'disabled', 'children']);
  const c = children(() => props.children);

  return (
    <button
      class={buttonVariants({ intent: local.variant, rounded: local.rounded, fluid: local.fluid })}
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
