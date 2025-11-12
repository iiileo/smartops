import { Maximize, Minus, X } from 'lucide-react'

interface WindowControlsProps {
  onMinimize: () => void
  onMaximize: () => void
  onClose: () => void
}

const WindowControls: React.FC<WindowControlsProps> = ({ onMinimize, onMaximize, onClose }): React.ReactElement => {
  return (
    <div className="h-full flex items-center justify-center window-controls">
      <div className="hover:bg-gray-300 h-full w-[36px] flex items-center justify-center" onClick={onMinimize}>
        <Minus size={16} />
      </div>
      <div className="hover:bg-gray-300 h-full w-[36px] flex items-center justify-center" onClick={onMaximize}>
        <Maximize size={16} />
      </div>
      <div className="hover:bg-red-400 h-full w-[36px] flex items-center justify-center" onClick={onClose}>
        <X size={20} />
      </div>
    </div>
  )
}

export default WindowControls
