import { create } from "zustand";

const Store = create((set) => ({
    count: 0,
    increament: () => set((state) => ({ count: state.count + 1 })),
    descreament: () => set((state) => ({ count: state.count - 1 })),
}));
export default Store;