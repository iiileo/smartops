import { create } from 'zustand'

interface WindowState {
  isFullScreen: boolean
  setIsFullScreen: (isFullScreen: boolean) => void
  isMaximized: boolean
  setIsMaximized: (isMaximized: boolean) => void
  isMinimized: boolean
  setIsMinimized: (isMinimized: boolean) => void
}

const useWindowStore = create<WindowState>((set) => ({
  isFullScreen: false,
  setIsFullScreen: (isFullScreen: boolean) => set({ isFullScreen }),
  isMaximized: false,
  setIsMaximized: (isMaximized: boolean) => set({ isMaximized }),
  isMinimized: false,
  setIsMinimized: (isMinimized: boolean) => set({ isMinimized })
}))

export default useWindowStore
