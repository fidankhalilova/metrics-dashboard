import type { AppState, LayoutItem } from "./types";

export type Action = 
| { type: 'SET_THEME'; payload: AppState['theme'] }
| { type: 'TOGGLE_SIDEBAR' }
| { type: 'SET_SIDEBAR_COLLAPSED'; payload: boolean }
| { type: 'SET_LAYOUT'; payload: LayoutItem[] }
| { type: 'MOVE_WIDGET'; payload: { id: string; x: number; y: number } }
| { type: 'IMPORT_STATE'; payload: AppState }

export function appReducer(state: AppState, action: Action): AppState {
    switch (action.type) {
        case 'SET_THEME':
            return { ...state, theme: action.payload}

        case 'TOGGLE_SIDEBAR':
            return { ...state, sidebar: { ...state.sidebar, collapsed: !state.sidebar.collapsed} }

        case 'SET_SIDEBAR_COLLAPSED':
            return { ...state, sidebar: { ...state.sidebar, collapsed: action.payload } }

        case 'SET_LAYOUT':
            return { ...state, layout: action.payload }

        case 'MOVE_WIDGET':
            return {
                ...state,
                layout: state.layout.map((item) => item.id === action.payload.id ? { ...item, x: action.payload.x, y: action.payload.y }
            : item )
            }

        case 'IMPORT_STATE':
            return action.payload

        default:
            return state
    }
}