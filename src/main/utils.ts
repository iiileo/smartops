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

export async function faviconToBase64(favicon: string): Promise<string> {
  const response = await fetch(favicon, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      Referer: favicon
    },
    method: 'GET'
  })
  const arrayBuffer = await response.arrayBuffer()
  const base64 = Buffer.from(arrayBuffer).toString('base64')
  return `data:image/png;base64,${base64}`
}
