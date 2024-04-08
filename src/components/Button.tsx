import { A, AnchorProps } from '@solidjs/router';
import { cva } from 'class-variance-authority';
import { JSX, ParentComponent, Show, children, splitProps } from 'solid-js';
import LoadingIndicator from './LoadingIndicator';

type CommonButtonProps = {
  color?: 'primary' | 'neutral';
  variant?: 'classic' | 'outlined' | 'text';
  fluid?: boolean;
  loading?: boolean;
  icon?: JSX.Element;
};

type ButtonProps =
  | (CommonButtonProps & { href: string } & AnchorProps)
  | (CommonButtonProps & JSX.ButtonHTMLAttributes<HTMLButtonElement>);

const buttonVariants = cva(
  ['animated relative rounded-md border-2 p-2 font-semibold outline-none', 'focus:outline-primary-400'],
  {
    variants: {
      color: {
        primary: '',
        neutral: '',
      },
      variant: {
        classic: '',
        outlined: '',
        text: '',
      },
      fluid: {
        false: '',
        true: 'inline-block w-full text-center',
      },
    },
    compoundVariants: [
      {
        color: 'primary',
        variant: 'classic',
        class: ['border-transparent bg-primary-500 text-black', 'hover:bg-primary-400 disabled:bg-primary-700'],
      },
      {
        color: 'primary',
        variant: 'outlined',
        class: [
          'border-primary-500 bg-transparent',
          'hover:border-primary-400 hover:bg-primary-500/10 disabled:border-primary-700 disabled:bg-primary-700/10',
        ],
      },
      {
        color: 'primary',
        variant: 'text',
        class: [
          'border-transparent bg-transparent text-primary-500',
          'hover:bg-primary-500/10 disabled:bg-primary-700/10 disabled:text-primary-700',
        ],
      },
      {
        color: 'neutral',
        variant: 'classic',
        class: ['border-transparent bg-neutral-500 text-white', 'hover:bg-neutral-400 disabled:bg-neutral-700'],
      },
      {
        color: 'neutral',
        variant: 'outlined',
        class: [
          'border-neutral-500 bg-transparent',
          'hover:border-neutral-400 hover:bg-neutral-500/10 disabled:border-neutral-700 disabled:bg-neutral-700/10',
        ],
      },
      {
        color: 'neutral',
        variant: 'text',
        class: [
          'border-transparent bg-transparent text-neutral-50',
          'hover:bg-neutral-500/10 disabled:bg-neutral-700/10 disabled:text-neutral-300',
        ],
      },
    ],
    defaultVariants: {
      color: 'primary',
      variant: 'classic',
      fluid: false,
    },
  },
);

const Button: ParentComponent<ButtonProps> = (props) => {
  const [local, rest] = splitProps(props, ['color', 'variant', 'fluid', 'loading', 'class', 'classList']);
  const chldrn = children(() => props.children);
  const cls = () => buttonVariants({ color: local.color, variant: local.variant, fluid: local.fluid });

  if ('href' in rest) {
    return (
      <A class={cls()} {...rest}>
        {chldrn()}
      </A>
    );
  }

  const { disabled, ...r } = rest;

  return (
    <button class={cls()} disabled={local.loading} {...r}>
      <Show when={local.loading}>
        <span class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <LoadingIndicator />
        </span>
      </Show>
      <span class="flex items-center justify-center gap-2" classList={{ invisible: local.loading }}>
        <Show when={props.icon}>
          <i>{props.icon}</i>
        </Show>
        <span class="flex-1">{chldrn()}</span>
      </span>
    </button>
  );
};

export default Button;
