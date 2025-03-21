import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useUserStore } from "@/hooks/store";
import { useDeleteArticleMutation } from "@/hooks/useAdmin";


export function DeleteArticleModal() {
    const { articleId, setModalType } = useUserStore();
    const deleteArticleMutation = useDeleteArticleMutation();
    const handleDelete = () => {
        if (!articleId) {
            toast.error("No article selected for deletion.");
            return;
        }

        const ids = [articleId];
        console.log("Deleting articles with ids:", JSON.stringify(ids));

        deleteArticleMutation.mutate(ids, {
            onSuccess: () => {
                toast.success("Article deleted successfully!");
                setModalType("IDLE");
            },
            onError: (error) => {
                console.error("Delete article error:", error);
                toast.error(`Failed to delete article: ${error.message}`);
            }
        });
    };


    return (
        <Dialog open={!!articleId} onOpenChange={(open) => !open && setModalType("IDLE")}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Delete Article</DialogTitle>
                    <DialogDescription>Are you sure you want to delete this article?</DialogDescription>
                </DialogHeader>
                <DialogFooter className="sm:justify-end">
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button
                        variant="destructive"
                        onClick={handleDelete}
                        disabled={deleteArticleMutation.status === "pending"}
                    >
                        {deleteArticleMutation.status === "pending" ? "Deleting..." : "Delete"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
