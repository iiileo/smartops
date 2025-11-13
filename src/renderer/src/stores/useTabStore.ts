import { Tab } from '@renderer/types/tab'
import { produce } from 'immer'
import { create } from 'zustand'
import { v4 as uuidv4 } from 'uuid'

interface TabState {
  tabs: Tab[]
  selectedTab: Tab | null
  addTab: () => void
  closeTab: (tabId: string | number) => void
  setSelectedTab: (tabId: string | number) => void
}

const defaultTab: Tab = { id: 'default', icon: 'home', title: '工作台', closeable: false, meta: {} }

const useTabStore = create<TabState>((set) => ({
  tabs: [defaultTab],
  selectedTab: defaultTab,
  addTab: () => {
    const id = uuidv4()
    const newTab: Tab = { id, icon: 'home', title: 'New Tab', closeable: true, meta: {} }
    set(
      produce((draft) => {
        draft.tabs.push(newTab)
        draft.selectedTab = newTab
      })
    )
  },
  closeTab: (tabId: string | number) => {
    set(
      produce((draft) => {
        const index = draft.tabs.findIndex((tab: Tab) => tab.id === tabId)
        // 1、如果 tabId === 当前选中的 且 右侧还有，就选中当前关闭右侧的
        // 2、如果 tabId === 当前选中的 且 右侧没有，就选中当前关闭左侧的
        // 3、如果 tabId !== 当前选中的 就不切换 selectedTab
        if (tabId === draft.selectedTab?.id && index < draft.tabs.length - 1) {
          draft.selectedTab = draft.tabs[index + 1] || defaultTab
        } else if (tabId === draft.selectedTab?.id && index === draft.tabs.length - 1) {
          draft.selectedTab = draft.tabs[index - 1] || defaultTab
        }
        draft.tabs.splice(index, 1)
      })
    )
  },
  setSelectedTab: (tabId: string | number) => {
    set(
      produce((draft) => {
        const index = draft.tabs.findIndex((tab: Tab) => tab.id === tabId)
        if (index !== -1) {
          draft.selectedTab = draft.tabs[index]
        } else {
          draft.selectedTab = draft.tabs[0]
        }
      })
    )
  }
}))

export default useTabStore
