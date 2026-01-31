import axios from 'axios';
import { getToken } from '../../users/services/localStorageService'

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';
console.log('Jobs API URL:', API_URL);

export const jobService = {
  createJob: async (jobData) => {
    try {
      const token = getToken(); // Use the helper function instead of localStorage.getItem('token')
      console.log('Creating job with token:', token ? 'exists' : 'missing');
      console.log('Job data:', jobData);
      
      const response = await axios.post(
        `${API_URL}/jobs`,
        jobData,
        { headers: { 'x-auth-token': token } }
      );
      return response.data;
    } catch (error) {
      console.error('Create job error:', error.response || error);
      throw error.response?.data || error.message || 'Failed to create job';
    }
  },

  getAllJobs: async () => {
    try {
      const response = await axios.get(`${API_URL}/jobs`);
      return response.data;
    } catch (error) {
      console.error('Get all jobs error:', error);
      throw error.response?.data || error.message || 'Failed to fetch jobs';
    }
  },

  getJobById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/jobs/${id}`);
      return response.data;
    } catch (error) {
      console.error('Get job error:', error);
      throw error.response?.data || error.message || 'Failed to fetch job';
    }
  },

  getJobsByRecruiter: async (recruiterId) => {
    try {
      const response = await axios.get(`${API_URL}/jobs/company/${recruiterId}`);
      return response.data;
    } catch (error) {
      console.error('Get recruiter jobs error:', error);
      throw error.response?.data || error.message || 'Failed to fetch recruiter jobs';
    }
  },

  updateJob: async (id, data) => {
    try {
      const token = getToken();
      const response = await axios.put(
        `${API_URL}/jobs/${id}`,
        data,
        { headers: { 'x-auth-token': token } }
      );
      return response.data;
    } catch (error) {
      console.error('Update job error:', error);
      throw error.response?.data || error.message || 'Failed to update job';
    }
  },

  deleteJob: async (id) => {
    try {
      const token = getToken();
      const response = await axios.delete(
        `${API_URL}/jobs/${id}`,
        { headers: { 'x-auth-token': token } }
      );
      return response.data;
    } catch (error) {
      console.error('Delete job error:', error);
      throw error.response?.data || error.message || 'Failed to delete job';
    }
  },

  toggleJobActive: async (id) => {
    try {
      const token = getToken();
      const response = await axios.patch(
        `${API_URL}/jobs/${id}/toggle-active`,
        {},
        { headers: { 'x-auth-token': token } }
      );
      return response.data;
    } catch (error) {
      console.error('Toggle job status error:', error);
      throw error.response?.data || error.message || 'Failed to toggle job status';
    }
  },
};