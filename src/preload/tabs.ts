import { ipcRenderer } from 'electron'

export interface TabAPI {
  addTab: (url: string) => Promise<number>
  setSelectedTab: (tabId: number) => void
  closeTab: (tabId: number) => void
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
  }
}
