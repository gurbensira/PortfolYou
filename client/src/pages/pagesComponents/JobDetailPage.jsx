import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

import { FaMapMarkerAlt, FaBriefcase, FaClock, FaEye, FaExternalLinkAlt, FaDollarSign, FaBuilding, FaEdit, FaTrash } from 'react-icons/fa';
import { useCurrentUser } from '../../users/providers/UserProvider';
import { jobService } from '../../jobs/services/jobsApiService';

function JobDetailPage() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useCurrentUser();
  const navigate = useNavigate();

  useEffect(() => {
    loadJob();
  }, [id]);

  const loadJob = async () => {
    try {
      const data = await jobService.getJobById(id);
      setJob(data);
    } catch (error) {
      console.error('Error loading job:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this job?')) return;
    
    try {
      await jobService.deleteJob(id);
      navigate('/jobs');
    } catch (error) {
      console.error('Error deleting job:', error);
      alert('Failed to delete job');
    }
  };

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  if (!job) {
    return <div className="container mx-auto px-4 py-8">Job not found</div>;
  }

  const isOwner = user?._id === job.postedBy?._id;
  const isAdmin = user?.userType === 'admin' || user?.isAdmin;
  const canEdit = isOwner || isAdmin;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-green-500 to-blue-600 text-white py-12">
        <div className="container mx-auto px-4">
          <Link to="/jobs" className="text-white hover:text-green-100 mb-4 inline-block">
            ← Back to Jobs
          </Link>
          <h1 className="text-4xl font-bold mb-2">{job.title}</h1>
          <p className="text-xl text-green-100">{job.companyName}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Details Card */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex flex-wrap gap-4 mb-6 text-gray-600">
                <span className="flex items-center">
                  <FaMapMarkerAlt className="mr-2" />
                  {job.location}
                </span>
                <span>•</span>
                <span>{job.locationType}</span>
                <span>•</span>
                <span className="flex items-center">
                  <FaBriefcase className="mr-2" />
                  {job.employmentType}
                </span>
                <span>•</span>
                <span className="flex items-center">
                  <FaClock className="mr-2" />
                  Posted {new Date(job.createdAt).toLocaleDateString()}
                </span>
                <span>•</span>
                <span className="flex items-center">
                  <FaEye className="mr-2" />
                  {job.views || 0} views
                </span>
              </div>

              <div className="mb-6">
                <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full font-semibold">
                  {job.experienceLevel}
                </span>
              </div>

              <h2 className="text-2xl font-bold mb-4">Job Description</h2>
              <p className="text-gray-700 whitespace-pre-line mb-6">{job.description}</p>

              <h2 className="text-2xl font-bold mb-4">Requirements</h2>
              <ul className="list-disc list-inside space-y-2 mb-6">
                {job.requirements?.map((req, idx) => (
                  <li key={idx} className="text-gray-700">{req}</li>
                ))}
              </ul>

              <h2 className="text-2xl font-bold mb-4">Responsibilities</h2>
              <ul className="list-disc list-inside space-y-2 mb-6">
                {job.responsibilities?.map((resp, idx) => (
                  <li key={idx} className="text-gray-700">{resp}</li>
                ))}
              </ul>

              <h2 className="text-2xl font-bold mb-4">Tech Stack</h2>
              <div className="flex flex-wrap gap-2">
                {job.techStack?.map((tech, idx) => (
                  <span key={idx} className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-medium">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Apply Card */}
            <div className="bg-white rounded-lg shadow-md p-6"
              
                href={job.applicationUrl}
                target="_blank"
                rel="noopener noreferrer"
                >
                <a className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 flex items-center justify-center gap-2">
                Apply Now <FaExternalLinkAlt />
              </a>
            </div>

            {/* Salary Card */}
            {job.salaryRange && (job.salaryRange.min || job.salaryRange.max) && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="font-bold mb-3 flex items-center gap-2">
                  <FaDollarSign /> Salary Range
                </h3>
                <p className="text-gray-700">
                  {job.salaryRange.min && `${job.salaryRange.currency} ${job.salaryRange.min.toLocaleString()}`}
                  {job.salaryRange.min && job.salaryRange.max && ' - '}
                  {job.salaryRange.max && `${job.salaryRange.currency} ${job.salaryRange.max.toLocaleString()}`}
                </p>
              </div>
            )}

            {/* Company Card */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-bold mb-3 flex items-center gap-2">
                <FaBuilding /> About Company
              </h3>
              <p className="text-gray-700 mb-2">{job.companyName}</p>
              {job.postedBy?.recruiterInfo && (
                <>
                  <p className="text-gray-600 text-sm mb-2">
                    Industry: {job.postedBy.recruiterInfo.industry}
                  </p>
                  {job.postedBy.recruiterInfo.companyDescription && (
                    <p className="text-gray-600 text-sm">
                      {job.postedBy.recruiterInfo.companyDescription}
                    </p>
                  )}
                </>
              )}
            </div>

            {/* Edit/Delete Actions */}
            {canEdit && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="font-bold mb-3">Manage Job</h3>
                <div className="space-y-2">
                  <Link
                    to={`/jobs/${job._id}/edit`}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 flex items-center justify-center gap-2"
                  >
                    <FaEdit /> Edit Job
                  </Link>
                  <button
                    onClick={handleDelete}
                    className="w-full bg-red-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-red-700 flex items-center justify-center gap-2"
                  >
                    <FaTrash /> Delete Job
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobDetailPage;