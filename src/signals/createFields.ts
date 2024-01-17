import { createStore } from 'solid-js/store';

type InputEv = InputEvent & {
  currentTarget: HTMLInputElement;
  target: HTMLInputElement;
};

const createFields = (initialValue: any) => {
  const [fields, setFields] = createStore(initialValue);

  const onInput = (e: InputEv) => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;
    setFields({ ...fields, [name]: value });
  };

  return [fields, setFields, onInput];
};

export default createFields;
