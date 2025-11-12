import { cn } from '@renderer/utils/cn'
import { LayoutGrid } from 'lucide-react'

interface TabProps {
  active?: boolean
}

const Tab: React.FC<TabProps> = ({ active }): React.ReactNode => {
  return (
    <div className={cn('h-full toolbar-tab-button pt-[4px] box-border')}>
      <div
        className={cn('h-[36px] pb-[6px]! flex items-center py-[2px] px-[4px] box-border rounded-t-lg', {
          'bg-white': active
        })}
      >
        <div
          className={cn('flex h-[28px] items-center gap-[4px] px-[8px] py-[4px] rounded-[6px] box-border', {
            'hover:bg-blue-200 ': !active
          })}
        >
          <LayoutGrid size={14} />
          <span className="text-xs text-black">工作台</span>
        </div>
      </div>
    </div>
  )
}

export default Tab
