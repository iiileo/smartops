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

/**
 * 获取图标的 MIME 类型
 * @param contentType - 响应头中的 Content-Type
 * @param url - 图标的 URL
 * @returns MIME 类型
 */
function getIconMimeType(contentType: string | null, url: string): string {
  // 优先使用 Content-Type
  if (contentType) {
    const mimeType = contentType.split(';')[0].trim()
    if (mimeType.startsWith('image/')) {
      return mimeType
    }
  }

  // 从 URL 扩展名推断 MIME 类型
  const extension = url.split('.').pop()?.toLowerCase().split('?')[0].split('#')[0]
  
  const mimeTypeMap: Record<string, string> = {
    'ico': 'image/x-icon',
    'icon': 'image/x-icon',
    'svg': 'image/svg+xml',
    'png': 'image/png',
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'gif': 'image/gif',
    'webp': 'image/webp',
    'bmp': 'image/bmp'
  }

  return mimeTypeMap[extension || ''] || 'image/png'
}

/**
 * 将 favicon URL 转换为 base64 data URL
 * 支持多种图标格式：ico, svg, png, jpg, gif, webp 等
 */
export async function faviconToBase64(favicon: string): Promise<string> {
  try {
    const response = await fetch(favicon, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        Referer: favicon
      },
      method: 'GET'
    })

    if (!response.ok) {
      console.error(`Failed to fetch favicon: ${response.status} ${response.statusText}`)
      return ''
    }

    const contentType = response.headers.get('content-type')
    const mimeType = getIconMimeType(contentType, favicon)
    
    const arrayBuffer = await response.arrayBuffer()
    const base64 = Buffer.from(arrayBuffer).toString('base64')
    
    return `data:${mimeType};base64,${base64}`
  } catch (error) {
    console.error('Error converting favicon to base64:', error)
    return ''
  }
}
