import useTabStore from '@renderer/stores/useTabStore'
import Tab from './Tab'
import AddTab from './AddTab'

const Tabbar = (): React.ReactNode => {
  const tabs = useTabStore((state) => state.tabs)
  const selectedTab = useTabStore((state) => state.selectedTab)
  const setSelectedTab = useTabStore((state) => state.setSelectedTab)
  const closeTab = useTabStore((state) => state.closeTab)

  return (
    <div className="h-full flex-1 flex items-center gap-[4px] box-border">
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
