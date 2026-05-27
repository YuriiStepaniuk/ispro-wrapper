import axios from 'axios';

export const isproHttp = axios.create({
  baseURL: process.env.ISPRO_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10_000,
});
