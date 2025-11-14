import type { Tab } from '@renderer/types/tab'
import { cn } from '@renderer/utils/cn'
import { LayoutGrid, X } from 'lucide-react'

interface TabProps {
  tab: Tab
  selected?: boolean
  arrowClose?: boolean
  onClick?: () => void
  onClose?: () => void
}

const Tab: React.FC<TabProps> = ({ tab, selected, arrowClose = true, onClick, onClose }): React.ReactElement => {
  return (
    <div
      className={cn('h-full toolbar-tab-button pt-[4px] box-border', {
        'flex-1 min-w-0 max-w-[160px]': tab.id !== -1,
        'w-fit': tab.id === -1
      })}
      onClick={onClick}
    >
      <div
        className={cn('h-[36px] pb-[6px] flex items-center box-border rounded-t-lg relative w-full', {
          'bg-white toolbar-btn-button-active': selected
        })}
      >
        <div
          className={cn('flex h-[28px] items-center gap-[4px] px-[8px] py-[4px] rounded-[6px] box-border w-full ', {
            'hover:bg-blue-200': !selected
          })}
        >
          <LayoutGrid size={14} />
          <span className=" flex-1 text-xs text-black line-clamp-1">{tab.title}</span>
          {arrowClose && (
            <div
              className="w-[18px] h-[18px] flex items-center justify-center hover:bg-gray-200 rounded-full"
              onClick={(event) => {
                onClose?.()
                event.stopPropagation()
              }}
            >
              <X size={12} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Tab
