'use client'

import { useState } from 'react'
import { Search, Loader2, X } from 'lucide-react'
import Input from '@/components/ui/Input'
import { useBible } from '@/hooks/useBible'

interface SearchResult {
  id: string
  chapter: number
  verse: number
  text: string
  book_id: string
  bible_books: { name: string; abbreviation: string }[]
}

interface SearchResultsProps {
  onSelectVerse?: (bookId: string, chapter: number) => void
}

export default function SearchResults({ onSelectVerse }: SearchResultsProps) {
  const { searchVerses, loading } = useBible()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [searched, setSearched] = useState(false)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim().length < 3) return

    const data = await searchVerses(query.trim())
    setResults(data as SearchResult[])
    setSearched(true)
  }

  return (
    <div>
      <form onSubmit={handleSearch} className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-text-hint" size={18} />
        <Input
          placeholder="Buscar en la Biblia..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 pr-10"
        />
        {query && (
          <button
            type="button"
            onClick={() => { setQuery(''); setResults([]); setSearched(false) }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-text-hint"
          >
            <X size={16} />
          </button>
        )}
      </form>

      {loading && (
        <div className="flex justify-center py-10">
          <Loader2 className="h-5 w-5 animate-spin text-brand-text-hint" />
        </div>
      )}

      {searched && !loading && results.length === 0 && (
        <p className="py-10 text-center text-sm text-brand-text-hint">
          No se encontraron resultados para &ldquo;{query}&rdquo;
        </p>
      )}

      {results.length > 0 && (
        <div className="mt-4 space-y-3">
          <p className="text-xs text-brand-text-hint">{results.length} resultados</p>
          {results.map((r) => (
            <button
              key={r.id}
              onClick={() => onSelectVerse?.(r.book_id, r.chapter)}
              className="w-full rounded-xl border border-brand-border bg-white p-4 text-left transition-colors hover:border-brand-blue-mid"
            >
              <p className="text-xs font-medium text-brand-gold">
                {r.bible_books[0]?.name} {r.chapter}:{r.verse}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-brand-text-primary line-clamp-3">
                {r.text}
              </p>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
