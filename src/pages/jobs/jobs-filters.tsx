import Input from '../../components/Input';
import Select from '../../components/Select';
import { useJobsContext } from './jobs-provider';

const JobsFilters = () => {
  const {
    searchSignal,
    setSearchSignal,
    skills,
    skillsSignal,
    setSkillsSignal,
    industries,
    industriesSignal,
    setIndustriesSignal,
    employmentTypes,
    employmentTypesSignal,
    setEmploymentTypesSignal,
  } = useJobsContext();

  return (
    <>
      <div class="w-3/6">
        <Input
          placeholder="Search..."
          fluid
          onInput={(e) => setSearchSignal(e.currentTarget.value)}
          value={searchSignal()}
        />
      </div>
      <div class="w-1/6">
        <Select
          multi
          options={skills()?.map((s) => ({ value: s, label: s }))}
          value={skillsSignal()}
          onChange={setSkillsSignal}
        />
      </div>
      <div class="w-1/6">
        <Select
          multi
          options={industries()?.map((s) => ({ value: s, label: s }))}
          value={industriesSignal()}
          onChange={setIndustriesSignal}
        />
      </div>
      <div class="w-1/6">
        <Select
          multi
          options={employmentTypes()?.map((s) => ({ value: s, label: s }))}
          value={employmentTypesSignal()}
          onChange={setEmploymentTypesSignal}
        />
      </div>
    </>
  );
};

export default JobsFilters;
