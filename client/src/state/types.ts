export interface AppState {
    theme: 'light' | 'dark' | 'system'
    sidebar: {
        collapsed: boolean
    }
    layout: LayoutItem[]
}

export interface LayoutItem {
    id: string
    x: number
    y: number
    w: number
    h: number
    collapsed: boolean
}

export interface StoredEnvelope {
    version: number
    state: AppState
}

export const CURRENT_VERSION = 1