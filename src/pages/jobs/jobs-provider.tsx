import { Accessor, Resource, Setter, createContext, createResource, createSignal, useContext } from 'solid-js';
import { JOBS_ORDER, getJobs, getJobsEmploymentTypes, getJobsIndustries, getJobsSkills } from '../../api/jobs';
import { Option } from '../../components/Select';
import { Job, JobsOrder } from '../../types';

type JobsContextProps = {
  jobs: ReturnType<typeof createResource<Job[]>>[0];
  refetch: ReturnType<typeof createResource<Job[]>>[1]['refetch'];
  skills: Resource<string[]>;
  industries: Resource<string[]>;
  employmentTypes: Resource<string[]>;
  searchSignal: Accessor<string>;
  setSearchSignal: Setter<string>;
  orderSignal: Accessor<Option>;
  setOrderSignal: Setter<Option>;
  skillsSignal: Accessor<Option[] | undefined>;
  setSkillsSignal: Setter<Option[] | undefined>;
  industriesSignal: Accessor<Option[] | undefined>;
  setIndustriesSignal: Setter<Option[] | undefined>;
  employmentTypesSignal: Accessor<Option[] | undefined>;
  setEmploymentTypesSignal: Setter<Option[] | undefined>;
};

const JobsContext = createContext<JobsContextProps>();

export const orderOptions = [
  { value: JOBS_ORDER.JOB_TITLE.ASC, label: 'A to Z' },
  { value: JOBS_ORDER.JOB_TITLE.DESC, label: 'Z to A' },
] as { value: JobsOrder; label: string }[];

export const JobsProvider = (props: any) => {
  const [searchSignal, setSearchSignal] = createSignal('');
  const [orderSignal, setOrderSignal] = createSignal<Option>(orderOptions[0]);
  const [skillsSignal, setSkillsSignal] = createSignal<Option[]>();
  const [industriesSignal, setIndustriesSignal] = createSignal<Option[]>();
  const [employmentTypesSignal, setEmploymentTypesSignal] = createSignal<Option[]>();

  const [skills] = createResource(getJobsSkills);
  const [industries] = createResource(getJobsIndustries);
  const [employmentTypes] = createResource(getJobsEmploymentTypes);
  const [jobs, { refetch }] = createResource(
    () => [orderSignal(), skillsSignal(), industriesSignal(), employmentTypesSignal()] as const,
    ([orderVal, skillsVal, industriesVal, employmentTypesVal]) =>
      getJobs({
        order: orderVal.value as JobsOrder,
        skills:
          skillsVal?.reduce((acc, curr) => {
            return [...acc, curr.value];
          }, [] as string[]) ?? undefined,
        industries:
          industriesVal?.reduce((acc, curr) => {
            return [...acc, curr.value];
          }, [] as string[]) ?? undefined,
        employmentTypes:
          employmentTypesVal?.reduce((acc, curr) => {
            return [...acc, curr.value];
          }, [] as string[]) ?? undefined,
      }),
  );

  return (
    <JobsContext.Provider
      value={{
        jobs,
        refetch,
        searchSignal,
        setSearchSignal,
        orderSignal,
        setOrderSignal,
        skills,
        industries,
        employmentTypes,
        skillsSignal,
        setSkillsSignal,
        industriesSignal,
        setIndustriesSignal,
        employmentTypesSignal,
        setEmploymentTypesSignal,
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
