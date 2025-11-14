import { ElectronAPI } from '@electron-toolkit/preload'
import { TabAPI } from './tabs'
declare global {
  interface Window {
    electron: ElectronAPI
    tabs: TabAPI
  }
}
