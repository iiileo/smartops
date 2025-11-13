import useTabStore from '@renderer/stores/useTabStore'
import { Plus } from 'lucide-react'

const AddTab = (): React.ReactNode => {
  const addTab = useTabStore((state) => state.addTab)
  return (
    <div className="ml-[2px] hover:bg-blue-200 duration-200 rounded-full p-[4px] toolbar-tab-button" onClick={addTab}>
      <Plus size={16} />
    </div>
  )
}

export default AddTab
