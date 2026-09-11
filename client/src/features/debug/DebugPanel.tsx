import { useRef, useState } from 'react'
import { useAppState } from '../../state/StateContext'
import { exportStateAsJSON, importStateFromJSON } from '../../state/storage'

export function DebugPanel() {
  const { state, dispatch } = useAppState()
  const [importError, setImportError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleExport = () => {
    const json = exportStateAsJSON(state)
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)

    const a = document.createElement('a')
    a.href = url
    a.download = 'dashboard-state.json'
    a.click()

    URL.revokeObjectURL(url)
  }

  const handleImportClick = () => {
    setImportError(null)
    fileInputRef.current?.click()
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const text = await file.text()
    const parsed = importStateFromJSON(text)

    if (!parsed) {
      setImportError('Invalid JSON file — could not import.')
      return
    }

    dispatch({ type: 'IMPORT_STATE', payload: parsed })
    e.target.value = '' // reset so the same file can be re-selected later
  }

  return (
    <div className="flex items-center gap-3 p-3 text-sm">
      <button
        type="button"
        onClick={handleExport}
        className="rounded border border-(--color-border bg-(--color-bg-alt px-3 py-1 text-sm text-(--color-text hover:bg-(--color-bg-elevated transition-colors"
      >
        Export state
      </button>

      <button
        type="button"
        onClick={handleImportClick}
        className="rounded border border-(--color-border bg-(--color-bg-alt px-3 py-1 text-sm text-(--color-text hover:bg-(--color-bg-elevated transition-colors"
      >
        Import state
      </button>

      <input
        ref={fileInputRef}
        type="file"
        accept="application/json"
        onChange={handleFileChange}
        className="hidden"
      />

      {importError && <span className="text-red-400">{importError}</span>}
    </div>
  )
}