import SearchBar from '@renderer/components/search-bar/SearchBar'
import SearchBarControls from '@renderer/components/search-bar/SearchBarControls'
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

  const renderToolbar = (): React.ReactNode => {
    return (
      <div className={cn('h-[40px] w-full bg-blue-100 flex items-center')}>
        <Tabbar />
        {/* spacer */}
        <div className="w-[90px]"></div>
        {isWindow && <WindowControls />}
      </div>
    )
  }
  const renderSearchBar = (): React.ReactNode => {
    return (
      <div className="h-[40px] w-full bg-white flex items-center border-b border-gray-200 px-[12px] search-bar-view py-[4px] gap-[8px] box-border">
        {/* 控制器 */}
        <SearchBarControls />
        {/* 搜索栏 */}
        <SearchBar />
      </div>
    )
  }
  return (
    <div className="h-screen w-screen toolbar-view">
      {renderToolbar()}
      {renderSearchBar()}
    </div>
  )
}
