import useTabStore from '@renderer/stores/useTabStore'
import Tab from './Tab'
import AddTab from './AddTab'
import { useState } from 'react'
import { cn } from '@renderer/utils/cn'

const Tabbar = (): React.ReactNode => {

  const [platform] = useState(window.electron.process.platform)

  const isMacOs = platform === 'darwin'
  const isWindow = platform === 'win32'

  const tabs = useTabStore((state) => state.tabs)
  const selectedTab = useTabStore((state) => state.selectedTab)
  const setSelectedTab = useTabStore((state) => state.setSelectedTab)
  const closeTab = useTabStore((state) => state.closeTab)

  return (
    <div className={cn("h-full flex-1 flex items-center gap-[8px] box-border overflow-hidden", {
      'pl-[90px]': isMacOs,
      'pl-4': isWindow
    })}>
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
