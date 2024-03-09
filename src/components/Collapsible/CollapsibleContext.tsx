import { Accessor, createContext, createSignal, useContext } from 'solid-js';

const CollapsibleContext = createContext<{ open: Accessor<boolean>; toggle: () => void }>();

export const CollapsibleProvider = (props: any) => {
  const [open, setOpen] = createSignal<boolean>(props.open ?? false);

  const toggle = () => setOpen((prev) => !prev);

  return <CollapsibleContext.Provider value={{ open, toggle }}>{props.children}</CollapsibleContext.Provider>;
};

export const useCollapsible = () => {
  const ctx = useContext(CollapsibleContext);
  if (!ctx) {
    throw new Error('useCollapsible must be called inside child of CollapsibleProvider');
  }

  return ctx;
};
