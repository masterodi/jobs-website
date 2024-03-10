import { BiRegularFilter, BiRegularSearchAlt } from 'solid-icons/bi';
import { For, createSignal } from 'solid-js';
import Input from '../../components/Input';
import CardJob from './CardJob';
import DialogJobDetails from './DialogJobDetailsl';
import DialogJobsFilters from './DialogJobsFilters';
import { JobsProvider, useJobsContext } from './jobs-provider';

const Content = () => {
  const { jobs, filters } = useJobsContext();
  const [areFiltersOpen, setAreFiltersOpen] = createSignal(false);
  const searchedJobs = () =>
    jobs()?.filter((job) => job.job_title.toLowerCase().includes(filters.search().toLowerCase()));

  return (
    <>
      <div class="container mx-auto p-4">
        <header class="mt-8">
          <h1 class="text-4xl font-bold">Find your next awesome job</h1>
        </header>

        <div class="mt-8">
          <Input
            fluid
            value={filters.search()}
            onInput={(ev) => {
              filters.setSearch(ev.currentTarget.value);
            }}
            placeholder="Search job"
            content={{
              left: <BiRegularSearchAlt size={24} />,
              right: (
                <button
                  type="button"
                  onClick={() => setAreFiltersOpen(true)}
                  class="transition-md rounded-md hover:bg-primary-500/50"
                >
                  <BiRegularFilter size={24} />
                </button>
              ),
            }}
          />
        </div>

        <section class="my-4 [&>*+*]:mt-4">
          <For each={searchedJobs()}>{(job) => <CardJob job={job} />}</For>
        </section>
      </div>

      <DialogJobsFilters open={areFiltersOpen()} setOpen={setAreFiltersOpen} />
      <DialogJobDetails />
    </>
  );
};

const PageJobs = () => {
  return (
    <JobsProvider>
      <Content />
    </JobsProvider>
  );
};

export default PageJobs;
