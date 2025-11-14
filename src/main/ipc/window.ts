import { BaseWindow, ipcMain } from 'electron'

export const registerWindowIpcHandlers = (mainWindow: BaseWindow): void => {
  ipcMain.handle('window:action:minimize', () => mainWindow.minimize())
  ipcMain.handle('window:action:maximize', () => mainWindow.maximize())
  ipcMain.handle('window:action:unmaximize', () => mainWindow.unmaximize())
  ipcMain.handle('window:action:close', () => mainWindow.close())
}
