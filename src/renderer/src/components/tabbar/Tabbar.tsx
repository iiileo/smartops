import Tab from './Tab'

const Tabbar = (): React.ReactNode => {
  return (
    <div className="h-full w-full flex items-center gap-[4px]">
      <Tab active />
      <Tab />
    </div>
  )
}

export default Tabbar
