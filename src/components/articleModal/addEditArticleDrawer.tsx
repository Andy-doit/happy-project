import { AddEditDrawerProps, IDLE_FORM } from "@/contansts/type";
import AddEditArticleForm from "./addEditArticleForm";
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import { useUserStore } from "@/hooks/store";
import { Separator } from "@radix-ui/react-separator";
import { useArticleById, useUpdateArticleMutation, useCreateArticleMutation } from "@/hooks/useAdmin";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function AddEditArticleDrawer({ isAdd, articleId }: AddEditDrawerProps) {
    const { setModalType } = useUserStore();
    const queryClient = useQueryClient();
    const updateArticleMutation = useUpdateArticleMutation();
    const createArticleMutation = useCreateArticleMutation();

    const { data, isLoading } = useArticleById(articleId);

    const articleDetail = !isAdd && data?.data
        ? {
            id: articleId,
            title: data.data.title,
            content: data.data.content,
            picture: data.data.picture?.uri || "",
            status: data.data.status,
            type: data.data.type,
            timeToRead: 5,
            categoryId: data.data.category,
            author: data.data.author,
        }
        : undefined;

    const handleCloseModal = () => {
        setModalType(IDLE_FORM);
    };

    const handleSubmit = (formData: any) => {
        if (isAdd) {
            const newArticleData = { ...formData, type: "article" };

            createArticleMutation.mutate(newArticleData, {
                onSuccess: () => {
                    queryClient.invalidateQueries({ queryKey: ["articles"] });
                    toast.success("Article created successfully!");
                    handleCloseModal();
                },
                onError: () => {
                    toast.error("Failed to create article.");
                },
            });
        } else if (articleId) {
            // Xử lý Update
            updateArticleMutation.mutate(
                { id: articleId, ...formData },
                {
                    onSuccess: () => {
                        queryClient.invalidateQueries({ queryKey: ["articles"] });
                        toast.success("Article updated successfully!");
                        handleCloseModal();
                    },
                    onError: () => {
                        toast.error("Failed to update article.");
                    },
                }
            );
        }
    };


    return (
        <Drawer
            direction="right"
            open={true}
            onOpenChange={(open) => {
                if (!open) handleCloseModal();
            }}
        >
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle className="justify-between flex items-center">
                        {isAdd ? "Add Article" : "Edit Article"}
                        <DrawerClose asChild>
                            <Button size="icon" className="h-7 w-7" variant="outline" onClick={handleCloseModal}>
                                <X />
                            </Button>
                        </DrawerClose>
                    </DrawerTitle>
                </DrawerHeader>
                <Separator className="h-[1px] bg-gray-300 w-full" />
                {isLoading && !isAdd ? (
                    <div className="p-4 text-center">Loading...</div>
                ) : (
                    <AddEditArticleForm articleDetail={articleDetail} onSubmit={handleSubmit} />
                )}
                <DrawerFooter>
                    <Button form="article-form" type="submit">
                        {isAdd ? "Create" : "Update"}
                    </Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
