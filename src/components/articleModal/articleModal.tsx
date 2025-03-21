import { useUserStore } from "@/hooks/store";
import { useCallback } from "react";

import { ADD_FORM, DELETE_FORM, EDIT_FORM } from "../../contansts/type";
import AddEditArticleDrawwer from "./addEditArticleDrawer";
import { DeleteArticleModal } from "./deleteArticleModal";

export const ArticleModal = () => {
    const { modalType, articleId } = useUserStore();
    const renderModal = useCallback(() => {
        switch (modalType) {
            case ADD_FORM:
                return <AddEditArticleDrawwer isAdd />;
            case EDIT_FORM:
                return <AddEditArticleDrawwer isAdd={false} articleId={articleId} />;
            case DELETE_FORM:
                return <DeleteArticleModal />;
            default:
                return null;
        }
    }, [modalType]);

    return <div>{renderModal()}</div>;
};