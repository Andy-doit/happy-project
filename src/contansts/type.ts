import { ArticleBody, ArticleListRes, ArticleParams, ArticleRes, CategoriesListRes, CategoriesRes } from "@/schemaValidations/admin.schema"
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
export interface UserItemProps {
    id: string;
    name: string;
    email: string;
    role: string;
}
export interface AddEditDrawerProps {
    isAdd: boolean;

}
export const ADD_FORM = "ADD";
export const EDIT_FORM = "EDIT";
export const DELETE_FORM = "DELETE";
export const IDLE = "IDLE";

export type FormActionType = typeof ADD_FORM | typeof EDIT_FORM | typeof DELETE_FORM | typeof IDLE;
export const IDLE_FORM: FormActionType = IDLE;
export type ArticleResType = z.TypeOf<typeof ArticleRes>
export type ArticleBodyType = z.TypeOf<typeof ArticleBody>
export type ArticleListResType = z.TypeOf<typeof ArticleListRes>
export type ArticleParamsType = z.TypeOf<typeof ArticleParams>
export type RefreshTokenBodyType = z.TypeOf<typeof RefreshTokenBody>
export type RefreshTokenResType = z.TypeOf<typeof RefreshTokenRes>
export type LoginResType = z.TypeOf<typeof LoginRes>
export type LoginBodyType = z.TypeOf<typeof LoginBody>
export type CategoriesResType = z.TypeOf<typeof CategoriesRes>
export type CategoriesListResType = z.TypeOf<typeof CategoriesListRes>