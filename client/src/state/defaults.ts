import type { AppState } from './types'

export const defaultState: AppState = {
  theme: 'system',
  sidebar: {
    collapsed: false,
  },
  layout: [
    { id: 'w1', x: 0, y: 0, w: 2, h: 1, collapsed: false },
    { id: 'w2', x: 2, y: 0, w: 2, h: 1, collapsed: false },
    { id: 'w3', x: 4, y: 0, w: 2, h: 1, collapsed: false },
    { id: 'w4', x: 0, y: 1, w: 2, h: 1, collapsed: false },
    { id: 'w5', x: 2, y: 1, w: 2, h: 1, collapsed: false },
    { id: 'w6', x: 4, y: 1, w: 2, h: 1, collapsed: false },
  ],
}