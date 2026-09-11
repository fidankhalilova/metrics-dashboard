import { useRef } from "react";
import type { LayoutItem } from "../../state/types";
import { gridToPixels, computeSnappedPosition, GRID_COLUMNS, GRID_ROWS } from "./gridMath";
import { MetricCard } from "../metric-cards/MetricCard";

interface WidgetProps {
  item: LayoutItem;
  onMove: (id: string, x: number, y: number) => void;
}

export function Widget({ item, onMove }: WidgetProps) {
  const dragStart = useRef<{ pointerX: number; pointerY: number } | null>(null);
  const { left, top, width, height } = gridToPixels(item);

  const handlePointerDown = (e: React.PointerEvent) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    dragStart.current = { pointerX: e.clientX, pointerY: e.clientY };
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!dragStart.current) return;

    const deltaX = e.clientX - dragStart.current.pointerX;
    const deltaY = e.clientY - dragStart.current.pointerY;

    const { x, y } = computeSnappedPosition(
      item.x,
      item.y,
      { deltaX, deltaY },
      item.w,
      item.h,
    );
    onMove(item.id, x, y);

    dragStart.current = null;
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const maxX = GRID_COLUMNS - item.w
    const maxY = GRID_ROWS - item.h

    let nextX = item.x
    let nextY = item.y

    switch (e.key) {
      case "ArrowLeft":
        nextX = Math.max(0, item.x - 1)
        break;
      case "ArrowRight":
        nextX = Math.min(maxX, item.x + 1)
        break
      case "ArrowUp":
        nextY = Math.max(0, item.y - 1)
        break
      case "ArrowDown":
        nextY = Math.min(maxY, item.y + 1)
        break
      default:
        return
    }

    e.preventDefault()
    onMove(item.id, nextX, nextY)
  }

  return (
    <div
      role="group"
      tabIndex={0}
      aria-label={`${item.id} widget, use arrow keys to move`}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onKeyDown={handleKeyDown}
      style={{ left, top, width, height }}
      className="
        absolute rounded-lg border border-(--color-border)
        bg-(--color-bg-elevated) text-(--color-text)
        cursor-grab active:cursor-grabbing select-none
        shadow-sm hover:shadow-md transition-shadow
        focus:outline-none focus:ring-2 focus:ring-(--color-focus-ring)
      "
    >
      <MetricCard cardId={item.id} />
    </div>
  );
}
