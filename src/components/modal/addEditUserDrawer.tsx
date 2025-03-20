import { AddEditDrawerProps } from "@/contansts/type";
import AddEditUserForm from "../addEditUserForm";

export default function AddEditUserDrawwer({ isAdd }: AddEditDrawerProps) {

    return (
        <>
            <AddEditUserForm
                isAdd={isAdd}
            />
        </>
    )
}
