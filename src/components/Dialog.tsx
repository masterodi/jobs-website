import { Component, JSX, Setter, children, createEffect, onCleanup, onMount } from 'solid-js';
import { Portal } from 'solid-js/web';

type DialogProps = {
  open: boolean;
  setOpen: Setter<boolean>;
  children: JSX.Element;
};

const Dialog: Component<DialogProps> = (props) => {
  let dialogRef: HTMLDialogElement;
  const c = children(() => props.children);

  const close = (e: any) => {
    if (!e.target.contains(dialogRef)) {
      return;
    }
    props.setOpen(false);
    props.afterClose?.();
  };

  createEffect(() => {
    if (props.open) {
      dialogRef.showModal();
    } else {
      dialogRef.close();
    }
    document.body.style.overflow = props.open ? 'hidden' : 'unset';
  });

  onMount(() => {
    document.addEventListener('click', close);
    dialogRef.addEventListener('close', close);
  });

  onCleanup(() => {
    document.removeEventListener('click', close);
    dialogRef.removeEventListener('close', close);
  });

  return (
    <Portal mount={document.body}>
      <dialog ref={dialogRef!} class="w-[80%] max-w-2xl rounded-lg backdrop:bg-black/25 backdrop:backdrop-blur-sm">
        <div class="p-8 lg:p-12">{c()}</div>
      </dialog>
    </Portal>
  );
};

export default Dialog;
