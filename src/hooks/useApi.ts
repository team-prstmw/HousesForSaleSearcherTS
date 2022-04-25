/* eslint-disable @typescript-eslint/no-unsafe-return */
import axios, { AxiosRequestConfig } from 'axios';
import { useCookies } from 'react-cookie';
import { useMutation, useQuery } from 'react-query';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL as string;

interface Props {
  path: string;
  auth?: boolean;
}
interface PostProps {
  auth?: boolean;
}

interface Mutation {
  path: string;
  data: any;
  method: 'post' | 'put' | 'patch' | 'delete';
}

const useGetAuthToken = () => {
  const [cookies] = useCookies(['auth']);

  return cookies?.auth as string | undefined;
};

const getAuthHeader = (token: string) => ({ Authorization: `Bearer ${token}` });

export const useApiGet = ({ path, auth }: Props) => {
  const config = <AxiosRequestConfig>{};
  const token = useGetAuthToken();

  if (auth) {
    if (token) {
      config.headers = getAuthHeader(token);
    }
  }

  return useQuery(path, async () => axios.get(`${BACKEND_URL}${path}`, config).then((res) => res.data));
};

export const useApiSend = ({ auth }: PostProps = {}) => {
  const config = <AxiosRequestConfig>{};
  const token = useGetAuthToken();

  if (auth) {
    if (token) {
      config.headers = getAuthHeader(token);
    }
  }

  const mutation = useMutation(({ path, data, method }: Mutation) =>
    axios[method](`${BACKEND_URL}${path}`, data, config).then((res) => res?.data)
  );

  return mutation;
};

export const useApiPatch = ({ path, auth }: Props) => {
  const config = <AxiosRequestConfig>{};
  const token = useGetAuthToken();

  if (auth) {
    if (token) {
      config.headers = getAuthHeader(token);
    }
  }

  const apiPatch = ({ data }) => axios.patch(`${BACKEND_URL}${path}`, data, config).then((res) => res?.data);

  return useMutation(apiPatch);
};
