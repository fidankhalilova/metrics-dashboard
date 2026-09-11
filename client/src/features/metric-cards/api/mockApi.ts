export interface MetricResult {
  label: string
  value: number
  prefix?: string
  suffix?: string
}

interface MetricMeta {
  label: string
  prefix?: string
  suffix?: string
  min: number
  max: number
}

const MOCK_METRICS: Record<string, MetricMeta> = {
  w1: { label: 'Page Views', min: 500, max: 12000 },
  w2: { label: 'Followers', min: 100, max: 8000 },
  w3: { label: 'Revenue', prefix: '$', min: 1000, max: 45000 },
  w4: { label: 'Active Users', min: 50, max: 3000 },
  w5: { label: 'Conversion Rate', suffix: '%', min: 1, max: 12 },
  w6: { label: 'Bounce Rate', suffix: '%', min: 20, max: 75 },
}

export function fetchMetric(cardId: string): Promise<MetricResult> {
  return new Promise((resolve, reject) => {
    const delay = 500 + Math.random() * 800

    setTimeout(() => {
      const meta = MOCK_METRICS[cardId]

      if (!meta) {
        reject(new Error(`No metric config for card "${cardId}"`))
        return
      }

      if (Math.random() < 0.15) {
        reject(new Error('Failed to fetch metric'))
        return
      }

      const value = Math.floor(meta.min + Math.random() * (meta.max - meta.min))

      resolve({
        label: meta.label,
        value,
        prefix: meta.prefix,
        suffix: meta.suffix,
      })
    }, delay)
  })
}