import useTabStore from '@renderer/stores/useTabStore'

const SearchBar: React.FC = (): React.ReactElement => {
  const searchValue = useTabStore((state) => state.searchValue)
  const setSearchValue = useTabStore((state) => state.setSearchValue)
  const setSearchFocused = useTabStore((state) => state.setSearchFocused)

  return (
    <input
      type="text"
      className="h-full w-full outline-none border flex-1 px-[12px] rounded-full bg-gray-100 border-gray-200 text-sm text-gray-700"
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
  )
}

export default SearchBar
