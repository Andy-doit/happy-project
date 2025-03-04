import envConfig from '@/config'
import { normalizePath } from '@/lib/utils'
import { LoginResType } from '@/schemaValidations/auth.schema'



type CustomOptions = Omit<RequestInit, 'method'> & {
    baseUrl?: string
}

type EntityErrorPayload = {
    message: string
    errors: {
        field: string
        message: string
    }[]
}

class HttpError extends Error {
    status: number
    payload: { message: string;[key: string]: any }
    constructor({ status, payload, message = 'Lỗi HTTP' }: { status: number; payload: any; message?: string }) {
        super(message)
        this.status = status
        this.payload = payload
    }
}

export class EntityError extends HttpError {
    status: 422
    payload: EntityErrorPayload
    constructor({ status, payload }: { status: 422; payload: EntityErrorPayload }) {
        super({ status, payload, message: 'Lỗi thực thể' })
        this.status = status
        this.payload = payload
    }
}



const request = async <Response>(method: 'GET' | 'POST' | 'PUT' | 'DELETE', url: string, options?: CustomOptions) => {
    let body: FormData | string | undefined = undefined
    if (options?.body instanceof FormData) {
        body = options.body
    } else if (options?.body) {
        body = JSON.stringify(options?.body)
    }

    const baseHeaders: { [key: string]: string } =
        body instanceof FormData
            ? {}
            : {
                'Content-Type': 'application/json'
            }

    const accessToken = localStorage.getItem('accessToken')
    if (accessToken) {
        baseHeaders.Authorization = `Bearer ${accessToken}`
    }

    const baseUrl = options?.baseUrl === undefined ? envConfig.VITE_API_ENDPOINT : options.baseUrl
    const fullUrl = `${baseUrl}/${normalizePath(url)}`

    const res = await fetch(fullUrl, {
        ...options,
        headers: {
            ...baseHeaders,
            ...options?.headers
        },
        body,
        method
    })

    const payload: Response = await res.json()
    const data = { status: res.status, payload }
    if (!res.ok) {
        if (res.status === 422) {
            throw new EntityError({
                status: 422,
                payload: payload as EntityErrorPayload,
            });
        } else {
            throw new HttpError({
                status: res.status,
                payload,
            });
        }
    }

    const normalizeUrl = normalizePath(url)
    if (normalizeUrl === 'api/auth/login') {
        const { data: { accessToken, refreshToken } } = payload as LoginResType
        localStorage.setItem('accessToken', accessToken)
        localStorage.setItem('refreshToken', refreshToken)
    } else if (normalizeUrl === 'api/auth/logout') {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
    }

    return data
}

const http = {
    get<Response>(url: string, options?: Omit<CustomOptions, 'body'>) {
        return request<Response>('GET', url, options)
    },
    post<Response>(url: string, body: any, options?: Omit<CustomOptions, 'body'>) {
        return request<Response>('POST', url, { ...options, body })
    },
    put<Response>(url: string, body: any, options?: Omit<CustomOptions, 'body'>) {
        return request<Response>('PUT', url, { ...options, body })
    },
    delete<Response>(url: string, options?: Omit<CustomOptions, 'body'>) {
        return request<Response>('DELETE', url, options)
    }
}

export default http
