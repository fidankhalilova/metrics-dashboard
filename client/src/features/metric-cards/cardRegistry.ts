export interface CardConfig {
  id: string
  title: string
}

export const cardRegistry: Record<string, CardConfig> = {
  w1: { id: 'w1', title: 'Page Views' },
  w2: { id: 'w2', title: 'Followers' },
  w3: { id: 'w3', title: 'Revenue' },
  w4: { id: 'w4', title: 'Active Users' },
  w5: { id: 'w5', title: 'Conversion Rate' },
  w6: { id: 'w6', title: 'Bounce Rate' },
}