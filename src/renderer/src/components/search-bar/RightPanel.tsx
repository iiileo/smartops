import { Settings } from 'lucide-react'

const RightPanel: React.FC = (): React.ReactElement => {
  const handleSettings = (): void => {
    window.win.minimize()
  }
  return (
    <div className="h-[32px] flex items-center justify-center gap-[8px]">
      {/* avatar */}
      <div className="h-[32px] w-[32px] flex items-center justify-center rounded-full">
        <img
          src="https://random-cat-assets-r2.hats-land.com/api/v1/images"
          alt="avatar"
          className="w-[18px] h-[18px] object-cover rounded-full"
        />
      </div>
      {/* settings */}
      <div
        className="h-[32px] w-[32px] flex items-center justify-center bg-white rounded-full hover:bg-gray-200"
        onClick={handleSettings}
      >
        <Settings size={16} />
      </div>
    </div>
  )
}

export default RightPanel
