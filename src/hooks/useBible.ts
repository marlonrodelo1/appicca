'use client'

import { useState, useCallback } from 'react'
import { supabase } from '@/lib/supabase/client'

interface BibleBook {
  id: string
  book_number: number
  name: string
  abbreviation: string
  testament: string
}

interface BibleVerse {
  id: string
  chapter: number
  verse: number
  text: string
}

export function useBible() {
  const [books, setBooks] = useState<BibleBook[]>([])
  const [verses, setVerses] = useState<BibleVerse[]>([])
  const [loading, setLoading] = useState(false)
  const [totalChapters, setTotalChapters] = useState(0)

  const fetchBooks = useCallback(async () => {
    setLoading(true)
    const { data: version } = await supabase
      .from('bible_versions')
      .select('id')
      .eq('code', 'RV1960')
      .single()

    if (!version) { setLoading(false); return }

    const { data } = await supabase
      .from('bible_books')
      .select('id, book_number, name, abbreviation, testament')
      .eq('version_id', version.id)
      .order('book_number')

    if (data) setBooks(data)
    setLoading(false)
  }, [])

  const fetchChapter = useCallback(async (bookId: string, chapter: number) => {
    setLoading(true)
    const { data } = await supabase
      .from('bible_verses')
      .select('id, chapter, verse, text')
      .eq('book_id', bookId)
      .eq('chapter', chapter)
      .order('verse')

    if (data) setVerses(data)
    setLoading(false)
  }, [])

  const fetchChapterCount = useCallback(async (bookId: string) => {
    const { data } = await supabase
      .from('bible_verses')
      .select('chapter')
      .eq('book_id', bookId)
      .order('chapter', { ascending: false })
      .limit(1)
      .single()

    const count = data?.chapter ?? 0
    setTotalChapters(count)
    return count
  }, [])

  const searchVerses = useCallback(async (query: string, limit = 50) => {
    setLoading(true)
    const { data } = await supabase
      .from('bible_verses')
      .select('id, chapter, verse, text, book_id, bible_books!inner(name, abbreviation)')
      .ilike('text', `%${query}%`)
      .limit(limit)

    setLoading(false)
    return data ?? []
  }, [])

  return {
    books,
    verses,
    loading,
    totalChapters,
    fetchBooks,
    fetchChapter,
    fetchChapterCount,
    searchVerses,
  }
}
