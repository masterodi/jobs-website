import { Show } from 'solid-js';

const Pill = (props: any) => {
  const handleDelete = (event) => {
    event.stopPropagation();
    props.onDelete(event);
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      class="flex cursor-default items-center gap-2 rounded-full p-2 text-sm"
      classList={{ 'bg-primary-500 text-neutral-50': props.variant === 'primary' }}
    >
      <span>{props.label}</span>
      <Show when={!!props.onDelete}>
        <button
          onClick={handleDelete}
          class="h-[24px] w-[24px] rounded-full border-2 border-neutral-800 px-1 hover:bg-neutral-600 hover:text-red-400"
        >
          X
        </button>
      </Show>
    </div>
  );
};

export default Pill;
