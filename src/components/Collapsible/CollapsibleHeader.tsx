import { useCollapsible } from './CollapsibleContext';

const CollapsibleHeader = (props: any) => {
  const { toggle } = useCollapsible();

  return (
    <div role="button" onClick={toggle} class="mb-2">
      {props.children}
    </div>
  );
};

export default CollapsibleHeader;
