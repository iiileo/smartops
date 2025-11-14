import { ipcRenderer } from 'electron'

export interface TabAPI {
  onMinimize: (cb: () => void) => void
  onRestore: (cb: () => void) => void
  onMaximize: (cb: () => void) => void
  onUnmaximize: (cb: () => void) => void
  onEnterFullScreen: (cb: () => void) => void
  onLeaveFullScreen: (cb: () => void) => void
  offMinimize: () => void
  offRestore: () => void
  offMaximize: () => void
  offUnmaximize: () => void
  offEnterFullScreen: () => void
  offLeaveFullScreen: () => void
  addTab: (url: string) => Promise<number>
  setSelectedTab: (tabId: number) => void
  closeTab: (tabId: number) => void
}

export const tabsAPI: TabAPI = {
  onMinimize: (cb: () => void) => {
    return ipcRenderer.on('window:minimize', cb)
  },
  onRestore: (cb: () => void) => {
    return ipcRenderer.on('window:restore', cb)
  },
  onMaximize: (cb: () => void) => {
    return ipcRenderer.on('window:maximize', cb)
  },
  onUnmaximize: (cb: () => void) => {
    return ipcRenderer.on('window:unmaximize', cb)
  },
  onEnterFullScreen: (cb: () => void) => {
    return ipcRenderer.on('window:enterFullScreen', cb)
  },
  onLeaveFullScreen: (cb: () => void) => {
    return ipcRenderer.on('window:leaveFullScreen', cb)
  },
  offMinimize: () => {
    return ipcRenderer.removeAllListeners('window:minimize')
  },
  offRestore: () => {
    return ipcRenderer.removeAllListeners('window:restore')
  },
  offMaximize: () => {
    return ipcRenderer.removeAllListeners('window:maximize')
  },
  offUnmaximize: () => {
    return ipcRenderer.removeAllListeners('window:unmaximize')
  },
  offEnterFullScreen: () => {
    return ipcRenderer.removeAllListeners('window:enterFullScreen')
  },
  offLeaveFullScreen: () => {
    return ipcRenderer.removeAllListeners('window:leaveFullScreen')
  },
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
