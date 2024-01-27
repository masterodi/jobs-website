import { splitProps } from 'solid-js';

const Input = (props: any) => {
  const [local, others] = splitProps(props, ['class', 'classList', 'invalid', 'fluid']);
  return (
    <input
      class="bg-primary-500/25 focus:bg-primary-500/35 rounded-md px-2 py-2"
      classList={{ 'border-2 border-red-500': local.invalid, 'w-full': local.fluid }}
      aria-invalid={local.invalid}
      {...others}
    />
  );
};

export default Input;
