import { WebContentsView } from 'electron'
import { join } from 'path'
import { getBackgroundColor } from './main-window'
import { getRootUrl, route } from './utils'

const tabs: WebContentsView[] = []
const selectedTab: WebContentView | null

export async function createContentTab(url: string): Promise<WebContentsView | null> {
  return new Promise((reslove) => {
    const view = new WebContentsView({
      webPreferences: {
        sandbox: false,
        preload: join(__dirname, '../preload/index.js')
      }
    })

    // todo: 监听 view的事件传给 toolbar 比如 标题改变 url改变 title改变

    view.setBackgroundColor(getBackgroundColor())
    tabs.push(view)

    view.webContents.loadURL(url)
    return reslove(view)
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
  return view.webContents.id
}
