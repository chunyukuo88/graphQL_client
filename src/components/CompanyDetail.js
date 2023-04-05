import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getCompany } from '../graphql/queries';
import JobList from "./JobList";

function CompanyDetail() {
  const [company, setCompany] = useState(null);
    // Make sure this aligns with the resolvers.js file on the back end. It cannot be `id`:
    // The reason why the resolvers.js uses 'companyId' is because that's what the mock
    // database uses.
  const { companyId } = useParams();

  useEffect(() => {
    getCompany(companyId).then(setCompany);
  }, [companyId]);

  if (!company) {
    return <p>Loading...</p>
  }
  
  return (
    <div>
      <h1 className='title'>
        {company.name}
      </h1>
      <div className='box'>
        {company.description}
      </div>
      <div className='jobs'>
        Jobs at {company.name}
      </div>
      <JobList jobs={company.jobs} />
    </div>
  );
}

export default CompanyDetail;
