
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { useUserStore } from "@/hooks/store";


export function DeleteModal() {
    const { setModalType } = useUserStore();
    return (
        <Dialog open={true}
            onOpenChange={(open) => {
                if (!open) {
                    setModalType("IDLE");
                }
            }}>

            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Delete</DialogTitle>
                    <DialogDescription>
                        Do you want to delete it?
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter className="sm:justify-end">
                    <DialogClose asChild>
                        <Button type="button" >
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
