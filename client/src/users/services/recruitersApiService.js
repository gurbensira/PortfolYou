import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

export const recruiterService = {
  
  registerRecruiter: async (recruiterData, file) => {
  try {
    const formData = new FormData();
    
    formData.append('name[first]', recruiterData.name.first);
    if (recruiterData.name.middle) {
      formData.append('name[middle]', recruiterData.name.middle);
    }
    formData.append('name[last]', recruiterData.name.last);

    formData.append('email', recruiterData.email);
    formData.append('password', recruiterData.password);
    formData.append('phone', recruiterData.phone);
    
    formData.append('recruiterInfo[companyName]', recruiterData.recruiterInfo.companyName);
    formData.append('recruiterInfo[companyDescription]', recruiterData.recruiterInfo.companyDescription);
    formData.append('recruiterInfo[industry]', recruiterData.recruiterInfo.industry);
    formData.append('recruiterInfo[jobTitle]', recruiterData.recruiterInfo.jobTitle);
    
    if (recruiterData.recruiterInfo.companySize) {
      formData.append('recruiterInfo[companySize]', recruiterData.recruiterInfo.companySize);
    }
    if (recruiterData.recruiterInfo.companyWebsite) {
      formData.append('recruiterInfo[companyWebsite]', recruiterData.recruiterInfo.companyWebsite);
    }
    if (recruiterData.recruiterInfo.companyLogo) {
      formData.append('recruiterInfo[companyLogo]', recruiterData.recruiterInfo.companyLogo);
    }
    if (recruiterData.recruiterInfo.yearsExperience) {
      formData.append('recruiterInfo[yearsExperience]', recruiterData.recruiterInfo.yearsExperience);
    }
    if (recruiterData.recruiterInfo.specializations && recruiterData.recruiterInfo.specializations.length > 0) {
      formData.append('recruiterInfo[specializations]', JSON.stringify(recruiterData.recruiterInfo.specializations));
    }
    if (recruiterData.recruiterInfo.linkedInProfile) {
      formData.append('recruiterInfo[linkedInProfile]', recruiterData.recruiterInfo.linkedInProfile);
    }
    
    if (recruiterData.image?.url && !file) {
      formData.append('image', JSON.stringify(recruiterData.image));
    }
    
    if (file) {
      formData.append('image', file);
    }

    const response = await axios.post(`${API_URL}/recruiters`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data;

  } catch (error) {
    throw error.response?.data || error;
  }
},

  getAllRecruiters: async () => {
    try {
      const response = await axios.get(`${API_URL}/recruiters`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

 
  getRecruiterById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/recruiters/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  
  updateRecruiter: async (id, data, file) => {
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      
      
      if (data.name) formData.append('name', JSON.stringify(data.name));
      if (data.phone) formData.append('phone', data.phone);
      if (data.recruiterInfo) formData.append('recruiterInfo', JSON.stringify(data.recruiterInfo));
      if (data.image && !file) formData.append('image', JSON.stringify(data.image));
      
 
      if (file) {
        formData.append('image', file);
      }

      const response = await axios.put(
        `${API_URL}/recruiters/${id}`,
        formData,
        { 
          headers: { 
            'x-auth-token': token,
            'Content-Type': 'multipart/form-data',
          } 
        }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};