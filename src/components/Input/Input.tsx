import InputComposed, { InputComposedProps } from './InputComposed';
import InputSimple, { InputSimpleProps } from './InputSimple';

const Input = (props: InputSimpleProps | InputComposedProps) => {
  if ('contentLeft' in props || 'contentRight' in props) {
    return <InputComposed {...props} />;
  }

  return <InputSimple {...props} />;
};

export default Input;
