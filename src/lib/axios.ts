import axios from 'axios';
import { API_PREFIX } from '@/app/constants/endpoints';

const instance = axios.create({
  baseURL: `${
    process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000'
  }${API_PREFIX}`,
  withCredentials: true,
});

export default instance;
