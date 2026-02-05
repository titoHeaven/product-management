import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/layout/products/new')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/products/new"!</div>
}
