import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCurrentUser } from '../../users/providers/UserProvider';
import { jobService } from '../../jobs/services/jobsApiService';
import JobCard from '../../jobs/components/JobCard';


function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useCurrentUser();

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      const data = await jobService.getAllJobs();
      setJobs(data);
    } catch (error) {
      console.error('Error loading jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading jobs...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-green-500 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Browse Job Opportunities</h1>
          <p className="text-xl text-green-100">
            Discover your next career move
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {user?.userType === 'recruiter' && (
          <div className="mb-6">
            <Link
              to="/jobs/create"
              className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700"
            >
              + Post a Job
            </Link>
          </div>
        )}

        {jobs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No jobs available at the moment.</p>
            <p className="text-gray-500 mt-2">Check back soon!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map(job => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default JobsPage;