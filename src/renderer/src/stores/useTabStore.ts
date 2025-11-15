import { Tab } from '@renderer/types/tab'
import { produce } from 'immer'
import { create } from 'zustand'

const urls = [
  'https://b2bwork.baidu.com',
  'https://www.douyin.com',
  'https://www.github.com',
  'https://www.bilibili.com',
  'https://www.iqiyi.com',
  'https://www.youku.com',
  'https://www.iqiyi.com',
  'https://www.youku.com',
  'https://www.qq.com',
  'https://www.taobao.com',
  'https://www.jd.com'
]

interface TabState {
  // 搜索框
  searchFocused: boolean
  setSearchFocused: (focused: boolean) => void
  searchValue: string
  setSearchValue: (value: string) => void

  // tab 操作
  tabs: Tab[]
  selectedTab: Tab | null
  addTab: () => Promise<void>
  closeTab: (tabId: number) => void
  setSelectedTab: (tabId: number) => void
  refreshTab: (tabId: number) => void
  goBack: (tabId: number) => void
  goForward: (tabId: number) => void

  // 设置状态，监听主线程的操作
  setTabUrl: (tabId: number, url: string) => void
  setTabFavicon: (tabId: number, favicon: string) => void
  setTabTitle: (tabId: number, title: string) => void
  setTabLoading: (tabId: number, loading: boolean) => void
  setTabCanBackAndForward: (tabId: number, canBack: boolean, canForward: boolean) => void
}

const defaultTab: Tab = { id: -1, title: '工作台', closeable: false, meta: {} }

const useTabStore = create<TabState>((set) => ({
  searchFocused: false,
  setSearchFocused: (focused: boolean) => {
    set(
      produce((draft) => {
        draft.searchFocused = focused
      })
    )
  },
  searchValue: '',
  setSearchValue: (value: string) => {
    set(
      produce((draft) => {
        draft.searchValue = value
      })
    )
  },

  tabs: [defaultTab],
  selectedTab: defaultTab,
  addTab: async () => {
    const randomUrl = urls[Math.floor(Math.random() * urls.length)]
    const id = await window.tabs.addTab(randomUrl)
    if (id === null) {
      return
    }
    const newTab: Tab = { id, title: 'New Tab', closeable: true, meta: {}, loading: true }
    set(
      produce((draft) => {
        draft.tabs.push(newTab)
        draft.selectedTab = newTab
        draft.searchValue = newTab.url || ''
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
        let tab: Tab | null = null
        if (tabId === draft.selectedTab?.id && index < draft.tabs.length - 1) {
          tab = draft.tabs[index + 1] || defaultTab
        } else if (tabId === draft.selectedTab?.id && index === draft.tabs.length - 1) {
          tab = draft.tabs[index - 1] || defaultTab
        }
        draft.selectedTab = tab
        draft.searchValue = tab?.url || ''
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
          draft.searchValue = draft.tabs[index].url || ''
        } else {
          draft.searchValue = ''
          draft.selectedTab = draft.tabs[0]
        }
      })
    )
  },
  refreshTab: (tabId: number) => {
    window.tabs.refreshTab(tabId)
  },
  goBack: (tabId: number) => {
    window.tabs.goBack(tabId)
  },
  goForward: (tabId: number) => {
    window.tabs.goForward(tabId)
  },
  setTabUrl: (tabId: number, url: string) => {
    console.log('setTabUrl', tabId, url)
    set(
      produce((draft) => {
        const index = draft.tabs.findIndex((tab: Tab) => tab.id === tabId)
        console.log('setTabUrl index', index)
        if (index !== -1) {
          draft.tabs[index].url = url
          draft.selectedTab = draft.tabs[index]
          draft.searchValue = url
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
