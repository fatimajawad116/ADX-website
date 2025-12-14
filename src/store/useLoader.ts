import { create } from "zustand";

interface LoadingStatus {
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

const useLoadingStore = create<LoadingStatus>((set) => ({
  loading: false,
  setLoading: (loading: boolean) => set({ loading }),
}));

export default useLoadingStore;
