import { createContext, createResource, useContext } from 'solid-js';
import { JOBS_ORDER, getJobs } from '../../api/jobs';
import createJobsFilters from '../../signals/createJobsFilters';
import { Job, JobsOrder } from '../../types';

const orderOptions = [
  { value: JOBS_ORDER.JOB_TITLE.ASC, label: 'A to Z' },
  { value: JOBS_ORDER.JOB_TITLE.DESC, label: 'Z to A' },
] as { value: JobsOrder; label: string }[];

type JobsContextProps = {
  jobs: ReturnType<typeof createResource<Job[]>>[0];
  refetch: ReturnType<typeof createResource<Job[]>>[1]['refetch'];
  filters: ReturnType<typeof createJobsFilters>;
};

const JobsContext = createContext<JobsContextProps>();

export const JobsProvider = (props: any) => {
  const filters = createJobsFilters();

  const [jobs, { refetch }] = createResource(
    () => [filters.skills(), filters.industries(), filters.employmentTypes()] as const,
    ([skillsVal, industriesVal, employmentTypesVal]) =>
      getJobs({
        skills: skillsVal,
        industries: industriesVal,
        employmentTypes: employmentTypesVal,
      }),
  );

  return (
    <JobsContext.Provider
      value={{
        jobs,
        refetch,
        filters,
      }}
    >
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
