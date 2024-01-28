import { Component, For, Setter, Show } from 'solid-js';
import Input from '../../components/Input';
import LoadingIndicator from '../../components/LoadingIndicator';
import { Job } from '../../types';
import { useJobsContext } from './jobs-provider';

type JobCardProps = {
  active?: boolean;
  onClick: (event: MouseEvent) => void;
  job: Job;
};

const JobCard: Component<JobCardProps> = (props) => {
  return (
    <div
      class="block cursor-pointer rounded-lg border-2 bg-neutral-50 p-4 shadow-md transition-all duration-200 ease-in-out hover:brightness-[101%]"
      classList={{ 'border-transparent': !props.active, 'border-primary-500': props.active }}
      onClick={props.onClick}
    >
      <div class="flex flex-col gap-8">
        <div class="flex justify-between gap-8">
          <h4>
            <strong class="text-lg">{props.job.job_title}</strong> at{' '}
            <span class="text-primary-500">{props.job.company_name}</span>
          </h4>
          <div class="text-end">
            <p class="text-nowrap text-neutral-500">{props.job.employment_type}</p>
          </div>
        </div>
        <div>
          <p>
            <span class="font-semibold">Location:</span> {props.job.location}
          </p>
        </div>
      </div>
    </div>
  );
};

const JobsListLoading = () => {
  return (
    <div class="grid place-items-center">
      <LoadingIndicator />
      <p class="mt-1 text-sm font-semibold">Getting jobs ready... Please wait</p>
    </div>
  );
};

type JobsListProps = {
  selectedJob?: Job;
  setSelectedJob: Setter<Job | undefined>;
};

const JobsList: Component<JobsListProps> = (props) => {
  const { jobs, filteredJobs, filters } = useJobsContext();

  return (
    <Show when={!jobs.loading} fallback={<JobsListLoading />}>
      <div class="flex justify-between">
        <div>
          <h4 class="text-xl font-bold">
            <Show when={filters.searchValue !== ''} fallback="All jobs listed">
              Related to '{filters.searchValue}'
            </Show>
          </h4>
          <p>{filteredJobs().length} jobs available</p>
        </div>
        <div>
          <Input />
        </div>
      </div>

      <div class="mt-8 max-h-screen overflow-y-auto overflow-x-hidden [&>*+*]:mt-4">
        <For each={filteredJobs()}>
          {(job, _) => (
            <JobCard job={job} active={job.id === props.selectedJob?.id} onClick={() => props.setSelectedJob(job)} />
          )}
        </For>
      </div>
    </Show>
  );
};

export default JobsList;
