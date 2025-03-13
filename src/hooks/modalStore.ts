import { create } from "zustand";

interface ModalStore {
    openModals: Record<string, boolean>;
    openModal: (id: string) => void;
    closeModal: (id: string) => void;
    isModalOpen: (id: string) => boolean;
}

export const useModalStore = create<ModalStore>((set, get) => ({
    openModals: {},
    openModal: (id) => set((state) => ({ openModals: { ...state.openModals, [id]: true } })),
    closeModal: (id) => set((state) => ({ openModals: { ...state.openModals, [id]: false } })),
    isModalOpen: (id) => !!get().openModals[id],
}));
