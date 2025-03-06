import axios, { AxiosRequestConfig, AxiosError } from 'axios';
import envConfig from '@/config';
import { normalizePath } from '@/lib/utils';
import { LoginResType } from '@/schemaValidations/auth.schema';

type CustomOptions = Omit<AxiosRequestConfig, 'method' | 'url'> & {
    baseUrl?: string;
};

type EntityErrorPayload = {
    message: string;
    errors: {
        field: string;
        message: string;
    }[];
};

class HttpError extends Error {
    status: number;
    payload: { message: string;[key: string]: any };
    constructor({ status, payload, message = 'Lỗi HTTP' }: { status: number; payload: any; message?: string }) {
        super(message);
        this.status = status;
        this.payload = payload;
    }
}

export class EntityError extends HttpError {
    status: 422;
    payload: EntityErrorPayload;
    constructor({ status, payload }: { status: 422; payload: EntityErrorPayload }) {
        super({ status, payload, message: 'Lỗi thực thể' });
        this.status = status;
        this.payload = payload;
    }
}

const request = async <Response>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    url: string,
    options?: CustomOptions
) => {
    const baseUrl = options?.baseUrl === undefined ? envConfig.VITE_API_ENDPOINT : options.baseUrl;
    const fullUrl = `${baseUrl}/${normalizePath(url)}`;

    const baseHeaders: { [key: string]: string } = {};
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
        baseHeaders.Authorization = `Bearer ${accessToken}`;
    }

    const config: AxiosRequestConfig = {
        ...options,
        method,
        url: fullUrl,
        headers: {
            ...baseHeaders,
            ...options?.headers,
        },
    };

    if (options?.data instanceof FormData) {
        config.data = options.data;
    } else if (options?.data) {
        config.data = options.data;
        config.headers = {
            ...config.headers,
            'Content-Type': 'application/json',
        };
    }

    try {
        const res = await axios(config);
        const data = { status: res.status, payload: res.data as Response };
        const normalizeUrl = normalizePath(url);
        if (normalizeUrl === 'admins/auth/login') {
            const { accessToken, refreshToken } = (res.data as LoginResType).data.tokens;
            console.log('accessToken', accessToken);
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
        } else if (normalizeUrl === 'api/auth/logout') {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
        }

        return data;
    } catch (error) {
        const axiosError = error as AxiosError;
        if (axiosError.response) {
            const { status, data } = axiosError.response;
            if (status === 422) {
                throw new EntityError({
                    status: 422,
                    payload: data as EntityErrorPayload,
                });
            } else {
                throw new HttpError({
                    status,
                    payload: data,
                });
            }
        }
        throw new Error('422 Error');
    }
};

const http = {
    get<Response>(url: string, options?: Omit<CustomOptions, 'data'>) {
        return request<Response>('GET', url, options);
    },
    post<Response>(url: string, data: any, options?: Omit<CustomOptions, 'data'>) {
        return request<Response>('POST', url, { ...options, data });
    },
    put<Response>(url: string, data: any, options?: Omit<CustomOptions, 'data'>) {
        return request<Response>('PUT', url, { ...options, data });
    },
    delete<Response>(url: string, options?: Omit<CustomOptions, 'data'>) {
        return request<Response>('DELETE', url, options);
    },
};

export default http;