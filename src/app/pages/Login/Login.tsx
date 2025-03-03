"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"


import { Button } from "@/components/ui/button"
import {
    Form,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { toast } from "sonner"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { LoginBody, LoginBodyType } from "@/app/schemaValidations/auth.schema"



export default function Login() {
    const form = useForm<LoginBodyType>({
        resolver: zodResolver(LoginBody),
        defaultValues: {
            username: "",
            password: "",
        },
    })

    function onSubmit(data: z.infer<typeof LoginBody>) {
        toast(
            JSON.stringify(data, null, 2)
        )
    }

    return (
        <Card className='mx-auto max-w-sm'>
            <CardHeader>
                <CardTitle className='text-2xl'>Đăng nhập</CardTitle>
                <CardDescription>Nhập tên tài khoản và mật khẩu của bạn để đăng nhập vào hệ thống</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='space-y-2 max-w-[600px] flex-shrink-0 w-full'
                        noValidate
                    >
                        <div className='grid gap-4'>
                            <FormField
                                control={form.control}
                                name='username'
                                render={({ field }) => (
                                    <FormItem>
                                        <div className='grid gap-2'>
                                            <Label htmlFor='username'>Tên tài khoản</Label>
                                            <Input id='username' type='username' placeholder='Tên tài khoản' required {...field} />
                                            <FormMessage />
                                        </div>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='password'
                                render={({ field }) => (
                                    <FormItem>
                                        <div className='grid gap-2'>
                                            <div className='flex items-center'>
                                                <Label htmlFor='password'>Password</Label>
                                            </div>
                                            <Input id='password' type='password' placeholder="Nhập mật khẩu" required {...field} />
                                            <FormMessage />
                                        </div>
                                    </FormItem>
                                )}
                            />
                            <Button type='submit' className='w-full ' variant='secondary'>
                                Đăng nhập
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}
