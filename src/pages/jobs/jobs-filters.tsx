import Input from '../../components/Input';
import { useJobsContext } from './jobs-provider';

const JobsFilters = () => {
  const { filters, setFilters } = useJobsContext();

  return (
    <>
      <Input
        fluid
        onInput={(e) => setFilters({ ...filters, searchValue: e.currentTarget.value })}
        value={filters.searchValue}
      />
      <Input />
      <Input />
      <Input />
      <Input />
      <Input />
    </>
  );
};

export default JobsFilters;
