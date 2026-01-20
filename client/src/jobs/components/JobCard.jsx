import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaBriefcase, FaClock, FaEye, FaEdit, FaTrash, FaToggleOn, FaToggleOff } from 'react-icons/fa';

function JobCard({ job, showActions = false, onEdit, onDelete, onToggleActive }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <Link to={`/jobsDetailPage/${job._id}`} className="flex-1">
          <h3 className="text-xl font-bold text-gray-800 hover:text-blue-600 transition-colors">
            {job.title}
          </h3>
        </Link>
        {!job.isActive && (
          <span className="px-3 py-1 bg-gray-200 text-gray-600 rounded-full text-xs font-semibold">
            Inactive
          </span>
        )}
      </div>
      
      <p className="text-gray-700 font-semibold mb-2">{job.companyName}</p>
      
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
        {job.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-4 text-sm text-gray-600">
        <span className="flex items-center">
          <FaMapMarkerAlt className="mr-1" />
          {job.location}
        </span>
        <span>•</span>
        <span>{job.locationType}</span>
        <span>•</span>
        <span className="flex items-center">
          <FaBriefcase className="mr-1" />
          {job.employmentType}
        </span>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
          {job.experienceLevel}
        </span>
        {job.techStack?.slice(0, 3).map((tech, idx) => (
          <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
            {tech}
          </span>
        ))}
        {job.techStack?.length > 3 && (
          <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
            +{job.techStack.length - 3} more
          </span>
        )}
      </div>

      <div className="flex items-center justify-between text-sm text-gray-500 border-t pt-3">
        <span className="flex items-center">
          <FaClock className="mr-1" />
          {new Date(job.createdAt).toLocaleDateString()}
        </span>
        <span className="flex items-center">
          <FaEye className="mr-1" />
          {job.views || 0} views
        </span>
      </div>

      {showActions && (
        <div className="mt-4 flex gap-2">
          <button
            onClick={() => onToggleActive(job._id)}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg font-medium transition-colors ${
              job.isActive 
                ? 'bg-orange-100 text-orange-700 hover:bg-orange-200' 
                : 'bg-green-100 text-green-700 hover:bg-green-200'
            }`}
            title={job.isActive ? 'Deactivate job' : 'Activate job'}
          >
            {job.isActive ? <FaToggleOn /> : <FaToggleOff />}
            {job.isActive ? 'Active' : 'Inactive'}
          </button>
          <button
            onClick={() => onEdit(job)}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            title="Edit job"
          >
            <FaEdit />
          </button>
          <button
            onClick={() => onDelete(job._id)}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            title="Delete job"
          >
            <FaTrash />
          </button>
        </div>
      )}
    </div>
  );
}

export default JobCard;