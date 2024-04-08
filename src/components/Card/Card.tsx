import { A } from '@solidjs/router';
import { cva } from 'class-variance-authority';
import { ParentComponent, splitProps } from 'solid-js';
import { Dynamic } from 'solid-js/web';

const cardVariants = cva(
  ['flex', 'flex-col', 'rounded-lg', 'p-4', 'transition-all', 'duration-200', 'ease-in-out', 'hover:brightness-[101%]'],
  {
    variants: {
      intent: {
        primary: ['bg-primary-900', 'fill-white', 'text-white'],
        neutral: ['bg-transparent-50', 'shadow-md', 'fill-black', 'text-black'],
      },
      clickable: {
        false: '',
        true: 'cursor-pointer',
      },
      active: {
        false: 'border-2 border-transparent',
        true: 'border-2 border-primary-500',
      },
    },
    defaultVariants: {
      intent: 'primary',
      clickable: false,
      active: false,
    },
  },
);

const Card: ParentComponent<any> = (props) => {
  if ('href' in props) {
    const [local, other] = splitProps(props, ['href', 'noScroll', 'variant', 'children']);

    return (
      <A href={local.href} class={cardVariants({ intent: local.variant })} noScroll={local.noScroll} {...other}>
        {local.children}
      </A>
    );
  }

  const [local, other] = splitProps(props, ['as', 'onClick', 'variant', 'active', 'children']);

  return (
    <Dynamic
      component={local.as}
      onClick={local.onClick as any}
      class={cardVariants({ intent: local.active, active: local.active, clickable: !!local.onClick })}
      {...other}
    >
      {local.children}
    </Dynamic>
  );
};

export default Card;
