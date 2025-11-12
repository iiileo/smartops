import { is } from '@electron-toolkit/utils'
import { join } from 'path'
import url from 'url'

export function getRootUrl(): string {
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    return process.env['ELECTRON_RENDERER_URL']! + '#'
  } else {
    return (
      url.format({
        pathname: join(__dirname, '../renderer/index.html'),
        protocol: 'file:',
        slashes: true
      }) + '#'
    )
  }
}

export function route(r: string): string {
  return getRootUrl() + r
}
