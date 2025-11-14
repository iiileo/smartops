import { ipcRenderer } from 'electron'

export interface WindowAPI {
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
  minimize: () => void
  maximize: () => void
  unmaximize: () => void
  close: () => void
}

export const windowAPI: WindowAPI = {
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
  minimize: () => {
    return ipcRenderer.invoke('window:action:minimize')
  },
  maximize: () => {
    return ipcRenderer.invoke('window:action:maximize')
  },
  unmaximize: () => {
    return ipcRenderer.invoke('window:action:unmaximize')
  },
  close: () => {
    return ipcRenderer.invoke('window:action:close')
  }
}
