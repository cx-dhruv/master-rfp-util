import axios from 'axios';

const API = axios.create({
  baseURL: '/api',
});

export const getModules = () => API.get('/modules');
export const mergeTemplate = (modules) => API.post('/templates/merge', { modules });
export const createTemplate = (templateData) => API.post('/templates', templateData);
export const getTemplate = (id) => API.get(`/templates/${id}`);
