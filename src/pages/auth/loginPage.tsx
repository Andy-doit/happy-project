import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoginBody } from "@/schemaValidations/auth.schema";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { InputField } from "@/components/inputField";
import { useLogin } from "@/hooks/useAuth";
import { LoginBodyType } from "@/contansts/type";

export default function Login() {
  const { loginMutation } = useLogin();

  const form = useForm<LoginBodyType>({
    resolver: zodResolver(LoginBody),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (values: LoginBodyType) => {
    loginMutation.mutate({ values });
  };
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

                disabled={loginMutation.isPending}
              >
                {loginMutation.isPending ? "Đang đăng nhập..." : "Đăng nhập"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}