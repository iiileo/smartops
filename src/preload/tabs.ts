import { ipcRenderer } from 'electron'

export interface TabAPI {
  addTab: (url: string) => Promise<number>
  setSelectedTab: (tabId: number) => void
  closeTab: (tabId: number) => void
  refreshTab: (tabId: number) => void
  goBack: (tabId: number) => void
  goForward: (tabId: number) => void

  onCloseTab: (cb: (tabId: number) => void) => void

  onTabUrlChange: (cb: (tabId: number, url: string) => void) => void
  onTabFaviconChange: (cb: (tabId: number, favicon: string) => void) => void
  onTabTitleChange: (cb: (tabId: number, title: string) => void) => void
  onTabLoadingChange: (cb: (tabId: number, loading: boolean) => void) => void
  onTabCanBackAndForwardChange: (cb: (tabId: number, canBack: boolean, canForward: boolean) => void) => void
}

export const tabsAPI: TabAPI = {
  addTab: (url: string) => {
    return ipcRenderer.invoke('tab:addTab', url)
  },
  setSelectedTab: (tabId: number) => {
    return ipcRenderer.invoke('tab:setSelectedTab', tabId)
  },
  closeTab: (tabId: number) => {
    return ipcRenderer.invoke('tab:closeTab', tabId)
  },
  refreshTab: (tabId: number) => {
    return ipcRenderer.invoke('tab:refreshTab', tabId)
  },
  goBack: (tabId: number) => {
    return ipcRenderer.invoke('tab:goBack', tabId)
  },
  goForward: (tabId: number) => {
    return ipcRenderer.invoke('tab:goForward', tabId)
  },
  onCloseTab: (cb: (tabId: number) => void) => {
    return ipcRenderer.on('tab:closeTab', (_, tabId: number) => {
      cb(tabId)
    })
  },

  onTabUrlChange: (cb: (tabId: number, url: string) => void) => {
    return ipcRenderer.on('tab:urlChange', (_, tabId: number, url: string) => {
      cb(tabId, url)
    })
  },
  onTabFaviconChange: (cb: (tabId: number, favicon: string) => void) => {
    return ipcRenderer.on('tab:faviconChange', (_, tabId: number, favicon: string) => {
      cb(tabId, favicon)
    })
  },
  onTabTitleChange: (cb: (tabId: number, title: string) => void) => {
    return ipcRenderer.on('tab:titleChange', (_, tabId: number, title: string) => {
      cb(tabId, title)
    })
  },
  onTabLoadingChange: (cb: (tabId: number, loading: boolean) => void) => {
    return ipcRenderer.on('tab:loadingChange', (_, tabId: number, loading: boolean) => {
      cb(tabId, loading)
    })
  },
  onTabCanBackAndForwardChange: (cb: (tabId: number, canBack: boolean, canForward: boolean) => void) => {
    return ipcRenderer.on('tab:canBackAndForwardChange', (_, tabId: number, canBack: boolean, canForward: boolean) => {
      cb(tabId, canBack, canForward)
    })
  }
}
