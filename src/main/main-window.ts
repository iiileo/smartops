import { is } from '@electron-toolkit/utils'
import { app, BaseWindow } from 'electron'
import { addTab } from './tab'
import { initTabIpcHandlers } from './tab-handles'
import { createToolbarView } from './toolbar-view'
import { route } from './utils'

let mainWindow: BaseWindow | null = null

const BASE_MIN_WIDTH = 1000
const BASE_MIN_HEIGHT = 700
const contentBackgroundColor = '#ffffff'

// 初始化 main window
export async function initializeMainWindow(): Promise<void> {
  mainWindow = new BaseWindow({
    width: BASE_MIN_WIDTH,
    height: BASE_MIN_HEIGHT,
    minWidth: BASE_MIN_WIDTH,
    minHeight: BASE_MIN_HEIGHT,
    show: false,
    autoHideMenuBar: true,
    frame: false,
    titleBarStyle: 'hiddenInset',
    // 红绿灯大小
    trafficLightPosition: {
      x: 14,
      y: 14
    }
  })

  // todo: 初始化ipc
  initTabIpcHandlers()
  // 窗口改变

  setupMainWindowEventHandlers()

  const toolbarView = await createToolbarView()
  // default atb
  const defaultTabView = await addTab(route('/default'))
  if (defaultTabView === null) {
    throw new Error('Failed to create default tab view')
  }
  if (toolbarView === null) {
    throw new Error('Failed to create toolbar view')
  }

  mainWindow.contentView.addChildView(toolbarView)
  // 添加 content view
  // todo: 123

  mainWindow.on('close', () => {
    console.log('close')
    // mainWindow 关闭
    // mainWindow?.close()
    mainWindow?.destroy()
    mainWindow = null
  })

  mainWindow.on('maximize', () => {
    console.log('maximize')
    toolbarView.webContents.send('window:maximize')
  })
  mainWindow.on('unmaximize', () => {
    console.log('unmaximize')
    toolbarView.webContents.send('window:unmaximize')
  })
  mainWindow.on('minimize', () => {
    console.log('minimize')
    toolbarView.webContents.send('window:minimize')
  })
  mainWindow.on('restore', () => {
    console.log('restore')
    toolbarView.webContents.send('window:restore')
  })
  mainWindow.on('enter-full-screen', () => {
    console.log('enter-full-screen')
    toolbarView.webContents.send('window:enterFullScreen')
  })
  mainWindow.on('leave-full-screen', () => {
    console.log('leave-full-screen')
    toolbarView.webContents.send('window:leaveFullScreen')
  })

  mainWindow.setTitle('')

  showMainWindow()

  // toolbar show devtool
  toolbarView.webContents.openDevTools({
    mode: 'detach'
  })
}

function setupMainWindowEventHandlers(): void {
  app.on('activate', () => {
    // 如果窗口已经存在
    if (mainWindow !== null) {
      showMainWindow()
      return
    }
    console.log('activate main window')
    initializeMainWindow()
  })
}

export function showMainWindow(): void {
  if (!mainWindow) {
    return
  }
  if (!is.dev && !process.env['ELECTRON_RENDERER_URL']) {
    mainWindow!.show()
    return
  }

  if (!mainWindow.isVisible()) {
    mainWindow!.show()
  }
}

// 获取 main window
export function getMainWindow(): BaseWindow {
  if (!mainWindow) {
    throw new Error('Main window not initialized')
  }
  return mainWindow
}

// 获取默认的页面背景色
export function getBackgroundColor(): string {
  return contentBackgroundColor
}
