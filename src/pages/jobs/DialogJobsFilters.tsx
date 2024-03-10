import { createResource } from 'solid-js';
import { getJobsEmploymentTypes, getJobsIndustries, getJobsSkills } from '../../api/jobs';
import Dialog from '../../components/Dialog';
import JobsFilter from './JobFilter';
import { useJobsContext } from './jobs-provider';

const DialogJobsFilters = (props: any) => {
  const { filters } = useJobsContext();
  const [skills] = createResource(getJobsSkills);
  const [industries] = createResource(getJobsIndustries);
  const [employmentTypes] = createResource(getJobsEmploymentTypes);

  return (
    <Dialog open={props.open} setOpen={props.setOpen}>
      <JobsFilter
        title="Skills"
        filters={skills()}
        selectedFilters={filters.skills()}
        setSelectedFilters={filters.setSkills}
      />
      <JobsFilter
        title="Industry"
        filters={industries()}
        selectedFilters={filters.industries()}
        setSelectedFilters={filters.setIndustries}
      />
      <JobsFilter
        title="Employment Type"
        filters={employmentTypes()}
        selectedFilters={filters.employmentTypes()}
        setSelectedFilters={filters.setEmploymentTypes}
      />
    </Dialog>
  );
};

export default DialogJobsFilters;
