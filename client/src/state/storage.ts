import { defaultState } from './defaults'
import { CURRENT_VERSION } from "./types";
import type { AppState, StoredEnvelope } from './types'

const STORAGE_KEY = 'metrics-dashboard-state'

export function loadState(): AppState {
    let raw: string | null
    try {
        raw = localStorage.getItem(STORAGE_KEY)
    } catch {
        return defaultState
    }
    if(!raw) {
        return defaultState
    }
    try {
        const parsed: StoredEnvelope = JSON.parse(raw)
        if(parsed.version !== CURRENT_VERSION) {
            return defaultState
        }
        return parsed.state
    } catch {
        return defaultState
    }
}

export function saveState(state: AppState): void {
    const envelope: StoredEnvelope = {
        version: CURRENT_VERSION,
        state,
    }

    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(envelope))
    } catch (err) {
        console.log('Failed to save state: ', err)
    }
}

export function exportStateAsJSON(state: AppState): string {
    return JSON.stringify(state, null, 2)
}

export function importStateFromJSON(json: string): AppState | null {
    try {
        return JSON.parse(json) as AppState
    } catch {
        return null
    }
}