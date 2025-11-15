import useTabStore from '@renderer/stores/useTabStore'
import { cn } from '@renderer/utils/cn'
import { ChevronLeft, ChevronRight, RotateCw } from 'lucide-react'

const SearchBarControls: React.FC = (): React.ReactElement => {
  const selectedTab = useTabStore((state) => state.selectedTab)
  const goBack = useTabStore((state) => state.goBack)
  const goForward = useTabStore((state) => state.goForward)
  const refreshTab = useTabStore((state) => state.refreshTab)
  const canBack = selectedTab?.canBack
  const canForward = selectedTab?.canForward

  const handleGoBack = (): void => {
    if (canBack) {
      goBack(selectedTab.id)
    }
  }
  const handleGoForward = (): void => {
    if (canForward) {
      goForward(selectedTab.id)
    }
  }
  const handleRefresh = (): void => {
    if (selectedTab && selectedTab.id) {
      refreshTab(selectedTab.id)
    }
  }

  return (
    <div className="h-[28px] flex items-center gap-[8px]">
      <div
        className={cn('h-full w-[28px] flex items-center justify-center hover:bg-gray-200 rounded-full', {
          'text-gray-400': !canBack
        })}
        onClick={handleGoBack}
      >
        <ChevronLeft size={16} />
      </div>
      <div
        className={cn('h-full w-[28px] flex items-center justify-center hover:bg-gray-200 rounded-full', {
          'text-gray-400': !canForward
        })}
        onClick={handleGoForward}
      >
        <ChevronRight size={16} />
      </div>
      <div
        className="h-full w-[28px] flex items-center justify-center hover:bg-gray-200 rounded-full"
        onClick={handleRefresh}
      >
        <RotateCw size={16} />
      </div>
    </div>
  )
}

export default SearchBarControls
