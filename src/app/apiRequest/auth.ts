import http from "@/lib/http";
import { LoginBodyType, LoginResType } from "@/schemaValidations/auth.schema";

const authApiRequest = {
    sLogin: (body: LoginBodyType) => http.post<LoginResType>('/admins/auth/login', body),


}
export default authApiRequest;