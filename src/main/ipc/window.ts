import { BaseWindow, ipcMain, Menu } from 'electron'

export const registerWindowIpcHandlers = (mainWindow: BaseWindow): void => {
  ipcMain.handle('window:action:minimize', () => {
    console.log('minimize')
    // mainWindow.minimize()

    const menu = Menu.buildFromTemplate([
      {
        label: '最小化',
        click: () => {
          mainWindow.minimize()
        }
      }
    ])
    menu.popup()
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
