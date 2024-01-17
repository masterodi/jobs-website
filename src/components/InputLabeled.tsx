import { splitProps } from 'solid-js';
import Input from './Input';

const InputLabeled = (props: any) => {
  const [local, others] = splitProps(props, ['label']);

  return (
    <div class="grid">
      <label class="font-semibold" for={others.id}>
        {local.label}
      </label>
      <Input {...others} />
    </div>
  );
};

export default InputLabeled;
