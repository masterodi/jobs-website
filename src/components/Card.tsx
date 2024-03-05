import { JSX, ParentComponent, splitProps } from 'solid-js';

type CardProps = JSX.HTMLAttributes<HTMLDivElement> & {
  clickable?: boolean;
  active?: boolean;
  variant: 'primary' | 'neutral';
};

const Card: ParentComponent<CardProps> = (props) => {
  const [local, other] = splitProps(props, ['clickable', 'variant', 'children', 'class', 'classList', 'active']);

  return (
    <div
      class="flex flex-col rounded-lg p-4 shadow-md transition-all duration-200 ease-in-out hover:brightness-[101%] "
      classList={{
        'cursor-pointer': local.clickable,
        'border-2 border-transparent': local.active !== undefined && !local.active,
        'border-2 border-primary-500': local.active,
        'bg-primary-900 fill-white text-white': local.variant === 'primary',
        'bg-neutral-50 fill-black text-black': local.variant === 'neutral',
      }}
      {...other}
    >
      {local.children}
    </div>
  );
};

export default Card;
