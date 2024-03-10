import { useCollapsible } from './CollapsibleContext';

const CollapsibleHeader = (props: any) => {
  const { toggle } = useCollapsible();

  return (
    <div role="button" onClick={toggle}>
      {props.children}
    </div>
  );
};

export default CollapsibleHeader;
