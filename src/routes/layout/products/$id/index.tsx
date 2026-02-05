import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/layout/products/$id/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/products/$id/"!</div>
}
