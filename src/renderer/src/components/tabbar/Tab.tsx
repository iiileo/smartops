import { cn } from '@renderer/utils/cn'
import { LayoutGrid, X } from 'lucide-react'

interface TabProps {
  active?: boolean
  arrowClose?: boolean
}

const Tab: React.FC<TabProps> = ({ active, arrowClose = true }): React.ReactElement => {
  return (
    <div className={cn('h-full toolbar-tab-button pt-[4px] box-border flex-1 max-w-[160px]')}>
      <div
        className={cn('h-[36px] pb-[6px] flex items-center px-[4px] box-border rounded-t-lg relative w-full', {
          'bg-white toolbar-btn-button-active': active
        })}
      >
        <div
          className={cn('flex h-[28px] items-center gap-[4px] px-[4px] py-[4px] rounded-[6px] box-border w-full ', {
            'hover:bg-blue-200': !active
          })}
        >
          <LayoutGrid size={14} />
          <span className=" flex-1 text-xs text-black line-clamp-1">工作台</span>
          {arrowClose && (
            <div className="w-[16px] h-[16px] flex items-center justify-center hover:bg-gray-200 rounded-full">
              <X size={12} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Tab
