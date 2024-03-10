import { createSignal } from 'solid-js';

const createJobsFilters = () => {
  const [search, setSearch] = createSignal('');
  const [skills, setSkills] = createSignal<string[]>();
  const [industries, setIndustries] = createSignal<string[]>();
  const [employmentTypes, setEmploymentTypes] = createSignal<string[]>();

  return { search, setSearch, skills, setSkills, industries, setIndustries, employmentTypes, setEmploymentTypes };
};

export default createJobsFilters;
