import { useId } from "react"
import { useSidebarState } from "./useSidebarState"
import { SidebarItem } from "./SidebarItem"

const NAV_ITEMS = [
    { to: '/', label: 'Dashboard' },
    { to: '/settings', label: 'Settings' }
]

export function Sidebar() {
    const { collapsed, toggle } = useSidebarState()
    const navId = useId()

  return (
    <div
      className="flex h-screen flex-col border-r border-(--color-border) bg-(--color-bg-alt) p-3"
      style={{ width: collapsed ? 56 : 200 }}
    >
      <button
        type="button"
        onClick={toggle}
        aria-expanded={!collapsed}
        aria-controls={navId}
      >
        {collapsed ? "»" : "« Collapse"}
      </button>

      <nav aria-label="Main navigation" id={navId}>
        <ul className="flex flex-col gap-1">
          {NAV_ITEMS.map((item) => (
            <SidebarItem
              key={item.to}
              to={item.to}
              label={item.label}
              collapsed={collapsed}
            />
          ))}
        </ul>
      </nav>
    </div>
  );
}
