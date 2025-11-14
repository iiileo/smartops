import { ipcMain } from 'electron'
import { addTab, closeTab, setSelectedTab } from '../tabs'

export const registerTabsIpcHandlers = (): void => {
  ipcMain.handle('tab:addTab', (_, url: string) => addTab(url))
  ipcMain.handle('tab:setSelectedTab', (_, id: number) => setSelectedTab(id))
  ipcMain.handle('tab:closeTab', (_, id: number) => closeTab(id))
}
