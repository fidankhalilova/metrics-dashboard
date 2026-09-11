import { useEffect } from "react"
import { useAppState } from "../../state/StateContext"
import { useMediaQuery } from "./useMediaQuery"

const MOBILE_BREAKPOINT = '(max-width: 768px)'

export function useSidebarState() {
    const { state, dispatch } = useAppState()
    const isMobile = useMediaQuery(MOBILE_BREAKPOINT)

    useEffect(() => {
        if (isMobile && !state.sidebar.collapsed) {
            dispatch({ type: 'SET_SIDEBAR_COLLAPSED', payload: true })
        }
    }, [isMobile])

    const toggle = () => dispatch({ type: 'TOGGLE_SIDEBAR' })

    return {
        collapsed: state.sidebar.collapsed,
        isMobile,
        toggle
    }
}