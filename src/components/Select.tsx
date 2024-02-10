import { For, createSignal, onCleanup, onMount } from 'solid-js';

const Select = (props: any) => {
  let containerRef: HTMLDivElement;
  let inputRef: HTMLInputElement;
  const [value, setValue] = createSignal('');
  const [open, setOpen] = createSignal(false);

  const selectOption = (option) => {
    props.setValue?.(option) ?? setValue(option);
    setOpen(false);
  };

  const handleCloseDropdownOnClickOutside = (ev: MouseEvent) => {
    if (!(ev.target as HTMLElement).closest('#select-container-test')) {
      setOpen(false);
    }
  };

  onMount(() => {
    document.addEventListener('mousedown', handleCloseDropdownOnClickOutside);
  });

  onCleanup(() => {
    document.removeEventListener('mousedown', handleCloseDropdownOnClickOutside);
  });

  return (
    <div ref={containerRef!} class="relative" id="select-container-test">
      <input
        ref={inputRef!}
        class="w-full rounded-md bg-primary-500/25 p-2 text-start focus:bg-primary-500/35"
        onFocus={() => setOpen(true)}
        id="select-input-test"
        value={props.value ?? value()}
        onInput={(ev) => setValue(ev.currentTarget.value)}
      />
      <div
        class="absolute inset-x-0 top-full mt-1 rounded-lg bg-primary-200 [&>*+*]:mt-2"
        classList={{ block: open(), hidden: !open() }}
      >
        <ul>
          <For each={props.options}>
            {(option, _) => (
              <li
                class="cursor-pointer rounded-lg p-2 hover:bg-primary-100 active:bg-primary-300"
                classList={{ 'bg-primary-400': props.value ?? value() === option }}
                onClick={() => selectOption(option)}
              >
                {option}
              </li>
            )}
          </For>
        </ul>
      </div>
    </div>
  );
};

export default Select;
