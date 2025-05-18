import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Initiative } from "@/lib/types"

interface StoreState {
  initiatives: Initiative[]
  selectedInitiative: string | null
  companyName: string
  companyDescription: string
  favoriteInitiatives: string[]
  setInitiatives: (initiatives: Initiative[]) => void
  setSelectedInitiative: (id: string | null) => void
  setCompanyName: (name: string) => void
  setCompanyDescription: (description: string) => void
  toggleFavoriteInitiative: (id: string) => void
  clearAllData: () => void
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      initiatives: [],
      selectedInitiative: null,
      companyName: "Acme Corp",
      companyDescription: "",
      favoriteInitiatives: [],
      setInitiatives: (initiatives) => set({ initiatives }),
      setSelectedInitiative: (id) => set({ selectedInitiative: id }),
      setCompanyName: (name) => set({ companyName: name }),
      setCompanyDescription: (description) => set({ companyDescription: description }),
      toggleFavoriteInitiative: (id) =>
        set((state) => ({
          favoriteInitiatives: state.favoriteInitiatives.includes(id)
            ? state.favoriteInitiatives.filter((favId) => favId !== id)
            : [...state.favoriteInitiatives, id],
        })),
      clearAllData: () =>
        set({
          initiatives: [],
          selectedInitiative: null,
          companyName: "Acme Corp",
          companyDescription: "",
          favoriteInitiatives: [],
        }),
    }),
    {
      name: "mandela-os-storage",
    },
  ),
)
