'use client'

import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight, Loader2, Bookmark, Highlighter } from 'lucide-react'
import { supabase } from '@/lib/supabase/client'
import { useAuthStore } from '@/stores/authStore'

interface BibleReaderProps {
  bookId: string
  bookName: string
  initialChapter?: number
  totalChapters: number
  onBack: () => void
}

interface Verse {
  id: string
  chapter: number
  verse: number
  text: string
}

interface Highlight {
  verse_id: string
  color: string
  note: string | null
}

const HIGHLIGHT_COLORS = ['#E8F4FD', '#E8F5E9', '#FFF3E0', '#FCE4EC', '#F3E5F5']

export default function BibleReader({
  bookId,
  bookName,
  initialChapter = 1,
  totalChapters,
  onBack,
}: BibleReaderProps) {
  const { user } = useAuthStore()
  const [chapter, setChapter] = useState(initialChapter)
  const [verses, setVerses] = useState<Verse[]>([])
  const [highlights, setHighlights] = useState<Map<string, Highlight>>(new Map())
  const [loading, setLoading] = useState(true)
  const [selectedVerse, setSelectedVerse] = useState<string | null>(null)
  const [fontSize, setFontSize] = useState(16)

  const fetchChapter = useCallback(async (ch: number) => {
    setLoading(true)
    setSelectedVerse(null)

    const { data } = await supabase
      .from('bible_verses')
      .select('id, chapter, verse, text')
      .eq('book_id', bookId)
      .eq('chapter', ch)
      .order('verse')

    if (data) setVerses(data)

    // Fetch highlights
    if (user && data) {
      const verseIds = data.map((v) => v.id)
      const { data: hl } = await supabase
        .from('user_highlights')
        .select('verse_id, color, note')
        .eq('user_id', user.id)
        .in('verse_id', verseIds)

      if (hl) {
        const map = new Map<string, Highlight>()
        hl.forEach((h) => map.set(h.verse_id, h))
        setHighlights(map)
      }
    }

    setLoading(false)
  }, [bookId, user])

  useEffect(() => {
    fetchChapter(chapter)
  }, [chapter, fetchChapter])

  const goToChapter = (ch: number) => {
    if (ch >= 1 && ch <= totalChapters) {
      setChapter(ch)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleHighlight = async (verseId: string, color: string) => {
    if (!user) return

    const existing = highlights.get(verseId)

    if (existing && existing.color === color) {
      // Remove highlight
      await supabase
        .from('user_highlights')
        .delete()
        .eq('user_id', user.id)
        .eq('verse_id', verseId)

      setHighlights((prev) => {
        const next = new Map(prev)
        next.delete(verseId)
        return next
      })
    } else {
      // Add/update highlight
      await supabase.from('user_highlights').upsert(
        { user_id: user.id, verse_id: verseId, color },
        { onConflict: 'user_id,verse_id' }
      )

      setHighlights((prev) => {
        const next = new Map(prev)
        next.set(verseId, { verse_id: verseId, color, note: existing?.note ?? null })
        return next
      })
    }

    setSelectedVerse(null)
  }

  return (
    <div className="min-h-dvh pb-24">
      {/* Header */}
      <div className="sticky top-0 z-10 border-b border-brand-border bg-white/95 backdrop-blur-sm">
        <div className="flex items-center justify-between px-4 py-3">
          <button onClick={onBack} className="flex items-center gap-1 text-sm text-brand-text-secondary">
            <ChevronLeft size={18} />
            Libros
          </button>
          <h2 className="font-[family-name:var(--font-playfair)] text-base font-semibold text-brand-text-primary">
            {bookName} {chapter}
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFontSize((s) => Math.max(14, s - 1))}
              className="text-xs text-brand-text-hint px-1"
            >
              A-
            </button>
            <button
              onClick={() => setFontSize((s) => Math.min(24, s + 1))}
              className="text-sm font-bold text-brand-text-hint px-1"
            >
              A+
            </button>
          </div>
        </div>
      </div>

      {/* Verses */}
      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="h-6 w-6 animate-spin text-brand-text-hint" />
        </div>
      ) : (
        <div className="px-5 py-6">
          {verses.map((v) => {
            const hl = highlights.get(v.id)
            const isSelected = selectedVerse === v.id

            return (
              <span key={v.id} className="inline">
                <span
                  onClick={() => setSelectedVerse(isSelected ? null : v.id)}
                  className="cursor-pointer rounded-sm transition-colors"
                  style={{
                    fontSize: `${fontSize}px`,
                    lineHeight: '1.8',
                    backgroundColor: hl ? hl.color : undefined,
                  }}
                >
                  <sup className="mr-0.5 text-xs font-bold text-brand-gold">{v.verse}</sup>
                  {v.text.split('\n').map((line, i) => (
                    <span key={i}>
                      {i > 0 && <br />}
                      {line}
                    </span>
                  ))}{' '}
                </span>

                {/* Highlight picker */}
                {isSelected && user && (
                  <span className="inline-flex items-center gap-1 mx-1 align-middle">
                    {HIGHLIGHT_COLORS.map((color) => (
                      <button
                        key={color}
                        onClick={(e) => { e.stopPropagation(); handleHighlight(v.id, color) }}
                        className="h-5 w-5 rounded-full border border-gray-200 transition-transform hover:scale-125"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                    <Bookmark size={14} className="ml-1 text-brand-text-hint" />
                  </span>
                )}
              </span>
            )
          })}
        </div>
      )}

      {/* Chapter navigation */}
      <div className="fixed bottom-20 left-0 right-0 z-10 border-t border-brand-border bg-white px-4 py-2">
        <div className="mx-auto flex max-w-md items-center justify-between">
          <button
            onClick={() => goToChapter(chapter - 1)}
            disabled={chapter <= 1}
            className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-brand-text-secondary disabled:opacity-30"
          >
            <ChevronLeft size={16} /> Anterior
          </button>

          <span className="text-sm text-brand-text-hint">
            {chapter} / {totalChapters}
          </span>

          <button
            onClick={() => goToChapter(chapter + 1)}
            disabled={chapter >= totalChapters}
            className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-brand-text-secondary disabled:opacity-30"
          >
            Siguiente <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
