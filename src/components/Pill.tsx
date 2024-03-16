import { cva } from 'class-variance-authority';
import { HiSolidXMark } from 'solid-icons/hi';
import { Component, Show } from 'solid-js';
import { ComponentVariant } from '../types';

const pillVariants = cva(['flex', 'cursor-default', 'items-center', 'gap-2', 'rounded-full', 'p-2', 'text-sm'], {
  variants: {
    intent: {
      primary: ['bg-primary-500', 'text-neutral-50'],
      neutral: [],
      flat: [],
    },
  },
  defaultVariants: {
    intent: 'primary',
  },
});

type PillProps = {
  variant?: ComponentVariant;
  onDelete?: (ev: MouseEvent) => void;
  label?: string;
};

const Pill: Component<PillProps> = (props) => {
  const handleDelete = (event: MouseEvent) => {
    event.stopPropagation();
    props.onDelete?.(event);
  };

  return (
    <div onClick={(e) => e.stopPropagation()} class={pillVariants({ intent: props.variant })}>
      <Show when={props.label}>
        <span>{props.label}</span>
      </Show>
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
