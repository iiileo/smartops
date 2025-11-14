import { electronApp } from '@electron-toolkit/utils'
import { app } from 'electron'
import { initializeMainWindow } from './main-window'

process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true'
app.commandLine.appendSwitch('disable-logging')
app.commandLine.appendSwitch('log-level', '3')
app.commandLine.appendSwitch('disable-features', 'CalculateNativeWinOcclusion')
app.commandLine.appendSwitch('ignore-certificate-errors', 'true')

app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.iiileo.smartops')
  // IPC test

  initializeMainWindow()
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
