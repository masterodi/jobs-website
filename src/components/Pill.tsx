import { HiSolidXMark } from 'solid-icons/hi';
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
          class="flex h-[24px] w-[24px] items-center justify-center px-1 hover:text-red-400"
        >
          <HiSolidXMark size={18} />
        </button>
      </Show>
    </div>
  );
};

export default Pill;
