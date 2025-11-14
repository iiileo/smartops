import useWindowStore from '@renderer/stores/useWindowStore'
import { cn } from '@renderer/utils/cn'
import { Maximize, Minimize, Minus, X } from 'lucide-react'
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
        className={cn('h-full w-[36px] flex items-center justify-center', {
          'bg-gray-300': minimizeHover
        })}
        onClick={handleMinimize}
        onMouseEnter={() => setMinimizeHover(true)}
        onMouseLeave={() => setMinimizeHover(false)}
      >
        <Minus size={16} />
      </div>
      <div className="hover:bg-gray-300 h-full w-[36px] flex items-center justify-center" onClick={handleMaximize}>
        {isMaximized ? <Minimize size={16} /> : <Maximize size={16} />}
      </div>
      <div className="hover:bg-red-400 h-full w-[36px] flex items-center justify-center" onClick={handleClose}>
        <X size={20} />
      </div>
    </div>
  )
}

export default WindowControls
