'use client'

import { useState, useEffect } from 'react'
import { BookOpen, ChevronRight, Loader2 } from 'lucide-react'
import { supabase } from '@/lib/supabase/client'
import type { Devotional } from '@/types'

export default function DevotionalCard() {
  const [devotional, setDevotional] = useState<Devotional | null>(null)
  const [loading, setLoading] = useState(true)
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    const fetchDevotional = async () => {
      const today = new Date().toISOString().split('T')[0]

      const { data } = await supabase
        .from('devotionals')
        .select('*')
        .eq('date', today)
        .eq('is_published', true)
        .single()

      if (data) {
        setDevotional(data as Devotional)
      } else {
        const { data: latest } = await supabase
          .from('devotionals')
          .select('*')
          .eq('is_published', true)
          .order('date', { ascending: false })
          .limit(1)
          .single()

        if (latest) setDevotional(latest as Devotional)
      }
      setLoading(false)
    }

    fetchDevotional()
  }, [])

  if (loading) {
    return (
      <div className="flex h-32 items-center justify-center rounded-2xl border border-brand-border bg-surface">
        <Loader2 className="h-5 w-5 animate-spin text-brand-text-hint" />
      </div>
    )
  }

  if (!devotional) return null

  return (
    <div className="overflow-hidden rounded-2xl border border-brand-border bg-surface">
      {devotional.image_url && (
        <img
          src={devotional.image_url}
          alt={devotional.title}
          className="h-36 w-full object-cover"
        />
      )}
      <div className="p-4">
        <div className="flex items-center gap-2 text-brand-gold">
          <BookOpen size={16} />
          <span className="text-xs font-medium uppercase tracking-wider">Devocional</span>
        </div>
        <h3 className="mt-2 font-[family-name:var(--font-playfair)] text-lg font-semibold text-brand-text-primary">
          {devotional.title}
        </h3>

        {expanded ? (
          <div className="mt-3 space-y-2 text-sm leading-relaxed text-brand-text-secondary">
            {devotional.body.split('\n').map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            {devotional.verses.length > 0 && (
              <div className="mt-3 rounded-xl bg-brand-blue-soft p-3">
                <p className="text-xs font-medium text-brand-blue-text">Versículos relacionados</p>
                <p className="mt-1 text-sm text-brand-text-primary">{devotional.verses.join(', ')}</p>
              </div>
            )}
            <button
              onClick={() => setExpanded(false)}
              className="mt-2 text-sm font-medium text-brand-gold cursor-pointer"
            >
              Leer menos
            </button>
          </div>
        ) : (
          <>
            <p className="mt-2 line-clamp-2 text-sm text-brand-text-secondary">
              {devotional.body}
            </p>
            <button
              onClick={() => setExpanded(true)}
              className="mt-3 flex items-center gap-1 text-sm font-medium text-brand-gold cursor-pointer"
            >
              Leer más <ChevronRight size={14} />
            </button>
          </>
        )}
      </div>
    </div>
  )
}
