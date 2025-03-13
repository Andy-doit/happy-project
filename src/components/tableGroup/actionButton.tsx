import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useModalStore } from "@/hooks/modalStore";

interface ActionButtonProps {
    icon: React.ReactNode;
    onClick?: () => void;
    variant?: "default" | "outline" | "destructive";
    modalContent?: React.ReactNode;
    modalId: string;
    modalTitle?: string;
}

export default function ActionButton({
    icon,
    onClick,
    variant = "default",
    modalContent,
    modalId,
    modalTitle
}: ActionButtonProps) {
    const { isModalOpen, openModal, closeModal } = useModalStore();

    const handleClick = () => {
        if (modalContent) {
            openModal(modalId);
        } else if (onClick) {
            onClick();
        }
    };

    return (
        <>
            <Button variant={variant} size="icon" onClick={handleClick}>
                {icon}
            </Button>

            {modalContent && (
                <Dialog
                    open={isModalOpen(modalId)}
                    onOpenChange={(isOpen) => !isOpen && closeModal(modalId)}
                >
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{modalTitle}</DialogTitle>
                        </DialogHeader>
                        {modalContent}
                        <DialogFooter>
                            <Button onClick={() => closeModal(modalId)}>Close</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )}
        </>
    );
}
