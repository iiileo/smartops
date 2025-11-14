import useTabStore from '@renderer/stores/useTabStore'
import { useEffect } from 'react'

const useTabChange = (): void => {
  const setTabUrl = useTabStore((state) => state.setTabUrl)
  const setTabFavicon = useTabStore((state) => state.setTabFavicon)
  const setTabTitle = useTabStore((state) => state.setTabTitle)
  const setTabLoading = useTabStore((state) => state.setTabLoading)
  const setTabCanBackAndForward = useTabStore((state) => state.setTabCanBackAndForward)
  useEffect(() => {
    window.tabs.onTabUrlChange((tabId, url) => {
      setTabUrl(tabId, url)
    })
    window.tabs.onTabFaviconChange((tabId, favicon) => {
      setTabFavicon(tabId, favicon)
    })
    window.tabs.onTabTitleChange((tabId, title) => {
      setTabTitle(tabId, title)
    })
    window.tabs.onTabLoadingChange((tabId, loading) => {
      setTabLoading(tabId, loading)
    })
    window.tabs.onTabCanBackAndForwardChange((tabId, canBack, canForward) => {
      setTabCanBackAndForward(tabId, canBack, canForward)
    })
  }, [setTabUrl, setTabFavicon, setTabTitle, setTabLoading, setTabCanBackAndForward])
}

export default useTabChange
