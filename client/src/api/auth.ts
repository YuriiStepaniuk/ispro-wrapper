import { api } from '@/lib/api';

export const login = () => api.post('/auth/login');
