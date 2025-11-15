import { ipcMain } from 'electron'
import { addTab, closeTab, goBack, goForward, navigateToUrl, refreshTab, setSelectedTab } from '../tabs'

export const registerTabsIpcHandlers = (): void => {
  ipcMain.handle('tab:addTab', (_, url: string) => addTab(url))
  ipcMain.handle('tab:setSelectedTab', (_, id: number) => setSelectedTab(id))
  ipcMain.handle('tab:closeTab', (_, id: number) => closeTab(id))
  ipcMain.handle('tab:refreshTab', (_, id: number) => refreshTab(id))
  ipcMain.handle('tab:goBack', (_, id: number) => goBack(id))
  ipcMain.handle('tab:goForward', (_, id: number) => goForward(id))
  ipcMain.handle('tab:navigateToUrl', (_, id: number, url: string) => navigateToUrl(id, url))
}
