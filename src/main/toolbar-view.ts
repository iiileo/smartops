import { WebContentsView } from 'electron'
import path from 'path'
import { getBackgroundColor, getMainWindow } from './main-window'
import { route } from './utils'

let toolbarView: WebContentsView | null = null

const TOOLBAR_VIEW_HEIGHT = 80

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
    toolbarView.setBackgroundColor(getBackgroundColor())
    toolbarView.setBounds({
      x: 0,
      y: 0,
      width: mainWindow.getContentBounds().width,
      height: TOOLBAR_VIEW_HEIGHT
    })

    // 监听 resize
    mainWindow.on('resize', () => {
      const { width } = mainWindow.getContentBounds()
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

export function setToolbarViewBounds(): void {
  const mainWindow = getMainWindow()
  if (mainWindow === null) {
    return
  }
  const { width } = mainWindow.getContentBounds()
  if (toolbarView === null) {
    return
  }
  toolbarView.setBounds({
    x: 0,
    y: 0,
    width: width,
    height: TOOLBAR_VIEW_HEIGHT
  })
}

export function getToolbarViewHeight(): number {
  return TOOLBAR_VIEW_HEIGHT
}

export function getToolbarView(): WebContentsView | null {
  return toolbarView
}
