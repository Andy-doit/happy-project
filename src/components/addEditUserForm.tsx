import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer";
import { useUserStore } from "@/hooks/store";
import { Button } from "./ui/button";
import { AddEditDrawerProps, ArticleBodyType, IDLE_FORM } from "@/contansts/type";
import { Separator } from "./ui/separator";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArticleBody } from "@/schemaValidations/admin.schema";
import { Form } from "./ui/form";
import { InputField } from "./inputField";
import { SelectField } from "./selectField";
import { StatusOptions } from "@/contansts/data";
import { useCategories } from "@/hooks/useAdmin";
import { UploadImageField } from "./uploadImageField";
import { TextAreaField } from "./textAreaField";
import { X } from "lucide-react";

export default function AddEditUserForm({ isAdd }: AddEditDrawerProps) {
    const { setModalType } = useUserStore();
    const { data: categories } = useCategories();
    const categoryOptions = categories?.data.map((cate) => ({
        value: cate.id,
        label: cate.name
    })) ?? [];

    const handleCloseModal = () => {
        setModalType(IDLE_FORM);
    };

    const form = useForm<ArticleBodyType>({
        resolver: zodResolver(ArticleBody),
        defaultValues: {
            title: "",
            content: "",
            picture: "",
            status: "",
            type: "",
            timeToRead: 0,
            categoryId: "",
            author: "",
        },
    });

    return (
        <Drawer

            direction="right"
            open={true}
            onOpenChange={(open) => {
                if (!open) handleCloseModal();
            }}
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit((data) => console.log("Form Data:", data))}>
                    <DrawerContent >
                        <DrawerHeader>
                            <DrawerTitle className="justify-between flex">
                                {isAdd ? "Add" : "Edit"}
                                <DrawerClose asChild>
                                    <Button size="icon" variant="outline" onClick={handleCloseModal}>
                                        <X />
                                    </Button>
                                </DrawerClose>
                            </DrawerTitle>
                        </DrawerHeader >
                        <Separator />
                        <DrawerHeader className="max-h-screen overflow-y-auto">
                            <InputField
                                name="title"
                                label="Title"
                                placeholder="Title"
                                control={form.control}
                            />
                            <InputField
                                name="author"
                                label="Author"
                                placeholder="Author"
                                control={form.control}
                            />
                            <SelectField
                                name="status"
                                control={form.control}
                                label="Status"
                                options={StatusOptions}
                                placeholder="Choose a Status"
                            />
                            <SelectField
                                name="categoryId"
                                control={form.control}
                                label="Category"
                                options={categoryOptions}
                                placeholder="Choose a Category"
                            />
                            <InputField
                                name="timeToRead"
                                label="Duration (Ex: 3mins)"
                                placeholder="Time to read"
                                control={form.control}
                            />

                            <UploadImageField
                                name="picture"
                                label="Picture"

                            />
                            <TextAreaField
                                placeholder="Content"
                                control={form.control}
                                name="content"
                                label="Content"
                            />
                        </DrawerHeader>
                        <DrawerFooter>
                            <Button type="submit">Submit</Button>
                        </DrawerFooter>
                    </DrawerContent >

                </form>
            </Form>
        </Drawer >
    );
}
