import { is } from '@electron-toolkit/utils'
import { app, BaseWindow, screen } from 'electron'
import { registerTabsIpcHandlers } from './ipc/tabs'
import { registerWindowIpcHandlers } from './ipc/window'
import { addTab, getSelectedTab, getTabs } from './tabs'
import { createToolbarView } from './toolbar-view'
import { route } from './utils'

let mainWindow: BaseWindow | null = null
let isQuitting = false
let isAppActivateListenerRegistered = false

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
  registerTabsIpcHandlers()
  registerWindowIpcHandlers(mainWindow)
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

  mainWindow.on('close', (event) => {
    console.log('close')
    // 在 macOS 上，关闭窗口时隐藏而不是销毁
    if (process.platform === 'darwin' && !isQuitting) {
      event.preventDefault()
      // 如果窗口处于全屏状态，先退出全屏再隐藏
      if (mainWindow?.isFullScreen()) {
        // 监听退出全屏事件，退出后再隐藏窗口
        const handleLeaveFullScreen = (): void => {
          mainWindow?.hide()
          mainWindow?.removeListener('leave-full-screen', handleLeaveFullScreen)
        }
        mainWindow.once('leave-full-screen', handleLeaveFullScreen)
        mainWindow.setFullScreen(false)
      } else {
        mainWindow?.hide()
      }
    } else {
      closeMainWindow(mainWindow!)
    }
  })

  mainWindow.on('maximize', () => {
    const workArea = screen.getPrimaryDisplay().workArea // 可用区域（不会被任务栏覆盖）
    mainWindow?.setBounds({
      x: workArea.x,
      y: workArea.y,
      width: workArea.width,
      height: workArea.height
    })
    toolbarView.webContents.send('window:maximize')
  })
  mainWindow.on('unmaximize', () => {
    toolbarView.webContents.send('window:unmaximize')
  })
  mainWindow.on('minimize', () => {
    toolbarView.webContents.send('window:minimize')
  })
  mainWindow.on('restore', () => {
    mainWindow?.focus()
    toolbarView.webContents.send('window:restore')
  })
  mainWindow.on('enter-full-screen', () => {
    toolbarView.webContents.send('window:enterFullScreen')
  })
  mainWindow.on('leave-full-screen', () => {
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
  // 只注册一次 app 级别的事件监听器
  if (!isAppActivateListenerRegistered) {
    // macOS 上点击 Dock 图标时重新显示窗口
    app.on('activate', () => {
      // 如果窗口已经存在但被隐藏，显示它
      if (mainWindow !== null) {
        showMainWindow()
        return
      }
      // 如果窗口已经被销毁，重新创建
      console.log('activate main window')
      initializeMainWindow()
    })

    // 应用退出前设置标志
    app.on('before-quit', () => {
      isQuitting = true
    })

    isAppActivateListenerRegistered = true
  }
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

function closeMainWindow(mainWin: BaseWindow): void {
  // 关闭所有窗口
  const tabs = getTabs()
  tabs.forEach((tab) => {
    tab.webContents.close()
  })
  const selectedTab = getSelectedTab()
  if (selectedTab) {
    mainWin.contentView.removeChildView(selectedTab)
  }
  // 关闭所有 tabs
  mainWin.destroy()
  mainWindow = null
}
