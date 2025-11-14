import { Tabbar } from '@renderer/components/tabbar'
import WindowControls from '@renderer/components/WindowControls'
import useTabChange from '@renderer/hooks/useTabChange'
import { useWindowChange } from '@renderer/hooks/useWindowChange'
import { cn } from '@renderer/utils/cn'
import { createLazyFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createLazyFileRoute('/toolbar')({
  component: ToolbarComponent
})

function ToolbarComponent(): React.ReactNode {
  useWindowChange()
  useTabChange()
  // const isMacOs = process.platform === 'darwin'
  const [platform] = useState(window.electron.process.platform)

  const isWindow = platform === 'win32'

  const Toolbar = (): React.ReactNode => {
    return (
      <div className={cn('h-full w-full bg-blue-100 flex items-center')}>
        <Tabbar />
        {/* spacer */}
        <div className="w-[90px]"></div>
        {isWindow && <WindowControls />}
      </div>
    )
  }
  return (
    <div className="h-screen w-screen toolbar-view">
      <Toolbar />
    </div>
  )
}
