import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jobService } from '../../jobs/services/jobsApiService';
import JobForm from '../../jobs/components/JobForm';
import { useSnackbar } from '../../providers/SnackbarProvider';

function CreateJobPage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const snackbar = useSnackbar();

  const handleSubmit = async (data) => {
    setLoading(true);
    
    try {
      // Filter out empty strings from arrays
      const jobData = {
        ...data,
        requirements: data.requirements.filter(r => r && r.trim()),
        responsibilities: data.responsibilities.filter(r => r && r.trim()),
        techStack: data.techStack.filter(t => t && t.trim()),
      };

      console.log('Submitting job data:', jobData);
      
      await jobService.createJob(jobData);
      snackbar('Job posted successfully!', 'success');
      navigate('/recruiter/dashboard');
    } catch (err) {
      console.error('Error creating job:', err);
      snackbar(err.message || 'Failed to post job. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-6">Post a New Job</h1>

          <JobForm
            onSubmit={handleSubmit} 
            isLoading={loading}
            submitText="Post Job"
          />
        </div>
      </div>
    </div>
  );
}

export default CreateJobPage;