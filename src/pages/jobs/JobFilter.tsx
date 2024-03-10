import { For, Setter } from 'solid-js';
import Checkbox from '../../components/Checkbox';
import { Collapsible, CollapsibleContent, CollapsibleHeader } from '../../components/Collapsible';
import Pill from '../../components/Pill';

const defaultGetFilterLabel = <F,>(filter: F) => filter as string;
const defaultGetFilterValue = <F, V>(filter: F) => filter as unknown as V;
const eq = <F,>(filter1: F, filter2: F, getFilterValue = defaultGetFilterValue) =>
  getFilterValue(filter1) === getFilterValue(filter2);

type JobsFilterProps<F> = {
  title: string;
  filters?: F[];
  selectedFilters?: F[];
  setSelectedFilters: Setter<F[] | undefined>;
  getFilterLabel?: (filter: F) => string;
  getFilterValue?: typeof defaultGetFilterValue;
};

const JobsFilter = <F,>(props: JobsFilterProps<F>) => {
  const getFilterLabel = props.getFilterLabel ?? defaultGetFilterLabel;
  const getFilterValue = props.getFilterValue ?? defaultGetFilterValue;
  const filtersEq = (f1: F, f2: F) => eq(f1, f2, getFilterValue);
  const getCheckboxId = (f: F) => `checkbox-filter-${getFilterLabel(f).replace(' ', '-')}`;

  const removeFilter = (filter: F) => {
    props.setSelectedFilters((prev) => prev?.filter((x) => !filtersEq(x, filter)) ?? []);
  };

  const handleFilterChange = (ev: any) => {
    if (ev.currentTarget.checked) {
      props.setSelectedFilters((prev) => [...(prev ? prev : []), ev.currentTarget.value]);
    } else {
      removeFilter(ev.currentTarget.value);
    }
  };

  return (
    <Collapsible>
      <CollapsibleHeader>
        <h3 class="text-lg font-semibold">{props.title}</h3>
        <div class="mt-1 flex flex-wrap gap-2">
          <For each={props.selectedFilters}>
            {(filter) => (
              <Pill variant="primary" label={getFilterLabel(filter)} onDelete={() => removeFilter(filter)} />
            )}
          </For>
        </div>
      </CollapsibleHeader>
      <CollapsibleContent>
        <For each={props.filters}>
          {(f) => (
            <Checkbox
              label={getFilterLabel(f)}
              value={getFilterValue(f)}
              id={getCheckboxId(f)}
              checked={props.selectedFilters?.some((x) => filtersEq(x, f))}
              onChange={handleFilterChange}
            />
          )}
        </For>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default JobsFilter;
