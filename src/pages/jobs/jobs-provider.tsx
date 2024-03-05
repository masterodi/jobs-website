import { Accessor, Resource, Setter, createContext, createResource, createSignal, useContext } from 'solid-js';
import { JOBS_ORDER, getJobs, getJobsEmploymentTypes, getJobsIndustries, getJobsSkills } from '../../api/jobs';
import { MultiValue, SingleValue } from '../../components/Select';
import { Job, JobsOrder } from '../../types';

type Option = { value: string; label: string };

type JobsContextProps = {
  jobs: ReturnType<typeof createResource<Job[]>>[0];
  refetch: ReturnType<typeof createResource<Job[]>>[1]['refetch'];

  searchSignal: Accessor<string>;
  setSearchSignal: Setter<string>;

  orderOptions: { value: JobsOrder; label: string }[];
  orderSignal: Accessor<SingleValue<{ value: JobsOrder; label: string }>>;
  setOrderSignal: Setter<SingleValue<{ value: JobsOrder; label: string }>>;

  skills: Resource<string[]>;
  skillsSignal: Accessor<MultiValue<Option> | undefined>;
  setSkillsSignal: Setter<MultiValue<Option> | undefined>;

  industries: Resource<string[]>;
  industriesSignal: Accessor<MultiValue<Option> | undefined>;
  setIndustriesSignal: Setter<MultiValue<Option> | undefined>;

  employmentTypes: Resource<string[]>;
  employmentTypesSignal: Accessor<MultiValue<Option> | undefined>;
  setEmploymentTypesSignal: Setter<MultiValue<Option> | undefined>;
};

const JobsContext = createContext<JobsContextProps>();

const orderOptions = [
  { value: JOBS_ORDER.JOB_TITLE.ASC, label: 'A to Z' },
  { value: JOBS_ORDER.JOB_TITLE.DESC, label: 'Z to A' },
] as { value: JobsOrder; label: string }[];

export const JobsProvider = (props: any) => {
  const [searchSignal, setSearchSignal] = createSignal('');
  const [orderSignal, setOrderSignal] = createSignal<SingleValue<{ value: JobsOrder; label: string }>>(orderOptions[0]);
  const [skillsSignal, setSkillsSignal] = createSignal<MultiValue<Option>>();
  const [industriesSignal, setIndustriesSignal] = createSignal<MultiValue<Option>>();
  const [employmentTypesSignal, setEmploymentTypesSignal] = createSignal<MultiValue<Option>>();

  const [skills] = createResource(getJobsSkills);
  const [industries] = createResource(getJobsIndustries);
  const [employmentTypes] = createResource(getJobsEmploymentTypes);
  const [jobs, { refetch }] = createResource(
    () => [orderSignal(), skillsSignal(), industriesSignal(), employmentTypesSignal()] as const,
    ([orderVal, skillsVal, industriesVal, employmentTypesVal]) =>
      getJobs({
        order: orderVal!.value as JobsOrder,
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
        orderOptions,
        orderSignal,
        setOrderSignal,
        skills,
        skillsSignal,
        setSkillsSignal,
        industries,
        industriesSignal,
        setIndustriesSignal,
        employmentTypes,
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
