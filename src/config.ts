import { z } from 'zod'

const configSchema = z.object({
    VITE_API_ENDPOINT: z.string(),
    VITE_PUBLIC_URL: z.string()
})

const configProject = configSchema.safeParse({
    VITE_API_ENDPOINT: import.meta.env.VITE_API_ENDPOINT,
    VITE_PUBLIC_URL: import.meta.env.VITE_PUBLIC_URL
})

if (!configProject.success) {
    console.error(configProject.error.issues)
    throw new Error('Các giá trị khai báo trong file .env không hợp lệ')
}

const envConfig = configProject.data
export default envConfig
