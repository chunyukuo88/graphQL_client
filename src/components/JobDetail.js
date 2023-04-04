import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getJob } from '../graphql/queries';

function JobDetail() {
  const [job, setJob] = useState(null);
  const { jobId } = useParams();

    console.log('1: jobId: ', jobId);

  useEffect(() => {
      getJob(jobId).then(job => {
          console.log('2: ', job);
          setJob(job);
          console.log('3: ', job)
      });
  }, [jobId]);

  if (!job) {
      return <p>Loading...</p>;
  }
    console.dir(job);
  return (
    <div>
      <h1 className='title'>
        {job.title}
      </h1>
      <h2 className='subtitle'>
        <Link to={`/companies/${job.company.id}`}>
          {job.company.name}
        </Link>
      </h2>
      <div className='box'>
        {job.description || 'No description given.'}
      </div>
    </div>
  );
}

export default JobDetail;
