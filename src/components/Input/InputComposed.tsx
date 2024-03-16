import { cva } from 'class-variance-authority';
import { Component, JSX, Show, splitProps } from 'solid-js';
import { ComponentVariant } from '../../types';
import { InputSimpleProps } from './InputSimple';

const inputVariants = cva(
  ['flex', 'items-center', 'gap-2', 'rounded-md', 'border-2', 'border-transparent', 'px-4', 'py-2'],
  {
    variants: {
      intent: {
        primary: ['bg-primary-500/25', 'focus-within:bg-primary-500/35', 'focus-within:border-primary-500'],
      },
      invalid: {
        false: [],
        true: [],
      },
      fluid: {
        true: 'w-full',
      },
    },
    compoundVariants: [
      {
        intent: ['primary'],
        invalid: false,
        class: 'border-transparent',
      },
      {
        intent: ['primary'],
        invalid: true,
        class: 'border-red-500',
      },
    ],
    defaultVariants: {
      intent: 'primary',
      invalid: false,
    },
  },
);

export type InputComposedProps = InputSimpleProps & {
  variant?: ComponentVariant;
  contentLeft?: JSX.Element;
  contentRight?: JSX.Element;
};

const InputComposed: Component<InputComposedProps> = (props: any) => {
  const [local, others] = splitProps(props, ['variant', 'contentLeft', 'contentRight', 'invalid', 'fluid']);

  return (
    <div
      class={inputVariants({ intent: local.variant, invalid: local.invalid, fluid: local.fluid })}
      aria-invalid={local.invalid}
    >
      <Show when={local.contentLeft}>{local.contentLeft}</Show>
      <input class="w-full bg-transparent p-1 outline-none" {...others} />
      <Show when={local.contentRight}>{local.contentRight}</Show>
    </div>
  );
};

export default InputComposed;
