import { cva } from 'class-variance-authority';
import { Component, JSX, Show, splitProps } from 'solid-js';

type InputProps = {
  color?: 'primary' | 'neutral';
  error?: string | boolean | null;
  label?: string;
} & JSX.InputHTMLAttributes<HTMLInputElement>;

const inputVariants = cva('rounded-md border-2 bg-transparent p-2 outline-none', {
  variants: {
    color: {
      primary: '',
      neutral: '',
    },
    error: {
      false: '',
      true: '',
    },
  },
  compoundVariants: [
    {
      color: 'primary',
      error: false,
      class: ['border-primary-500', 'focus:border-primary-400 focus:bg-primary-400/5'],
    },
    {
      color: 'neutral',
      error: false,
      class: ['border-secondary-500', 'focus:border-neutral-400 focus:bg-neutral-400/5'],
    },
    {
      color: ['primary', 'neutral'],
      error: true,
      class: ['border-error-500', 'focus:border-error-400 focus:bg-error-400/5'],
    },
  ],
  defaultVariants: {
    color: 'primary',
    error: false,
  },
});

const Input: Component<InputProps> = (props) => {
  const [local, rest] = splitProps(props, ['color', 'error', 'label', 'class', 'classList']);
  const cls = () => inputVariants({ color: local.color, error: !!local.error });

  return (
    <div class="grid">
      <Show when={!!local.label}>
        <label for={rest.id} class="mb-1" classList={{ 'text-error-500': !!local.error }}>
          {local.label}
        </label>
      </Show>
      <input class={cls()} {...rest} />
      <Show when={!!local.error}>
        <div class="mt-1 text-error-500">{local.error}</div>
      </Show>
    </div>
  );
};

export default Input;
