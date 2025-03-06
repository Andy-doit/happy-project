import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoginBody, LoginBodyType } from "@/schemaValidations/auth.schema";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { InputField } from "@/components/inputField";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useLogin } from "@/hooks/useAuth";


export default function Login() {
    const navigate = useNavigate();
    const { handleLogin } = useLogin();
    const [isPending, setIsPending] = useState(false);

    const form = useForm<LoginBodyType>({
        resolver: zodResolver(LoginBody),
        defaultValues: {
            username: "",
            password: "",
        },
    });

    async function onSubmit(values: LoginBodyType) {
        if (isPending) return;
        setIsPending(true);
        try {
            await handleLogin(values, navigate);
        } catch (error) {
            console.error("Login failed:", error);
        } finally {
            setIsPending(false);
        }
    }

    return (
        <Card className="mx-auto max-w-sm">
            <CardHeader>
                <CardTitle className="text-2xl">Đăng nhập</CardTitle>
                <CardDescription>
                    Nhập tên tài khoản và mật khẩu của bạn để đăng nhập vào hệ thống
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-2 max-w-[600px] flex-shrink-0 w-full"
                        noValidate
                    >
                        <div className="grid gap-4">
                            <InputField
                                name="username"
                                label="Tên tài khoản"
                                placeholder="Nhập tên tài khoản"
                                control={form.control}
                            />
                            <InputField
                                name="password"
                                label="Mật khẩu"
                                type="password"
                                placeholder="Nhập mật khẩu"
                                control={form.control}
                            />
                            <Button
                                type="submit"
                                className="w-full"
                                variant="secondary"
                                disabled={isPending}
                            >
                                {isPending ? "Đang đăng nhập..." : "Đăng nhập"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
