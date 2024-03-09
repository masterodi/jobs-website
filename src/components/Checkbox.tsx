import { Show } from 'solid-js';

const Checkbox = (props: any) => {
  return (
    <div class="p-1">
      <input
        type="checkbox"
        id={props.id}
        name={props.name}
        placeholder={props.placeholder}
        title={props.title}
        value={props.value}
        checked={props.checked}
        onInput={props.onInput}
        onChange={props.onChange}
        class="align-middle"
      />
      <Show when={props.label}>
        <label for={props.id} class="ml-1">
          {props.label}
        </label>
      </Show>
    </div>
  );
};

export default Checkbox;
