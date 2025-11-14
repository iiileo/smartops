import { Tab } from '@renderer/types/tab'
import { produce } from 'immer'
import { create } from 'zustand'

interface TabState {
  tabs: Tab[]
  selectedTab: Tab | null
  addTab: () => Promise<void>
  closeTab: (tabId: number) => void
  setSelectedTab: (tabId: number) => void

  setTabUrl: (tabId: number, url: string) => void
  setTabFavicon: (tabId: number, favicon: string) => void
  setTabTitle: (tabId: number, title: string) => void
  setTabLoading: (tabId: number, loading: boolean) => void
  setTabCanBackAndForward: (tabId: number, canBack: boolean, canForward: boolean) => void
}

const defaultTab: Tab = { id: -1, title: '工作台', closeable: false, meta: {} }

const useTabStore = create<TabState>((set) => ({
  tabs: [defaultTab],
  selectedTab: defaultTab,
  addTab: async () => {
    const id = await window.tabs.addTab('https://b2bwork.baidu.com')
    if (id === null) {
      return
    }
    const newTab: Tab = { id, title: 'New Tab', closeable: true, meta: {}, loading: true }
    set(
      produce((draft) => {
        draft.tabs.push(newTab)
        draft.selectedTab = newTab
      })
    )
  },
  closeTab: (tabId: number) => {
    window.tabs.closeTab(tabId)
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
  setSelectedTab: (tabId: number) => {
    window.tabs.setSelectedTab(tabId)
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
  },
  setTabUrl: (tabId: number, url: string) => {
    set(
      produce((draft) => {
        const index = draft.tabs.findIndex((tab: Tab) => tab.id === tabId)
        if (index !== -1) {
          draft.tabs[index].url = url
        }
      })
    )
  },
  setTabFavicon: (tabId: number, favicon: string) => {
    set(
      produce((draft) => {
        const index = draft.tabs.findIndex((tab: Tab) => tab.id === tabId)
        if (index !== -1) {
          draft.tabs[index].favicon = favicon
        }
      })
    )
  },
  setTabTitle: (tabId: number, title: string) => {
    set(
      produce((draft) => {
        const index = draft.tabs.findIndex((tab: Tab) => tab.id === tabId)
        if (index !== -1) {
          draft.tabs[index].title = title
        }
      })
    )
  },
  setTabLoading: (tabId: number, loading: boolean) => {
    set(
      produce((draft) => {
        const index = draft.tabs.findIndex((tab: Tab) => tab.id === tabId)
        if (index !== -1) {
          draft.tabs[index].loading = loading
        }
      })
    )
  },
  setTabCanBackAndForward: (tabId: number, canBack: boolean, canForward: boolean) => {
    set(
      produce((draft) => {
        const index = draft.tabs.findIndex((tab: Tab) => tab.id === tabId)
        if (index !== -1) {
          draft.tabs[index].canBack = canBack
          draft.tabs[index].canForward = canForward
        }
      })
    )
  }
}))

export default useTabStore
