import { cva } from 'class-variance-authority';
import { Component, JSX, Show, children, splitProps } from 'solid-js';
import LoadingIndicator from './LoadingIndicator';

const buttonVariants = cva(
  ['transition-md', 'relative', 'outline-none', 'disabled:cursor-not-allowed', 'font-semibold'],
  {
    variants: {
      intent: {
        primary: ['bg-primary-500', 'hover:bg-primary-400', 'active:bg-primary-600', 'disabled:bg-primary-500/75'],
        neutral: ['bg-neutral-500', 'hover:bg-neutral-400', 'active:bg-neutral-600', 'disabled:bg-neutral-500/75'],
        flat: ['bg-transparent', 'hover:bg-neutral-200', 'active:bg-neutral-300', 'disabled:bg-neutral-200/75'],
      },
      rounded: {
        false: 'rounded-md',
        true: 'rounded-full',
      },
      fluid: {
        true: 'w-full',
      },
      slim: {
        false: [],
        true: [],
      },
    },
    compoundVariants: [
      {
        rounded: false,
        slim: false,
        class: 'px-2 py-4',
      },
      {
        rounded: false,
        slim: true,
        class: 'px-2 py-1',
      },
      {
        rounded: true,
        slim: [false, true],
        class: 'p-2',
      },
    ],
    defaultVariants: {
      intent: 'primary',
      rounded: false,
      fluid: false,
      slim: false,
    },
  },
);

type ButtonProps = JSX.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'neutral' | 'flat';
  rounded?: boolean;
  fluid?: boolean;
  slim?: boolean;
  loading?: boolean;
  children: JSX.Element;
};

const Button: Component<ButtonProps> = (props) => {
  const [local, rest] = splitProps(props, [
    'variant',
    'rounded',
    'fluid',
    'slim',
    'loading',
    'class',
    'disabled',
    'children',
  ]);
  const c = children(() => props.children);

  return (
    <button
      class={buttonVariants({ intent: local.variant, rounded: local.rounded, fluid: local.fluid, slim: local.slim })}
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
