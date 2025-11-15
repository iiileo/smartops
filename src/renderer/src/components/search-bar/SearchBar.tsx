import useTabStore from '@renderer/stores/useTabStore'

const SearchBar: React.FC = (): React.ReactElement => {
  const selectedTab = useTabStore((state) => state.selectedTab)

  return (
    <input
      type="text"
      className="h-full w-full outline-none border flex-1 px-[12px] rounded-full bg-gray-100 border-gray-200 text-sm text-gray-700"
      value={selectedTab?.url}
    />
  )
}

export default SearchBar
