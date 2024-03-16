import { Show, splitProps } from 'solid-js';

const Checkbox = (props: any) => {
  const [local, other] = splitProps(props, ['label', 'id', 'class']);

  return (
    <div class="p-1">
      <input type="checkbox" id={local.id} class="align-middle" {...other} />
      <Show when={local.label}>
        <label for={local.id} class="ml-1">
          {local.label}
        </label>
      </Show>
    </div>
  );
};

export default Checkbox;
