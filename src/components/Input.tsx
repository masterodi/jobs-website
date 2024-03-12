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

type ComposedInputProps = SimpleInputProps & {
  contentLeft?: JSX.Element;
  contentRight?: JSX.Element;
};

const ComposedInput: Component<ComposedInputProps> = (props: any) => {
  const [local, others] = splitProps(props, ['contentLeft', 'contentRight', 'invalid', 'fluid']);

  return (
    <div
      class="flex items-center gap-2 rounded-md border-2 border-transparent bg-primary-500/25 px-4 py-2 focus-within:border-primary-500 focus-within:bg-primary-500/35 focus-within:outline-primary-500"
      classList={{ 'border-2 border-red-500': local.invalid, 'w-full': local.fluid }}
      aria-invalid={local.invalid}
    >
      <Show when={local.contentLeft}>{local.contentLeft}</Show>
      <input class="w-full bg-transparent p-1 outline-none" {...others} />
      <Show when={local.contentRight}>{local.contentRight}</Show>
    </div>
  );
};

const Input = (props: SimpleInputProps | ComposedInputProps) => {
  if ('contentLeft' in props || 'contentRight' in props) {
    return <ComposedInput {...props} />;
  }

  return <SimpleInput {...props} />;
};

export default Input;
