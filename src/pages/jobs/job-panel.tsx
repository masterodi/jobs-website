import { Component, For, Show } from 'solid-js';
import { Job } from '../../types';

type JobPanelProps = {
  job?: Job;
};

export const JobPanel: Component<JobPanelProps> = (props) => {
  return (
    <Show when={props.job} fallback={<div>Select a job to see more details</div>} keyed>
      {(job) => (
        <div class="max-h-screen">
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

          <section class="mt-4">
            <h4 class="font-bold">Requirements</h4>
            <p>{job.requirements}</p>
            <div class="mt-2">
              <span class="font-semibold">Required skills:</span>
              <ul class="ml-8 mt-2 list-disc">
                <For each={job.required_skills}>{(s) => <li>{s}</li>}</For>
              </ul>
            </div>
            <p class="mt-2">
              <span class="font-semibold">Experience:</span> {job.years_experience}+ years of experience
            </p>
            <p class="mt-2">
              <span class="font-semibold">Education:</span> {job.education_level}
            </p>
          </section>
        </div>
      )}
    </Show>
  );
};

export default JobPanel;
