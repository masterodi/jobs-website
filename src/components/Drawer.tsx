import { cva } from 'class-variance-authority';
import { children, createEffect, onCleanup, onMount } from 'solid-js';
import { Portal } from 'solid-js/web';

const drawerVariants = cva(['animated fixed bottom-0 top-0 z-40 w-[70%] max-w-sm bg-neutral-900'], {
  variants: {
    open: {
      false: '',
      true: '',
    },
    side: {
      left: 'left-0',
      right: 'right-0',
    },
  },
  compoundVariants: [
    {
      open: false,
      side: 'left',
      class: '-translate-x-full',
    },
    {
      open: true,
      side: 'left',
      class: 'translate-x-0',
    },
    {
      open: false,
      side: 'right',
      class: 'translate-x-full',
    },
    {
      open: true,
      side: 'right',
      class: 'translate-x-0',
    },
  ],
  defaultVariants: {
    side: 'left',
  },
});

const Drawer = (props: any) => {
  let drawerRef: HTMLDivElement;
  let overlayRef: HTMLDivElement;
  const chldrn = children(() => props.children);

  const close = (e: any) => {
    if (overlayRef.contains(e.target)) {
      props.setOpen(false);
    }
  };

  createEffect(() => {
    document.body.style.overflow = props.open ? 'hidden' : 'unset';
  });

  onMount(() => {
    document.addEventListener('click', close);
  });

  onCleanup(() => {
    document.removeEventListener('click', close);
  });

  return (
    <Portal mount={document.body}>
      <div classList={{ visible: props.open, invisible: !props.open }}>
        <div ref={drawerRef!} class={drawerVariants({ open: props.open, side: props.side })}>
          {chldrn()}
        </div>

        <div ref={overlayRef!} class="fixed inset-0 z-30 bg-black/50"></div>
      </div>
    </Portal>
  );
};

export default Drawer;
