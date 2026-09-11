import { cardRegistry } from "./cardRegistry";
import { useMetricData } from "./useMetricData";

interface MetricCardProps {
    cardId: string
}

export function MetricCard({ cardId }: MetricCardProps) {
    const config = cardRegistry[cardId]
    const { status, data, retry } = useMetricData(cardId)

    if(!config) {
        return <div className="p-3 text-sm text-red-400">Unknown card: {cardId}</div>
    }

    return (
      <div className="flex h-full w-full flex-col justify-center p-3">
        <div className="text-xs text-(--color-text-muted) mb-1">
          {config.title}
        </div>

        {status === "loading" && (
          <div className="h-6 w-16 animate-pulse rounded bg-(--color-border)" />
        )}

        {status === "success" && data && (
          <div className="text-lg font-semibold text-(--color-text)">
            {data.prefix}
            {data.value.toLocaleString()}
            {data.suffix}
          </div>
        )}

        {status === "error" && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-(--color-danger)">
              Failed to load
            </span>
            <button
              type="button"
              onClick={retry}
              className="text-xs underline text-(--color-accent) hover:text-(--color-accent-hover)"
            >
              Retry
            </button>
          </div>
        )}
      </div>
    );
} 