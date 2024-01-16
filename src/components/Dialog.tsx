import { children, createEffect, onCleanup, onMount } from 'solid-js';
import { Portal } from 'solid-js/web';

const Dialog = (props: any) => {
  let dialogRef: HTMLDialogElement;
  const c = children(() => props.children);

  const close = (e: any) => {
    if (!e.target.contains(dialogRef)) {
      return;
    }
    props.setOpen(false);
  };

  createEffect(() => {
    if (props.open()) {
      dialogRef.showModal();
    } else {
      dialogRef.close();
    }
    document.body.style.overflow = props.open() ? 'hidden' : 'unset';
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
      <dialog ref={dialogRef!} class="w-[80%] max-w-lg rounded-lg backdrop:bg-black/25 backdrop:backdrop-blur-sm">
        <div class="p-8 lg:p-12">{c()}</div>
      </dialog>
    </Portal>
  );
};

export default Dialog;
