// utils.ts
import { clsx, type ClassValue } from "clsx";
import { UseFormSetError } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { toast } from "sonner";
import { EntityError } from "../lib/http";

// Nếu dùng thư viện jwt-decode


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleErrorApi = ({
  error,
  setError,
  duration,
}: {
  error: any;
  setError?: UseFormSetError<any>;
  duration?: number;
}) => {
  if (error instanceof EntityError && setError) {
    error.payload.errors.forEach((item) => {
      setError(item.field, {
        type: "server",
        message: item.message,
      });
    });
  } else {
    toast.error(error?.payload?.message ?? "Lỗi không xác định", {
      duration: duration ?? 5000,
    });
  }
};

export const normalizePath = (path: string) => {
  return path.startsWith("/") ? path.slice(1) : path;
};

// Sửa hàm decodeJWT
export const decodeJWT = <Payload = any>(token: string): Payload | null => {
  try {
    // Sử dụng jwt-decode hoặc logic giải mã thủ công
    const decoded = decodeJWT<Payload>(token);
    return decoded;
  } catch (error) {
    console.error("JWT decode error:", error);
    return null;
  }
};