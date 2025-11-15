import { shell, WebContentsView } from 'electron'
import { join } from 'path'
import { getBackgroundColor, getMainWindow } from './main-window'
import { getToolbarView, getToolbarViewHeight, setToolbarViewBounds } from './toolbar-view'
import { faviconToBase64, route } from './utils'

const tabs: WebContentsView[] = []
let selectedTab: WebContentsView | null = null

export async function createContentTab(url: string): Promise<WebContentsView | null> {
  return new Promise((resolve) => {
    const view = new WebContentsView({
      webPreferences: {
        sandbox: false,
        preload: join(__dirname, '../preload/index.js')
      }
    })

    const toolbarView = getToolbarView()

    // 涉及打开 就使用外部浏览器
    view.webContents.setWindowOpenHandler((details) => {
      console.log('setWindowOpenHandler', details.url)
      shell.openExternal(details.url)
      return { action: 'deny' }
    })

    view.webContents.on('did-finish-load', () => {
      resolve(view)
    })
    view.webContents.on('did-fail-load', () => {
      resolve(null)
    })

    // URL 改变
    view.webContents.on('did-navigate', (_, url) => {
      console.log('did-navigate', url)
      toolbarView?.webContents.send('tab:urlChange', view.webContents.id, url)
    })
    view.webContents.on('did-navigate-in-page', (_, url) => {
      console.log('did-navigate-in-page', url)
      toolbarView?.webContents.send('tab:urlChange', view.webContents.id, url)
    })
    view.webContents.on('will-navigate', (_, url) => {
      console.log('will-navigate', url)
      toolbarView?.webContents.send('tab:urlChange', view.webContents.id, url)
    })
    // =====
    // 加载状态改变
    view.webContents.on('did-start-loading', () => {
      toolbarView?.webContents.send('tab:loadingChange', view.webContents.id, true)
    })
    view.webContents.on('did-stop-loading', () => {
      toolbarView?.webContents.send('tab:loadingChange', view.webContents.id, false)
    })
    // =====
    // 标题改变
    view.webContents.on('page-title-updated', (_, title) => {
      toolbarView?.webContents.send('tab:titleChange', view.webContents.id, title)
    })
    // =====
    // favicon改变
    view.webContents.on('page-favicon-updated', async (_, favicon) => {
      console.log('page-favicon-updated', favicon)
      if (favicon.length > 0) {
        const url = favicon[favicon.length - 1]
        const base64 = await faviconToBase64(url)
        toolbarView?.webContents.send('tab:faviconChange', view.webContents.id, base64)
      } else {
        toolbarView?.webContents.send('tab:faviconChange', view.webContents.id, '')
      }
    })
    // =====

    view.setBackgroundColor(getBackgroundColor())
    tabs.push(view)

    view.webContents.loadURL(url)
    return resolve(view)
  })
}

export async function addTab(url?: string): Promise<number | null> {
  if (!url) {
    url = route('/default')
  }
  const view = await createContentTab(url)
  if (!view) {
    return null
  }
  setSelectedTab(view.webContents.id)
  return view.webContents.id
}

export function setSelectedTab(tabId: number): void {
  let view: WebContentsView | undefined = undefined
  if (tabId === -1) {
    view = tabs[0] as WebContentsView
  } else {
    view = tabs.find((tab) => tab.webContents.id === tabId)
  }
  if (view === undefined) {
    return
  }
  const mainWindow = getMainWindow()
  if (mainWindow === null) {
    return
  }

  function setViewBounds(): void {
    // 获取可用区域宽度
    const { width } = mainWindow.getContentBounds()
    if (view === undefined) {
      return
    }
    view.setBounds({
      x: 0,
      y: getToolbarViewHeight(),
      width: width,
      height: mainWindow.contentView.getBounds().height - getToolbarViewHeight()
    })
  }

  mainWindow.removeAllListeners('resize')
  mainWindow.on('resize', () => {
    setToolbarViewBounds()
    setViewBounds()
  })
  setViewBounds()

  view.setBackgroundColor(getBackgroundColor())
  if (selectedTab) {
    mainWindow.contentView.removeChildView(selectedTab)
  }
  mainWindow.contentView.addChildView(view)
  selectedTab = view
}

export function closeTab(tabId: number): void {
  const view = tabs.find((tab) => tab.webContents.id === tabId)
  if (!view) {
    return
  }
  const mainWindow = getMainWindow()
  if (mainWindow === null) {
    return
  }

  if (selectedTab && selectedTab.webContents.id === tabId) {
    const tabIndex = tabs.findIndex((tab) => tab.webContents.id === tabId)
    // 1、如果右侧有就设置选中右侧的
    // 2、如果右侧没有就设置选中左侧的
    if (tabIndex < tabs.length - 1) {
      setSelectedTab(tabs[tabIndex + 1].webContents.id)
    } else if (tabIndex > 0) {
      setSelectedTab(tabs[tabIndex - 1].webContents.id)
    } else {
      setSelectedTab(tabs[0].webContents.id)
    }
  }

  mainWindow.contentView.removeChildView(view)
  view.webContents.close()
  tabs.splice(tabs.indexOf(view), 1)
}

export function refreshTab(tabId: number): void {
  const view = tabs.find((tab) => tab.webContents.id === tabId)
  if (!view) {
    return
  }
  view.webContents.reload()
}

export function goBack(tabId: number): void {
  const view = tabs.find((tab) => tab.webContents.id === tabId)
  if (!view) {
    return
  }
  view.webContents.navigationHistory.goBack()
}

export function goForward(tabId: number): void {
  const view = tabs.find((tab) => tab.webContents.id === tabId)
  if (!view) {
    return
  }
  view.webContents.navigationHistory.goForward()
}

export function getTabs(): WebContentsView[] {
  return tabs
}

export function getSelectedTab(): WebContentsView | null {
  return selectedTab
}

export function clearSelectedTab(): void {
  selectedTab = null
}
