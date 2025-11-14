import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/default')({
  component: DefaultComponent
})

function DefaultComponent(): React.ReactNode {
  return <div>Hello &#34;/default&#34;!</div>
}
