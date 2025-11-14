export interface Tab {
  id: number
  icon: string
  title: string
  closeable: boolean
  meta?: Record<string, unknown>
}
