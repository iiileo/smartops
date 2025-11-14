import { electronAPI } from '@electron-toolkit/preload'
import { contextBridge } from 'electron'
import { tabsAPI } from './tabs'
import { windowAPI } from './window'

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('tabs', tabsAPI)
    contextBridge.exposeInMainWorld('win', windowAPI)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.tabs = tabsAPI
  // @ts-ignore (define in dts)
  window.win = windowAPI
}
