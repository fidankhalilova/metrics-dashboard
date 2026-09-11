import { useAppState } from '../../state/StateContext'

const MODES = ['light', 'dark', 'system'] as const

export function ThemeToggle() {
    const { state, dispatch } = useAppState()

    const cycle = () => {
        const i = MODES.indexOf(state.theme)
        const next = MODES[(i + 1) % MODES.length]
        dispatch({ type: 'SET_THEME', payload: next})
    }

    return (
        <button
            type="button"
            onClick={cycle}
            aria-label={`Theme: ${state.theme}. Click to switch`}
            className="rounded border border-(--color-border) bg-(--bg-alt) px-3 py-1.5 text-sm text-(--color-text) hover:bg-(--color-bg-elevated) transition-colors">
            Theme: {state.theme}
        </button>
    )
}