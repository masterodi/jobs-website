import { splitProps } from 'solid-js';

const Input = (props: any) => {
  const [_, others] = splitProps(props, ['class']);
  return <input class="rounded-md bg-indigo-500/25 px-2 py-2 focus:bg-indigo-500/35" {...others} />;
};

export default Input;
