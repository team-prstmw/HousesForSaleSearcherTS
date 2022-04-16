import axios, { AxiosRequestConfig } from 'axios';
import { useCookies } from 'react-cookie';
import { useMutation, useQuery } from 'react-query';

const BACKEND_URL = '/api';

interface QueryProps {
  path: string;
  auth?: boolean;
}
interface PostProps {
  path: string;
  data: unknown;
  auth?: boolean;
}

const useGetAuthToken = () => {
  const [cookies] = useCookies(['auth']);

  return cookies.auth as string | undefined;
};

export const useApiGet = ({ path, auth }: QueryProps) => {
  const config = <AxiosRequestConfig>{};
  const token = useGetAuthToken();

  if (auth) {
    if (!token) {
      window.location.replace('/login');
    }
    config.headers = {
      Authorization: `Bearer ${token}`,
    };
  }

  return useQuery(path, async () => axios.get(`${BACKEND_URL}${path}`, config).then((res) => res.data));
};

export const useApiPost = ({ path, data, auth }: PostProps) => {
  const config = <AxiosRequestConfig>{};
  const token = useGetAuthToken();

  if (auth) {
    if (!token) {
      window.location.replace('/login');
    }
    config.headers = {
      Authorization: `Bearer ${token}`,
    };
  }

  return useMutation(path, async () => axios.post(`${BACKEND_URL}${path}`, data, config).then((res) => res?.data));
};
