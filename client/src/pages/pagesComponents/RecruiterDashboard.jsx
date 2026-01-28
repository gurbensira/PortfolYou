import { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';

import { useCurrentUser } from '../../users/providers/UserProvider';
import { jobService } from '../../jobs/services/jobsApiService';
import JobCard from '../../jobs/components/JobCard';
import { useSnackbar } from '../../providers/SnackbarProvider'

function RecruiterDashboard() {
  const { user } = useCurrentUser();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ total: 0, active: 0, totalViews: 0 });
  const { success, error } = useSnackbar();

  useEffect(() => {
    if (user?._id) {
      loadMyJobs();
    }
  }, [user]);

  const loadMyJobs = async () => {
    try {
      const data = await jobService.getJobsByRecruiter(user._id);
      setJobs(data);
      
      // Calculate stats
      const active = data.filter(j => j.isActive).length;
      const totalViews = data.reduce((sum, j) => sum + (j.views || 0), 0);
      setStats({ total: data.length, active, totalViews });
      
    } catch (error) {
      console.error('Error loading jobs:', error);
      error('Failed to load your jobs');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (jobId) => {
    if (!window.confirm('Are you sure you want to delete this job?')) return;
    
    try {
      await jobService.deleteJob(jobId);
      success('Job deleted successfully');
      loadMyJobs();
    } catch (error) {
      console.error('Error deleting job:', error);
      error('Failed to delete job');
      
    }
  };

  const handleToggleActive = async (jobId) => {
    try {
      await jobService.toggleJobActive(jobId);
      success('Job status updated');
      loadMyJobs();
    } catch (error) {
      console.error('Error toggling job status:', error);
      error('Failed to update job status');
    }
  };

  const handleEdit = (job) => {
    // Navigate to edit page (you'll need to create this)
    window.location.href = `/jobs/${job._id}/edit`;
  };

  if (!loading && user?.userType !== 'recruiter') {
    return <Navigate to="/" />;
  }

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">Recruiter Dashboard</h1>
          <p className="text-xl text-purple-100">
            Welcome back, {user.name.first}!
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-600 text-sm font-semibold mb-1">Total Jobs</h3>
            <p className="text-4xl font-bold text-purple-600">{stats.total}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-600 text-sm font-semibold mb-1">Active Jobs</h3>
            <p className="text-4xl font-bold text-green-600">{stats.active}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-600 text-sm font-semibold mb-1">Total Views</h3>
            <p className="text-4xl font-bold text-blue-600">{stats.totalViews}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="mb-6 flex gap-4">
          <Link
            to="/jobs/create"
            className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700"
          >
            + Post New Job
          </Link>
          <Link
            to={`/recruiters/${user._id}`}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
          >
            View My Profile
          </Link>
        </div>

        {/* My Jobs */}
        <div>
          <h2 className="text-2xl font-bold mb-4">My Job Postings</h2>
          
          {jobs.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <p className="text-gray-600 mb-4">You haven't posted any jobs yet.</p>
              <Link
                to="/jobs/create"
                className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700"
              >
                Post Your First Job
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobs.map(job => (
                <JobCard
                key={job._id}
                  job={job}
                  showActions={true}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onToggleActive={handleToggleActive}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default RecruiterDashboard;

                  