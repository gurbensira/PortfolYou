import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
console.log(API_URL);


export const jobService = {
  // POST /api/jobs - Create new job
  createJob: async (jobData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${API_URL}/jobs`,
        jobData,
        { headers: { 'x-auth-token': token } }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // GET /api/jobs - Get all jobs
  getAllJobs: async () => {
    try {
      const response = await axios.get(`${API_URL}/jobs`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // GET /api/jobs/:id - Get single job
  getJobById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/jobs/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // GET /api/jobs/company/:recruiterId - Get jobs by recruiter
  getJobsByRecruiter: async (recruiterId) => {
    try {
      const response = await axios.get(`${API_URL}/jobs/company/${recruiterId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // PUT /api/jobs/:id - Update job
  updateJob: async (id, data) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `${API_URL}/jobs/${id}`,
        data,
        { headers: { 'x-auth-token': token } }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // DELETE /api/jobs/:id - Delete job
  deleteJob: async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(
        `${API_URL}/jobs/${id}`,
        { headers: { 'x-auth-token': token } }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // PATCH /api/jobs/:id/toggle-active - Toggle job active status
  toggleJobActive: async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.patch(
        `${API_URL}/jobs/${id}/toggle-active`,
        {},
        { headers: { 'x-auth-token': token } }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};