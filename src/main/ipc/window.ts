import { BaseWindow, ipcMain } from 'electron'

export const registerWindowIpcHandlers = (mainWindow: BaseWindow): void => {
  ipcMain.handle('window:action:minimize', () => {
    console.log('minimize')
    mainWindow.minimize()
  })
  ipcMain.handle('window:action:maximize', () => {
    console.log('maximize')
    mainWindow.maximize()
  })
  ipcMain.handle('window:action:unmaximize', () => {
    console.log('unmaximize')
    mainWindow.unmaximize()
  })
  ipcMain.handle('window:action:close', () => {
    console.log('close')
    mainWindow.close()
  })
}
