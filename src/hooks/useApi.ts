/* eslint-disable @typescript-eslint/no-unsafe-return */
import axios, { AxiosRequestConfig } from 'axios';
import { useCookies } from 'react-cookie';
import { useMutation, useQuery } from 'react-query';

const BACKEND_URL = '/api';

interface GetProps {
  path: string;
  auth?: boolean;
}
interface PostProps {
  path: string;
  data: unknown;
  auth?: boolean;
}

type PatchProps = PostProps;
type PutProps = PostProps;
type DeleteProps = GetProps;

const useGetAuthToken = () => {
  const [cookies] = useCookies(['auth']);

  return cookies.auth as string | undefined;
};

const getAuthHeader = (token: string) => ({ Authorization: `Bearer ${token}` });

export const useApiGet = ({ path, auth }: GetProps) => {
  const config = <AxiosRequestConfig>{};
  const token = useGetAuthToken();

  if (auth) {
    if (token) {
      config.headers = getAuthHeader(token);
    }
    window.location.replace('/login');
  }
  const { data } = useQuery(path, async () => axios.get(`${BACKEND_URL}${path}`, config).then((res) => res.data));

  if (data) return { data };

  return { data: [] };
};

export const useApiPost = ({ path, data, auth }: PostProps) => {
  const config = <AxiosRequestConfig>{};
  const token = useGetAuthToken();

  if (auth) {
    if (token) {
      config.headers = getAuthHeader(token);
    }
    window.location.replace('/login');
  }

  return useMutation(path, async () => axios.post(`${BACKEND_URL}${path}`, data, config).then((res) => res?.data));
};

export const useApiPatch = ({ path, auth }: PatchProps) => {
  const config = <AxiosRequestConfig>{};
  const token = useGetAuthToken();

  if (auth) {
    if (token) {
      config.headers = getAuthHeader(token);
    }
    window.location.replace('/login');
  }

  const apiPatch = ({ data }) => axios.patch(`${BACKEND_URL}${path}`, data, config).then((res) => res?.data);

  return useMutation(apiPatch);
};

export const useApiPut = ({ path, data, auth }: PutProps) => {
  const config = <AxiosRequestConfig>{};
  const token = useGetAuthToken();

  if (auth) {
    if (token) {
      config.headers = getAuthHeader(token);
    }
    window.location.replace('/login');
  }

  return useMutation(path, async () => axios.put(`${BACKEND_URL}${path}`, data, config).then((res) => res?.data));
};

export const useApiDelete = ({ path, auth }: DeleteProps) => {
  const config = <AxiosRequestConfig>{};
  const token = useGetAuthToken();

  if (auth) {
    if (token) {
      config.headers = getAuthHeader(token);
    }
    window.location.replace('/login');
  }

  return useMutation(path, async () => axios.delete(`${BACKEND_URL}${path}`, config).then((res) => res?.data));
};
