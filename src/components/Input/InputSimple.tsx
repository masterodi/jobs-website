import { cva } from 'class-variance-authority';
import { Component, JSX, splitProps } from 'solid-js';

const inputVariants = cva(['rounded-md', 'border-2', , 'px-4', 'py-3', 'outline-none'], {
  variants: {
    intent: {
      primary: ['bg-primary-500/25', 'focus:bg-primary-500/25', 'focus:border-primary-500'],
      flat: ['bg-transparent', 'focus:border-primary-500'],
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
      intent: ['primary', 'flat'],
      invalid: false,
      class: 'border-transparent',
    },
    {
      intent: ['primary', 'flat'],
      invalid: true,
      class: 'border-red-500',
    },
  ],
  defaultVariants: {
    intent: 'primary',
    invalid: false,
    fluid: false,
  },
});

export type InputSimpleProps = JSX.InputHTMLAttributes<HTMLInputElement> & {
  variant?: 'primary' | 'flat';
  fluid?: boolean;
  invalid?: boolean;
};

const InputSimple: Component<InputSimpleProps> = (props) => {
  const [local, others] = splitProps(props, ['variant', 'fluid', 'invalid', 'class', 'classList']);
  return (
    <input
      class={inputVariants({ intent: local.variant, invalid: local.invalid, fluid: local.fluid })}
      aria-invalid={local.invalid}
      {...others}
    />
  );
};

export default InputSimple;
