import useWindowStore from '@renderer/stores/useWindowStore'
import { cn } from '@renderer/utils/cn'
import { useState } from 'react'

const WindowControls: React.FC = (): React.ReactElement => {
  const [minimizeHover, setMinimizeHover] = useState(false)

  const isMaximized = useWindowStore((state) => state.isMaximized)

  const handleMinimize = (e: React.MouseEvent<HTMLDivElement>): void => {
    e.stopPropagation()
    e.preventDefault()
    setMinimizeHover(false)
    window.win.minimize()
  }
  const handleMaximize = (e: React.MouseEvent<HTMLDivElement>): void => {
    e.stopPropagation()
    e.preventDefault()
    console.log('handleMaximize', isMaximized)
    if (isMaximized) {
      window.win.unmaximize()
    } else {
      window.win.maximize()
    }
  }
  const handleClose = (e: React.MouseEvent<HTMLDivElement>): void => {
    e.stopPropagation()
    e.preventDefault()
    window.win.close()
  }

  return (
    <div className="h-full flex items-center justify-center window-controls">
      <div
        className={cn('h-full w-[46px] flex items-center justify-center', {
          'bg-gray-300': minimizeHover
        })}
        onClick={handleMinimize}
        onMouseEnter={() => setMinimizeHover(true)}
        onMouseLeave={() => setMinimizeHover(false)}
      >
        <div className="codicon codicon-chrome-minimize"></div>
      </div>
      <div className="hover:bg-gray-300 h-full w-[46px] flex items-center justify-center" onClick={handleMaximize}>
        {isMaximized ? (
          <div className="codicon codicon-chrome-restore"></div>
        ) : (
          <div className="codicon codicon-chrome-maximize"></div>
        )}
      </div>
      <div className="hover:bg-red-400 h-full w-[46px] flex items-center justify-center" onClick={handleClose}>
        <div className="codicon codicon-chrome-close"></div>
      </div>
    </div>
  )
}

export default WindowControls
