//zustand để quản lý state (khá giống redux)
import { create } from 'zustand';

export interface ModalStoreInterface {
    movieId?: string;
    isOpen: boolean;
    openModal: (movieId: string) => void;
    closeModal: () => void;
}
// dùng create của zustand để tạo một store Zustand mới
//Hàm này nhận vào một callback function có tham số set, là một hàm được cung cấp bởi Zustand để cập nhật trạng thái của store.
const useInfoModalStore = create<ModalStoreInterface>((set) => ({
    movieId: undefined,
    isOpen: false,
    openModal: (movieId: string) => set({ isOpen: true, movieId }),
    closeModal: () => set({ isOpen: false, movieId: undefined }),
}));


export default useInfoModalStore;