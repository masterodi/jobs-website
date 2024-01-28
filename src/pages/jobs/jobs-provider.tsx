import { createContext, createResource, useContext } from 'solid-js';
import { SetStoreFunction, createStore } from 'solid-js/store';
import { getJobs } from '../../api/jobs';
import { Job } from '../../types';

type JobsContextProps = {
  jobs: ReturnType<typeof createResource<Job[]>>[0];
  refetch: ReturnType<typeof createResource<Job[]>>[1]['refetch'];
  filters: { searchValue: string; sort: { by: string; order: string } };
  setFilters: SetStoreFunction<{ searchValue: string; sort: { by: string; order: string } }>;
  filteredJobs: () => Job[];
};

const JobsContext = createContext<JobsContextProps>();

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
