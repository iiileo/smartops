import useTabStore from '@renderer/stores/useTabStore'
import useWindowStore from '@renderer/stores/useWindowStore'
import { cn } from '@renderer/utils/cn'
import { useState } from 'react'
import AddTab from './AddTab'
import Tab from './Tab'

const Tabbar = (): React.ReactNode => {
  const [platform] = useState(window.electron.process.platform)

  const isMacOs = platform === 'darwin'
  const isWindow = platform === 'win32'

  const tabs = useTabStore((state) => state.tabs)
  const selectedTab = useTabStore((state) => state.selectedTab)
  const setSelectedTab = useTabStore((state) => state.setSelectedTab)
  const closeTab = useTabStore((state) => state.closeTab)
  const isFullScreen = useWindowStore((state) => state.isFullScreen)

  return (
    <div
      className={cn('h-full flex-1 flex items-center gap-[8px] box-border overflow-hidden', {
        'pl-[90px]': isMacOs && !isFullScreen,
        'pl-[12px]': isWindow || isFullScreen
      })}
    >
      {tabs.map((tab) => (
        <Tab
          key={tab.id}
          tab={tab}
          selected={tab.id === selectedTab?.id}
          arrowClose={tab.closeable}
          onClick={() => {
            setSelectedTab(tab.id)
          }}
          onClose={() => {
            closeTab(tab.id)
          }}
        />
      ))}
      <AddTab />
    </div>
  )
}

export default Tabbar
