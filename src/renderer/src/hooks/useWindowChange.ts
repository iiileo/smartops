import useWindowStore from '@renderer/stores/useWindowStore'
import { useEffect } from 'react'

export const useWindowChange = (): void => {
  const setIsMaximized = useWindowStore((state) => state.setIsMaximized)
  const setIsFullScreen = useWindowStore((state) => state.setIsFullScreen)
  const setIsMinimized = useWindowStore((state) => state.setIsMinimized)
  // 监听窗口最大化
  useEffect(() => {
    window.tabs.onMinimize(() => {
      console.log('minimize')
      setIsMinimized(true)
    })
    window.tabs.onRestore(() => {
      console.log('restore')
      setIsMinimized(false)
    })
    window.tabs.onMaximize(() => {
      console.log('maximize')
      setIsMaximized(true)
    })
    window.tabs.onUnmaximize(() => {
      console.log('unmaximize')
      setIsMaximized(false)
    })
    window.tabs.onEnterFullScreen(() => {
      console.log('enter-full-screen')
      setIsFullScreen(true)
    })
    window.tabs.onLeaveFullScreen(() => {
      console.log('leave-full-screen')
      setIsFullScreen(false)
    })

    return () => {
      window.tabs.offMinimize()
      window.tabs.offRestore()
      window.tabs.offMaximize()
      window.tabs.offUnmaximize()
      window.tabs.offEnterFullScreen()
      window.tabs.offLeaveFullScreen()
    }
  }, [setIsMinimized, setIsMaximized, setIsFullScreen])
}
