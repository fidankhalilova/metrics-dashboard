import type { LayoutItem } from "../../state/types";

export const GRID_CELL_SIZE = 70;
export const GRID_COLUMNS = 6;
export const GRID_ROWS = 6;

export interface DragDelta {
  deltaX: number;
  deltaY: number;
}

export function computeSnappedPosition(
  startX: number,
  startY: number,
  delta: DragDelta,
  itemW: number,
  itemH: number,
): { x: number; y: number } {
  const rawX = startX + delta.deltaX / GRID_CELL_SIZE;
  const rawY = startY + delta.deltaY / GRID_CELL_SIZE;

  const maxX = GRID_COLUMNS - itemW;
  const maxY = GRID_ROWS - itemH;

  const x = Math.min(Math.max(0, Math.round(rawX)), maxX);
  const y = Math.min(Math.max(0, Math.round(rawY)), maxY);

  return { x, y };
}

export function gridToPixels(item: LayoutItem) {
  return {
    left: item.x * GRID_CELL_SIZE,
    top: item.y * GRID_CELL_SIZE,
    width: item.w * GRID_CELL_SIZE,
    height: item.h * GRID_CELL_SIZE,
  };
}

export function updateWidgetPosition(
  layout: LayoutItem[],
  id: string,
  x: number,
  y: number,
): LayoutItem[] {
  return layout.map((item) => (item.id === id ? { ...item, x, y } : item));
}
