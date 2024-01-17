import { children, splitProps } from 'solid-js';

const Button = (props: any) => {
  const [_, rest] = splitProps(props, ['class', 'children']);
  const c = children(() => props.children);
  return (
    <button
      class="rounded-md bg-indigo-500 px-4 py-2 focus-within:border-2 focus-within:border-red-500 focus-within:outline-red-500  active:bg-indigo-600 disabled:cursor-not-allowed disabled:bg-indigo-500/75"
      classList={{ 'w-full': props.fluid }}
      {...rest}
    >
      {c()}
    </button>
  );
};

export default Button;
