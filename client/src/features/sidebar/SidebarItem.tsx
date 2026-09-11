import { NavLink } from "react-router";

interface SidebarItemProps {
    to: string
    label: string
    collapsed: boolean
}

export function SidebarItem({ to, label, collapsed }: SidebarItemProps) {
    return (
      <li>
        <NavLink
          to={to}
          className={({ isActive }) =>`flex items-center gap-2 rounded px-2 py-1.5 text-sm transition-colors ${
            isActive
              ? 'bg-(--color-accent) text-white'
              : 'text-(--color-text-muted) hover:bg-(--color-bg-elevated) hover:text-(--color-text)'
          }`}
          aria-label={collapsed ? label : undefined}
        >
          <span aria-hidden="true">●</span>
          {!collapsed && <span>{label} </span>}
        </NavLink>
      </li>
    )
}