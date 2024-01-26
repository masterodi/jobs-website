import { For, Show, createResource, createSignal } from 'solid-js';
import { getJobs } from '../api/jobs';
import LoadingScreen from '../components/LoadingScreen';

const JobsLoading = () => {
  return (
    <LoadingScreen>
      <div class="mt-8 text-lg font-semibold">Getting jobs... Please wait</div>
    </LoadingScreen>
  );
};

const CardJob = (props: any) => {
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

const PanelJob = (props: any) => {
  return (
    <>
      <div class="flex gap-4">
        <div class="border-primary-500 h-16 w-16 rounded-lg border-2" />
        <div class="flex-1">
          <h3 class="text-2xl font-bold">{props.job.job_title}</h3>
          <p class="mt-2 text-sm">
            {props.job.company_name} - {props.job.employment_type}
          </p>
          <p class="text-sm">Location: {props.job.location}</p>
        </div>
      </div>

      <hr class="my-8" />

      <section>
        <h4 class="font-bold">Job Overview</h4>
        <p>{props.job.job_description}</p>
      </section>

      <section class="mt-4">
        <h4 class="font-bold">Requirements</h4>
        <p>{props.job.requirements}</p>
        <p class="mt-1">
          <span class="font-semibold">Experience:</span> {props.job.experience}
        </p>
        <p class="mt-1">
          <span class="font-semibold">Education:</span> {props.job.education}
        </p>
      </section>
    </>
  );
};

const Jobs = () => {
  const [jobs] = createResource([], getJobs);
  const [selectedJob, setSelectedJob] = createSignal(null);

  return (
    <Show when={!jobs.loading} fallback={<JobsLoading />}>
      <header class="bg-primary-900">
        <div class="container mx-auto flex flex-col justify-center px-8 py-16">
          <h1 class="mb-1 font-accent text-4xl font-bold text-white">Available jobs</h1>
          <p class="text-neutral-200">Looking for a job? Browse our latest job openings</p>
        </div>
      </header>

      <section>
        <div class="container mx-auto p-8">
          <div class="flex max-h-screen gap-8">
            <div class="basis-1/3 overflow-y-auto overflow-x-hidden [&>*+*]:mt-4">
              <For each={jobs()}>
                {(job, i) => (
                  <CardJob job={job} active={job.id === selectedJob()?.id} onClick={() => setSelectedJob(job)} />
                )}
              </For>
            </div>

            <div class="basis-2/3 overflow-y-auto rounded-lg bg-neutral-50 p-8 shadow-md">
              <Show when={selectedJob()} fallback={<h4 class="text-lg">Select a job to see more details</h4>}>
                <PanelJob job={selectedJob()} />
              </Show>
            </div>
          </div>
        </div>
      </section>
    </Show>
  );
};

export default Jobs;
