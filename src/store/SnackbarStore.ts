import { create } from "zustand";

interface Snackbar {
  message: string;
  severity: "success" | "error" | "warning" | "info";
}

interface SnackbarState {
  queue: Snackbar[];
  current: Snackbar | null;
  open: boolean;
  
  showSnackbar: (message: string, severity?: Snackbar["severity"]) => void;
  closeSnackbar: () => void;
  processQueue: () => void;
}

export const useSnackbarStore = create<SnackbarState>((set, get) => ({
  queue: [],
  current: null,
  open: false,

  showSnackbar: (message, severity = "info") => {
    set((state) => ({
      queue: [...state.queue, { message, severity }],
    }));
    
    if (!get().open) {
      get().processQueue(); // Start processing if not already open
    }
  },

  closeSnackbar: () => {
    set({ open: false });
    setTimeout(() => get().processQueue(), 300); // Process next after closing
  },

  processQueue: () => {
    const { queue } = get();
    if (queue.length > 0) {
      const nextSnackbar = queue[0];
      set({ current: nextSnackbar, open: true, queue: queue.slice(1) });
    }
  },
}));