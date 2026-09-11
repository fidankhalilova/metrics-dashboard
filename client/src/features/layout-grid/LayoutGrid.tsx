import { useAppState } from "../../state/StateContext";
import { Widget } from "./Widget";

export function LayoutGrid() {
    const { state, dispatch } = useAppState()

    const handleMove = (id: string, x: number, y: number) => {
        dispatch({ type: 'MOVE_WIDGET', payload: {id, x, y} } )
    }

    return (
      <div className="relative w-150 min-h-150 max-w-full rounded-lg border border-dashed border-(--color-border) bg-(--color-bg-alt)">
        {state.layout.map((item) => (
          <Widget key={item.id} item={item} onMove={handleMove} />
        ))}
      </div>
    );
}