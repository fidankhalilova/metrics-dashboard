import { createContext, useContext, useEffect, useReducer, type ReactNode } from "react";
import { loadState, saveState } from "./storage";
import { appReducer, type Action } from "./reducer";
import type { AppState } from "./types";

interface StateContextValue {
    state: AppState
    dispatch: React.Dispatch<Action>
}

const StateContext = createContext<StateContextValue | null>(null)

export function StateProvider({children}: {children: ReactNode}) {
    const [state, dispatch] = useReducer(appReducer, undefined, loadState)

    useEffect(() => {
        saveState(state)
        console.log(state)
    }, [state])

    useEffect(() => {
        const resolved =
        state.theme === 'system'
        ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
        : state.theme

        document.documentElement.setAttribute('data-theme',resolved)
        document.documentElement.setAttribute('data-theme-mode', state.theme)
    }, [state.theme])
  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {children}
    </StateContext.Provider>
  )
}

export function useAppState() {
    const ctx = useContext(StateContext)
    if (!ctx) {
        throw new Error("useAppState must be used within a StateProvider")
    }
    return ctx
}