export interface Tab {
  id: string | number
  icon: string
  title: string
  closeable: boolean
  meta?: Record<string, unknown>
}
