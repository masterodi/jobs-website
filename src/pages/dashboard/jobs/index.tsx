import { For, Show, createResource } from 'solid-js';
import { getJobs } from '../../../api/jobs';
import LoadingScreen from '../../../components/LoadingScreen';

const Jobs = () => {
  const [jobs] = createResource(getJobs);

  return (
    <div class="container mx-auto flex flex-col gap-8 p-8">
      <Show when={!jobs.loading} fallback={<LoadingScreen />}>
        <For each={jobs()}>
          {(job) => (
            <div class="rounded-md bg-neutral-950/25 p-4 shadow-md">
              <div class="mb-4 flex justify-between gap-4">
                <div class="flex flex-col gap-1">
                  <h2 class="title-4 leading-8">{job.job_title}</h2>
                  <p>
                    {job.company_name}
                    <span class="text-neutral-400">, {job.location}</span>
                  </p>
                </div>
                <div class="flex flex-col gap-1 text-end">
                  <p class="leading-8">{job.employment_type}</p>
                  <p>{job.industry}</p>
                </div>
              </div>
              <div>
                <h3 class="title-6s mb-2">Skills</h3>
                <div class="flex flex-wrap gap-2">
                  <For each={job.required_skills}>
                    {(skill) => <div class="rounded-md bg-neutral-800 p-1">{skill}</div>}
                  </For>
                </div>
              </div>
            </div>
          )}
        </For>
      </Show>
    </div>
  );
};

export default Jobs;
