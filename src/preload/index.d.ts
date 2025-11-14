import { ElectronAPI } from '@electron-toolkit/preload'
import { TabAPI } from './tabs'
import { WindowAPI } from './window'
declare global {
  interface Window {
    electron: ElectronAPI
    tabs: TabAPI
    win: WindowAPI
  }
}
