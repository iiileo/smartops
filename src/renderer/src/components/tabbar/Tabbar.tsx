import Tab from './Tab'

const Tabbar = (): React.ReactNode => {
  return (
    <div className="h-full flex-1 flex items-center gap-[4px] box-border">
      <Tab arrowClose={false} />
      <Tab />
      <Tab />
      <Tab />
      <Tab />
      <Tab />
      <Tab />
      <Tab />
      <Tab />
      <Tab active />
    </div>
  )
}

export default Tabbar
