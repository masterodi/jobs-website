import { Card, CardBody, CardHeader } from '../../components/Card';

const CardJob = (props: any) => {
  return (
    <Card as="a" href={`/jobs/${props.job.id}`} variant="neutral">
      <CardHeader>
        <div class="flex justify-between">
          <div>
            <h3>
              <span class="font-semibold">{props.job.job_title}</span> at {props.job.company_name}
            </h3>
            <small>{props.job.location}</small>
          </div>
          <div class="text-primary-600">{props.job.employment_type}</div>
        </div>
      </CardHeader>
      <CardBody>
        <p class="line-clamp-3">{props.job.job_description}</p>
      </CardBody>
    </Card>
  );
};

export default CardJob;
