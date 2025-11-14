export interface Tab {
  id: number
  title: string
  closeable: boolean
  favicon?: string
  url?: string
  loading?: boolean
  canBack?: boolean
  canForward?: boolean
  meta?: Record<string, unknown>
}
