import { WebContentsView } from 'electron'
import path from 'path'
import { getBackgroundStyle, getMainWindow } from './main-window'
import { route } from './utils'

let toolbarView: WebContentsView | null = null

const TOOLBAR_VIEW_HEIGHT = 40

export function createToolbarView(): Promise<WebContentsView | null> {
  return new Promise((resolve) => {
    if (toolbarView !== null) {
      return resolve(toolbarView)
    }

    const mainWindow = getMainWindow()
    if (mainWindow === null) {
      return resolve(null)
    }

    toolbarView = new WebContentsView({
      webPreferences: {
        sandbox: false,
        preload: path.join(__dirname, '../preload/index.js')
      }
    })

    // 设置 view
    toolbarView.setBackgroundColor(getBackgroundStyle())
    toolbarView.setBounds({
      x: 0,
      y: 0,
      width: mainWindow.getBounds().width,
      height: TOOLBAR_VIEW_HEIGHT
    })

    // 监听 resize
    mainWindow.on('resize', () => {
      const { width } = mainWindow.getBounds()
      if (toolbarView === null) {
        return
      }
      toolbarView.setBounds({
        x: 0,
        y: 0,
        width: width,
        height: TOOLBAR_VIEW_HEIGHT
      })
    })

    // 加载 view
    toolbarView.webContents.loadURL(route('/toolbar'))

    // toolbar加载成功返回 toolbarView
    toolbarView.webContents.on('did-finish-load', () => {
      resolve(toolbarView)
    })

    // 加载失败返回 null
    toolbarView.webContents.on('did-fail-load', () => resolve(null))
  })
}
