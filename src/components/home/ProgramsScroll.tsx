'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Heart, ChevronRight } from 'lucide-react'
import { supabase } from '@/lib/supabase/client'
import type { Program } from '@/types'

export default function ProgramsScroll() {
  const [programs, setPrograms] = useState<Program[]>([])

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from('programs')
        .select('*')
        .eq('is_active', true)
        .order('sort_order')

      if (data) setPrograms(data as Program[])
    }
    fetch()
  }, [])

  if (programs.length === 0) return null

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="font-[family-name:var(--font-playfair)] text-lg font-semibold text-brand-text-primary">
          Programas
        </h2>
        <Link href="/programs" className="flex items-center gap-0.5 text-xs font-medium text-brand-gold cursor-pointer">
          Ver todos <ChevronRight size={14} />
        </Link>
      </div>

      <div className="mt-3 flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {programs.map((program) => (
          <Link
            key={program.id}
            href={`/programs/${program.slug}`}
            className="w-44 shrink-0 overflow-hidden rounded-2xl border border-brand-border bg-surface transition-shadow hover:shadow-lg cursor-pointer"
          >
            {program.image_url ? (
              <img
                src={program.image_url}
                alt={program.title}
                className="h-24 w-full object-cover"
              />
            ) : (
              <div className="flex h-24 items-center justify-center bg-brand-gold-light">
                <Heart size={24} className="text-brand-gold" />
              </div>
            )}
            <div className="p-3">
              <p className="text-sm font-medium text-brand-text-primary line-clamp-2">
                {program.title}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
