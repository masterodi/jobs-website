import { Component, Show, splitProps } from 'solid-js';
import Input from './Input';
import { InputSimpleProps } from './InputSimple';

type InputLabeledProps = InputSimpleProps & {
  label?: string;
  error?: string | null;
};

const InputLabeled: Component<InputLabeledProps> = (props) => {
  const [local, others] = splitProps(props, ['label', 'error']);

  return (
    <div class="grid">
      <label class="font-semibold" for={others.id}>
        {local.label}
      </label>
      <Input {...others} />
      <Show when={local.error}>
        <div class="text-sm text-red-500">{local.error}</div>
      </Show>
    </div>
  );
};

export default InputLabeled;
