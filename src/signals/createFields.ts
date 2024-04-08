import { createStore } from 'solid-js/store';
import { Schema, ValidationError } from 'yup';

type InputEv = InputEvent & {
  currentTarget: HTMLInputElement;
  target: HTMLInputElement;
};

const initialFieldErrorsFromFields = <T extends Record<string, string>>(fields: T) => {
  let fieldErrors = {} as { [key in keyof T]: string | null };

  for (const k in fields) {
    fieldErrors = { ...fieldErrors, [k]: null };
  }

  return fieldErrors;
};

const createFields = <T extends Record<string, string>>(initialValue: T, validationSchema?: Schema<T>) => {
  const [fields, setFields] = createStore(initialValue);
  const [fieldErrors, setFieldErrors] = createStore(initialFieldErrorsFromFields(initialValue));

  const onInput = (e: InputEv) => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;
    setFields({ ...fields, [name]: value });
  };

  const validate = async () => {
    try {
      setFieldErrors(initialFieldErrorsFromFields(initialValue));
      await validationSchema?.validate(fields, { abortEarly: false });
      return true;
    } catch (err) {
      if (!(err instanceof ValidationError)) {
        throw err;
      }

      for (const k of err.inner) {
        setFieldErrors({ ...fieldErrors, ...(k.path && { [k.path]: k.message }) });
      }

      return false;
    }
  };

  return { fields, fieldErrors, onInput, validate };
};

export default createFields;
