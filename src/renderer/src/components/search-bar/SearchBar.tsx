import useTabStore from '@renderer/stores/useTabStore'

const SearchBar: React.FC = (): React.ReactElement => {
  const selectedTab = useTabStore((state) => state.selectedTab)
  const searchValue = useTabStore((state) => state.searchValue)
  const setSearchValue = useTabStore((state) => state.setSearchValue)
  const setSearchFocused = useTabStore((state) => state.setSearchFocused)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    if (searchValue.trim() && selectedTab) {
      window.tabs.navigateToUrl(selectedTab.id, searchValue)
    }
  }

  return (
    <form
      className="h-full flex-1 bg-blue-50 flex items-center gap-[4px] box-border px-[12px] rounded"
      onSubmit={handleSubmit}
    >
      <div className="h-[18px] flex items-center justify-center bg-blue-200 border border-blue-300 rounded">
        <span className="text-xs text-blue-500 px-[4px]">安全</span>
      </div>
      <input
        type="text"
        className="outline-none flex-1 text-sm text-gray-900 placeholder:text-gray-400 placeholder:text-xs"
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e.target.value)
        }}
        onFocus={() => {
          setSearchFocused(true)
        }}
        onBlur={() => {
          setSearchFocused(false)
        }}
        disabled={selectedTab?.id === -1}
        placeholder="搜索或输入网址"
      />
    </form>
  )
}

export default SearchBar
