import { createSignal } from 'solid-js';
import JobPanel from './job-panel';
import JobsFilters from './jobs-filters';
import JobsList from './jobs-list';
import { JobsProvider } from './jobs-provider';

const Jobs = () => {
  const [selectedJob, setSelectedJob] = createSignal(null);

  return (
    <JobsProvider>
      <header class="bg-primary-900">
        <div class="container mx-auto flex flex-col justify-center px-8 py-16">
          <h1 class="mb-1 font-accent text-4xl font-bold text-white">Available jobs</h1>
          <p class="text-neutral-200">Looking for a job? Browse our latest job openings</p>
        </div>
      </header>

      <div class="bg-neutral-50">
        <div class="container mx-auto flex gap-4 px-8 py-4">
          <JobsFilters />
        </div>
      </div>

      <section class="py-4">
        <div class="container mx-auto p-8">
          <div class="flex gap-8">
            <div class="basis-1/3">
              <JobsList selectedJob={selectedJob()} setSelectedJob={setSelectedJob} />
            </div>

            <div class="basis-2/3 overflow-y-auto rounded-lg bg-neutral-50 p-8 shadow-md">
              <JobPanel job={selectedJob()} />
            </div>
          </div>
        </div>
      </section>
    </JobsProvider>
  );
};

export default Jobs;
