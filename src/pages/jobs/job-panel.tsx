import { Show } from 'solid-js';

export const JobPanel = (props: any) => {
  return (
    <Show when={props.job} fallback={<div>Select a job to see more details</div>}>
      <div class="flex gap-4">
        <div class="h-16 w-16 rounded-lg border-2 border-primary-500" />
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
    </Show>
  );
};

export default JobPanel;
