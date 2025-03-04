
import { RoleValues } from '@/app/constrants/type'
import z from 'zod'


export const LoginBody = z
    .object({
        username: z.string({
            required_error: "Bạn chưa nhập tên tài khoản"
        }).min(1, "Bạn chưa nhập tên tài khoản"),
        password: z.string({
            required_error: "Bạn chưa nhập mật khẩu"
        }).min(1, "Bạn chưa nhập mật khẩu")
    })
    .strict()

export type LoginBodyType = z.TypeOf<typeof LoginBody>

export const LoginRes = z.object({
    data: z.object({
        accessToken: z.string(),
        refreshToken: z.string(),
        account: z.object({
            id: z.number(),
            username: z.string(),
            role: z.enum(RoleValues)
        })
    }),
    message: z.string()
})

export type LoginResType = z.TypeOf<typeof LoginRes>

export const RefreshTokenBody = z
    .object({
        refreshToken: z.string()
    })
    .strict()

export type RefreshTokenBodyType = z.TypeOf<typeof RefreshTokenBody>

export const RefreshTokenRes = z.object({
    data: z.object({
        accessToken: z.string(),
        refreshToken: z.string()
    }),
    message: z.string()
})

export type RefreshTokenResType = z.TypeOf<typeof RefreshTokenRes>


