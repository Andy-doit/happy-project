import { ArticleListRes, ArticleParams, ArticleRes } from "@/schemaValidations/admin.schema"
import { LoginBody, LoginRes, RefreshTokenBody, RefreshTokenRes } from "@/schemaValidations/auth.schema"
import { z } from "zod"

export const ROLE = {
    SUPER_ADMIN: "superAdmin",
    ADMIN: 'admin',

}
type ModalType = string;
export interface ModalState {
    activeModals: Record<ModalType, boolean>;
    openModal: (modalType: ModalType) => void;
    closeModal: (modalType: ModalType) => void;
    toggleModal: (modalType: ModalType) => void;
    isModalOpen: (modalType: ModalType) => boolean;
}
export type ArticleResType = z.TypeOf<typeof ArticleRes>
export type ArticleListResType = z.TypeOf<typeof ArticleListRes>
export type ArticleParamsType = z.TypeOf<typeof ArticleParams>
export type RefreshTokenBodyType = z.TypeOf<typeof RefreshTokenBody>
export type RefreshTokenResType = z.TypeOf<typeof RefreshTokenRes>
export type LoginResType = z.TypeOf<typeof LoginRes>
export type LoginBodyType = z.TypeOf<typeof LoginBody>