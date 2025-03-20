import { useUserStore } from "@/hooks/store";
import { useCallback } from "react";
import { DeleteModal } from "./deleteModal";
import { ADD_FORM, DELETE_FORM, EDIT_FORM } from "../../contansts/type";
import AddEditUserDrawwer from "./addEditUserDrawer";

export const UserModal = () => {
    const { modalType } = useUserStore();
    const renderModal = useCallback(() => {
        switch (modalType) {
            case ADD_FORM:
                return <AddEditUserDrawwer isAdd />;
            case EDIT_FORM:
                return <AddEditUserDrawwer isAdd={false} />;
            case DELETE_FORM:
                return <DeleteModal />;
            default:
                return null;
        }
    }, [modalType]);

    return <div>{renderModal()}</div>;
};