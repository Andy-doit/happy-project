
import z from 'zod'

const stringSchema = z.string()
export const LoginBody = z
  .object({
    username: stringSchema,
    password: stringSchema.min(6).max(20)
  })
  .strict()
export const LoginRes = z.object({
  message: z.string(),
  data: z.object({
    admin: z.object({
      id: z.string(),
      username: z.string(),
      firstName: z.string(),
      lastName: z.string(),
      role: z.string(),
      status: z.string(),
      email: z.string(),

    }),
    tokens: z.object({
      accessToken: z.string(),
      refreshToken: z.string()
    })
  })
});
export const RefreshTokenBody = z
  .object({
    refreshToken: z.string()
  })
  .strict()
export const RefreshTokenRes = z.object({
  data: z.object({
    accessToken: z.string(),
    refreshToken: z.string()
  }),
  message: z.string()
})




