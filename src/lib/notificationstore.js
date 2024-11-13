import { create } from 'zustand'
import apiRequest from './apiRequest'

export const useStore = create((set) => ({
  num: 0,
  fetch: async () => {
    const res = await apiRequest.get('users/notification')
    set({ num: res.data })
  },
  decrease: () => set((prev) => ({ num: prev.num - 1 })),
  reset: () => set({ num: 0 })
}))
