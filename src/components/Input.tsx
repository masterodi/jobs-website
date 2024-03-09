import { Component, JSX, Show, splitProps } from 'solid-js';

export type SimpleInputProps = JSX.InputHTMLAttributes<HTMLInputElement> & {
  invalid?: boolean;
  fluid?: boolean;
};

const SimpleInput: Component<SimpleInputProps> = (props) => {
  const [local, others] = splitProps(props, ['class', 'classList', 'invalid', 'fluid']);
  return (
    <input
      class="rounded-md border-2 border-transparent bg-primary-500/25 px-4 py-3 outline-none focus:border-primary-500 focus:bg-primary-500/35"
      classList={{ 'border-2 border-red-500': local.invalid, 'w-full': local.fluid }}
      aria-invalid={local.invalid}
      {...others}
    />
  );
};

const ComposedInput = (props: any) => {
  const [local, others] = splitProps(props, ['content', 'invalid', 'fluid']);

  return (
    <div
      class="flex items-center gap-2 rounded-md border-2 border-transparent bg-primary-500/25 px-4 py-2 focus-within:border-primary-500 focus-within:bg-primary-500/35 focus-within:outline-primary-500"
      classList={{ 'border-2 border-red-500': local.invalid, 'w-full': local.fluid }}
      aria-invalid={local.invalid}
    >
      <Show when={local.content?.left}>{local.content.left}</Show>
      <input class="w-full bg-transparent p-1 outline-none" {...others} />
      <Show when={local.content?.right}>{local.content.right}</Show>
    </div>
  );
};

const Input = (props: any) => {
  if (props.content) {
    return <ComposedInput {...props} />;
  }

  return <SimpleInput {...props} />;
};

export default Input;
