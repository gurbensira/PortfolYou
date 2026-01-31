import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { jobService } from '../../jobs/services/jobsApiService';
import JobForm from '../../jobs/components/JobForm';
import {useSnackbar} from '../../providers/SnackbarProvider'


function CreateJobPage() {
 
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { success, error } = useSnackbar();

  const handleSubmit = async (data) => {
    setLoading(true);
    setError('');
    
    try {
      
      const jobData = {
        ...data,
        requirements: data.requirements.filter(r => r.trim()),
        responsibilities: data.responsibilities.filter(r => r.trim()),
        techStack: data.techStack.filter(t => t.trim()),
      };

      await jobService.createJob(jobData);
      success('Job posted successfully!');
      navigate('/recruiter/dashboard');
    } catch (err) {
      error('Failed to post job. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-6">Post a New Job</h1>
          
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-6">
              {error}
            </div>
          )}

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