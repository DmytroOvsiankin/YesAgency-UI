import axios, { AxiosError, AxiosRequestConfig } from 'axios';

import { getItem } from './storage';

import { API_VERSION_TYPE, API_URL, APP_VERSION, AUTH_PREFIX, PATHS } from '@/constants/api';

export const fetch = async <T = unknown, E = ApiError>(
  path: PATH,
  options: AxiosRequestConfig = {},
  isAuthorised = true,
  pathParams?: Record<string, string | number>,
  API_Version?: API_VERSION_TYPE,
): Promise<ApiResponse<T, E>> => {
  const language = await getItem('LOCALE');

  const headers = {
    'Content-Type': 'application/json',
    'Accept-Language': 'en',
    'App-Version': APP_VERSION,
    ...options.headers,
  };

  if (isAuthorised) {
    const token = await getItem('AUTH');

    // headers['Authorization'] = `${AUTH_PREFIX}${token}`;
  }

  const response: ApiResponse<T, E> = {
    success: true,
    statusCode: null,
    data: null,
    error: null,
  };

  try {
    const res = await axios({
      ...options,
      headers,
      url: getFullPath(path, pathParams, API_Version),
      method: options.method || 'GET',
    });

    response.data = res.data;

    return { ...response, statusCode: res.status };
  } catch (error) {
    const { response: errResponse } = error as AxiosError;

    const { status, data: err } = errResponse || {};

    response.success = false;
    response.error = ((err as E) ?? error) as E | null;

    return { ...response, statusCode: status };
  }
};

const getFullPath = (
  path: PATH,
  pathParams?: Record<string, string | number>,
  API_Version?: API_VERSION_TYPE,
) => {
  let NEW_API_URL = API_URL;
  if (API_Version) {
    NEW_API_URL = NEW_API_URL.replace(`/${API_VERSION_TYPE.V1}`, `/${API_Version}`);
  }
  const url = `${NEW_API_URL}${PATHS[path]}`;

  if (!pathParams) {
    return url;
  }

  const pathWithParams = Object.keys(pathParams).reduce((acc, key) => {
    return acc.replace(`:${key}`, pathParams[key].toString());
  }, url);

  return pathWithParams;
};

export const externalFetch = async <T = unknown, E = ApiError>(
  url: string,
  options: AxiosRequestConfig = {},
): Promise<ApiResponse<T, E>> => {
  try {
    const res = await axios({
      ...options,
      url,
      method: options.method || 'GET',
    });

    return {
      success: true,
      statusCode: res.status,
      data: res.data ?? null,
      error: null,
    };
  } catch (error) {
    const { response: errResponse } = error as AxiosError;
    const { status, data: err } = errResponse || {};

    return { success: false, statusCode: status, data: null, error: err as E };
  }
};
