
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";




export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}



export const normalizePath = (path: string) => {
  return path.startsWith("/") ? path.slice(1) : path;
};


export const decodeJWT = <Payload = any>(token: string): Payload | null => {
  try {

    const decoded = decodeJWT<Payload>(token);
    return decoded;
  } catch (error) {
    console.error("JWT decode error:", error);
    return null;
  }
};