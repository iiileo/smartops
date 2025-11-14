import { WebContentsView } from 'electron'
import { join } from 'path'
import { getBackgroundColor, getMainWindow } from './main-window'
import { route } from './utils'
import { getToolbarViewHeight, setToolbarViewBounds } from './toolbar-view'

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

    view.webContents.on('did-finish-load', () => {
      resolve(view)
    })
    view.webContents.on('did-fail-load', () => {
      resolve(null)
    })

    // todo: 监听 view的事件传给 toolbar 比如 标题改变 url改变 title改变

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
    const { width } = mainWindow.getBounds()
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
