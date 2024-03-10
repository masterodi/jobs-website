import { JSX, ParentComponent, ValidComponent, splitProps } from 'solid-js';
import { Dynamic } from 'solid-js/web';

type CardProps = JSX.HTMLAttributes<HTMLDivElement> & {
  onClick?: JSX.EventHandlerUnion<HTMLDivElement, MouseEvent>;
  active?: boolean;
  variant: 'primary' | 'neutral';
  as?: ValidComponent;
  href?: string;
};

const Card: ParentComponent<CardProps> = (props) => {
  const [local, other] = splitProps(props, ['as', 'onClick', 'variant', 'children', 'class', 'classList', 'active']);

  return (
    <Dynamic
      component={local.as ?? 'div'}
      onClick={local.onClick}
      class="flex flex-col rounded-lg p-4 transition-all duration-200 ease-in-out hover:brightness-[101%] "
      classList={{
        'cursor-pointer': !!local.onClick,
        'border-2 border-transparent': local.active !== undefined && !local.active,
        'border-2 border-primary-500': local.active,
        'bg-primary-900 fill-white text-white': local.variant === 'primary',
        'bg-transparent-50 shadow-md fill-black text-black': local.variant === 'neutral',
      }}
      {...other}
    >
      {local.children}
    </Dynamic>
  );
};

export default Card;
