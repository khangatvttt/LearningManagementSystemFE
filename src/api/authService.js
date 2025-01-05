import apiClient from './apiClient';

export const login = async (payload) => {
  try {
    const response = await apiClient.post('/auth/login', payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const signup = async (payload) => {
  try {
    const response = await apiClient.post('/auth/signup', payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getLoginGoogleLink = async () => {
  try {
    const response = await apiClient.get('/auth/google-login');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const handleLoginGoogleCallback = async (params) => {
  try {
    const response = await apiClient.get('/auth/google-callback', {params});
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const verifyEmail = async (params) => {
  try {
    const response = await apiClient.get('/auth/verify-email', {params});
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const requestPasswordReset = async (payload) => {
  try {
    const response = await apiClient.post('/auth/password-reset-request', payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const resetPassword = async (payload) => {
  try {
    const response = await apiClient.post('/auth/password-reset', payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};
