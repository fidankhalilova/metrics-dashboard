import { LayoutGrid } from '../../features/layout-grid/LayoutGrid'
import { DebugPanel } from '../../features/debug/DebugPanel'
import { ThemeToggle } from '../../features/theme/ThemeToggle'

export default function DashboardPage() {
  return (
    <div className="p-4 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <h1 className="text-xl font-semibold text-(--color-text)">Dashboard</h1>
        <ThemeToggle />
      </div>

      <div className="mb-4">
        <DebugPanel />
      </div>

      <div className="overflow-x-auto -mx-2 px-2">
        <LayoutGrid />
      </div>
    </div>
  )
}