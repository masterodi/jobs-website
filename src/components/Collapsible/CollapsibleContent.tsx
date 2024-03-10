import { useCollapsible } from './CollapsibleContext';

const CollapsibleContent = (props: any) => {
  let contentRef: HTMLDivElement;

  const { open } = useCollapsible();
  const maxHeight = () => (!open() ? '0px' : `${contentRef.scrollHeight}px`);

  return (
    <div
      role="region"
      ref={contentRef!}
      class="transition-md my-2 overflow-hidden"
      style={{ 'max-height': maxHeight() }}
    >
      {props.children}
    </div>
  );
};

export default CollapsibleContent;
