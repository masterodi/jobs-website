import { Component, JSX, splitProps } from 'solid-js';

export type InputProps = JSX.InputHTMLAttributes<HTMLInputElement> & {
  invalid?: boolean;
  fluid?: boolean;
};

const Input: Component<InputProps> = (props) => {
  const [local, others] = splitProps(props, ['class', 'classList', 'invalid', 'fluid']);
  return (
    <input
      class="rounded-md bg-primary-500/25 p-2 focus:bg-primary-500/35 focus:outline-primary-400"
      classList={{ 'border-2 border-red-500': local.invalid, 'w-full': local.fluid }}
      aria-invalid={local.invalid}
      {...others}
    />
  );
};

export default Input;
