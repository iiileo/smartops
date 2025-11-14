import useWindowStore from '@renderer/stores/useWindowStore'
import { useEffect } from 'react'

export const useWindowChange = (): void => {
  const setIsMaximized = useWindowStore((state) => state.setIsMaximized)
  const setIsFullScreen = useWindowStore((state) => state.setIsFullScreen)
  const setIsMinimized = useWindowStore((state) => state.setIsMinimized)
  // 监听窗口最大化
  useEffect(() => {
    window.win.onMinimize(() => {
      console.log('minimize')
      setIsMinimized(true)
    })
    window.win.onRestore(() => {
      console.log('restore')
      setIsMinimized(false)
    })
    window.win.onMaximize(() => {
      console.log('maximize')
      setIsMaximized(true)
    })
    window.win.onUnmaximize(() => {
      console.log('unmaximize')
      setIsMaximized(false)
    })
    window.win.onEnterFullScreen(() => {
      console.log('enter-full-screen')
      setIsFullScreen(true)
    })
    window.win.onLeaveFullScreen(() => {
      console.log('leave-full-screen')
      setIsFullScreen(false)
    })

    return () => {
      window.win.offMinimize()
      window.win.offRestore()
      window.win.offMaximize()
      window.win.offUnmaximize()
      window.win.offEnterFullScreen()
      window.win.offLeaveFullScreen()
    }
  }, [setIsMinimized, setIsMaximized, setIsFullScreen])
}
