import { CollapsibleProvider } from './CollapsibleContext';

const Collapsible = (props: any) => {
  return (
    <CollapsibleProvider>
      <div id={props.id}>{props.children}</div>
    </CollapsibleProvider>
  );
};

export default Collapsible;
