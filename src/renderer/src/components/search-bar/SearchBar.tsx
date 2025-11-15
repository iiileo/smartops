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
    <form className="h-full flex-1" onSubmit={handleSubmit}>
      <input
        type="text"
        className="w-full outline-none border flex-1 px-[12px] rounded-full bg-gray-100 border-gray-100 text-sm text-gray-700"
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
      />
    </form>
  )
}

export default SearchBar
