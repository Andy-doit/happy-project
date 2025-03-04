"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { toast } from "sonner"
import { LoginBody, LoginBodyType } from "@/schemaValidations/auth.schema"
import { useNavigate } from "react-router-dom"
import { useLoginMutation } from "@/app/queries/useAuth"
import { useAppContext } from "@/components/provider"
import { handleErrorApi } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Label } from "@radix-ui/react-label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"


export default function Login() {
    const navigate = useNavigate()
    const { setIsAuth } = useAppContext()
    const loginMutation = useLoginMutation()
    const form = useForm<LoginBodyType>({
        resolver: zodResolver(LoginBody),
        defaultValues: {
            username: "",
            password: "",
        },
    })

    async function onSubmit(values: LoginBodyType) {
        if (loginMutation.isPending) return
        try {
            const result = await loginMutation.mutateAsync(values)
            toast(result.payload.message);
            navigate('/')
            setIsAuth(true)
        } catch (error: any) {
            handleErrorApi({
                error,
                setError: form.setError
            })
        }
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
                                            <Input id='username' type='text' placeholder='Tên tài khoản' required {...field} />
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
                                            <Label htmlFor='password'>Mật khẩu</Label>
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
