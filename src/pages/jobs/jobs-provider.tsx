import { createContext, createResource, useContext } from 'solid-js';
import { createStore } from 'solid-js/store';
import { getJobs } from '../../api/jobs';

const JobsContext = createContext(null);

export const JobsProvider = (props: any) => {
  const [jobs, { refetch }] = createResource([], getJobs);
  const [filters, setFilters] = createStore({ searchValue: '', sort: { by: 'default', order: 'asc' } });
  const filteredJobs = () =>
    jobs()?.filter((val) => val.job_title.toLowerCase().includes(filters.searchValue.toLowerCase())) ?? [];

  return (
    <JobsContext.Provider value={{ jobs, refetch, filters, setFilters, filteredJobs }}>
      {props.children}
    </JobsContext.Provider>
  );
};

export const useJobsContext = () => {
  const ctx = useContext(JobsContext);

  if (!ctx) {
    throw new Error('useJobsContext must be used inside child');
  }

  return ctx;
};
