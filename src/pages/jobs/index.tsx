import { For, Show, createSignal } from 'solid-js';
import Card from '../../components/Card';
import Input from '../../components/Input';
import LoadingIndicator from '../../components/LoadingIndicator';
import Select from '../../components/Select';
import { Job } from '../../types';
import { JobsProvider, useJobsContext } from './jobs-provider';

const Content = () => {
  const ctx = useJobsContext();
  const [selectedJob, setSelectedJob] = createSignal<Job>();
  const filteredJobs = () =>
    ctx.jobs()?.filter((val) => val.job_title.toLowerCase().includes(ctx.searchSignal().toLowerCase())) ?? [];

  return (
    <>
      <header class="bg-primary-900">
        <div class="container mx-auto flex flex-col justify-center gap-1 px-8 py-16 text-neutral-50">
          <h1 class="font-accent text-4xl font-bold">Available jobs</h1>
          <p class="text-neutral-200">Looking for a job? Browse our latest job openings</p>
        </div>
      </header>

      <div class="container mx-auto flex gap-4 py-4">
        <div class="w-3/6">
          <Input
            placeholder="Search..."
            fluid
            onInput={(e) => ctx.setSearchSignal(e.currentTarget.value)}
            value={ctx.searchSignal()}
          />
        </div>
        <div class="w-1/6">
          <Select
            multi
            options={ctx.skills()?.map((s) => ({ value: s, label: s }))}
            value={ctx.skillsSignal()}
            onChange={ctx.setSkillsSignal}
          />
        </div>
        <div class="w-1/6">
          <Select
            multi
            options={ctx.industries()?.map((s) => ({ value: s, label: s }))}
            value={ctx.industriesSignal()}
            onChange={ctx.setIndustriesSignal}
          />
        </div>
        <div class="w-1/6">
          <Select
            multi
            options={ctx.employmentTypes()?.map((s) => ({ value: s, label: s }))}
            value={ctx.employmentTypesSignal()}
            onChange={ctx.setEmploymentTypesSignal}
          />
        </div>
      </div>

      <section class="container mx-auto flex gap-8 py-4">
        <div class="basis-1/3">
          <div class="flex justify-between">
            <div class="w-2/3">
              <h4 class="text-xl font-bold">
                {ctx.searchSignal() !== '' ? `Related to ${ctx.searchSignal()}` : 'All jobs listed'}
              </h4>
              <p>{filteredJobs().length} jobs available</p>
            </div>
            <div class="w-1/3">
              <Select options={ctx.orderOptions} value={ctx.orderSignal()} onChange={ctx.setOrderSignal} />
            </div>
          </div>

          <div class="mt-8 max-h-screen overflow-y-auto overflow-x-hidden [&>*+*]:mt-4">
            <Show when={!ctx.jobs.loading} fallback={<LoadingIndicator />}>
              <For each={filteredJobs()}>
                {(job, _) => (
                  <Card
                    clickable
                    variant="neutral"
                    active={selectedJob()?.id === job.id}
                    onClick={() => setSelectedJob(job)}
                  >
                    <div class="flex flex-col gap-8">
                      <div class="flex justify-between gap-8">
                        <h4>
                          <strong class="text-lg">{job.job_title}</strong> at{' '}
                          <span class="text-primary-500">{job.company_name}</span>
                        </h4>
                        <div class="text-end">
                          <p class="text-nowrap text-neutral-500">{job.employment_type}</p>
                        </div>
                      </div>
                      <div>
                        <p>
                          <span class="font-semibold">Location:</span> {job.location}
                        </p>
                      </div>
                    </div>
                  </Card>
                )}
              </For>
            </Show>
          </div>
        </div>

        <div class="basis-2/3 overflow-y-auto rounded-lg bg-neutral-50 p-8 shadow-md">
          <Show when={selectedJob()} fallback={<div>Select a job to see more details</div>} keyed>
            {(job) => (
              <div>
                <div class="flex gap-4">
                  <div class="h-16 w-16 rounded-lg border-2 border-primary-500" />
                  <div class="flex-1">
                    <h3 class="text-2xl font-bold">{job.job_title}</h3>
                    <p class="mt-2 text-sm">
                      {job.company_name} - {job.employment_type}
                    </p>
                    <p class="text-sm">Location: {job.location}</p>
                  </div>
                </div>

                <hr class="my-8" />

                <section>
                  <h4 class="font-bold">Job Overview</h4>
                  <p>{job.job_description}</p>
                </section>

                <section class="mt-4 [&>*+*]:mt-2">
                  <h4 class="font-bold">Requirements</h4>
                  <p>{job.requirements}</p>
                  <div>
                    <span class="font-semibold">Required skills:</span>
                    <ul class="ml-8 mt-2 list-disc">
                      <For each={job.required_skills}>{(s) => <li>{s}</li>}</For>
                    </ul>
                  </div>
                  <p>
                    <span class="font-semibold">Experience:</span> {job.years_experience}+ years of experience
                  </p>
                  <p>
                    <span class="font-semibold">Education:</span> {job.education_level}
                  </p>
                </section>
              </div>
            )}
          </Show>
        </div>
      </section>
    </>
  );
};

const Jobs = () => {
  return (
    <JobsProvider>
      <Content />
    </JobsProvider>
  );
};

export default Jobs;
