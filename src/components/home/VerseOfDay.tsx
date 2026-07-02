'use client'

import { useState, useEffect } from 'react'
import { Heart, MessageCircle, Share2, Loader2 } from 'lucide-react'
import { supabase } from '@/lib/supabase/client'
import { useAuthStore } from '@/stores/authStore'
import type { DailyVerse } from '@/types'

const VERSE_IMAGES = [
  'https://images.unsplash.com/photo-1507692049790-de58290a4334?w=800&q=80',
  'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=800&q=80',
  'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80',
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80',
  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80',
  'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&q=80',
  'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=800&q=80',
]

function getDailyImage(): string {
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000
  )
  return VERSE_IMAGES[dayOfYear % VERSE_IMAGES.length]
}

export default function VerseOfDay() {
  const { user } = useAuthStore()
  const [verse, setVerse] = useState<DailyVerse | null>(null)
  const [liked, setLiked] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchVerse = async () => {
      const today = new Date().toISOString().split('T')[0]

      const { data } = await supabase
        .from('daily_verses')
        .select('*')
        .eq('date', today)
        .single()

      if (data) {
        setVerse(data as DailyVerse)

        if (user) {
          const { data: like } = await supabase
            .from('verse_likes')
            .select('id')
            .eq('verse_date', today)
            .eq('user_id', user.id)
            .single()

          setLiked(!!like)
        }
      }
      setLoading(false)
    }

    fetchVerse()
  }, [user])

  const handleLike = async () => {
    if (!user || !verse) return

    if (liked) {
      await supabase
        .from('verse_likes')
        .delete()
        .eq('verse_date', verse.date)
        .eq('user_id', user.id)

      setVerse((v) => v ? { ...v, likes_count: v.likes_count - 1 } : v)
    } else {
      await supabase
        .from('verse_likes')
        .insert({ verse_date: verse.date, user_id: user.id })

      setVerse((v) => v ? { ...v, likes_count: v.likes_count + 1 } : v)
    }
    setLiked(!liked)
  }

  const handleShare = async () => {
    if (!verse) return
    try {
      const { Share } = await import('@capacitor/share').catch(() => ({ Share: null }))
      if (Share) {
        await Share.share({
          title: 'Versículo del día',
          text: `"${verse.text_es}" — ${verse.reference}\n\nCuerpo de Cristo App`,
        })
      } else if (navigator.share) {
        await navigator.share({
          title: 'Versículo del día',
          text: `"${verse.text_es}" — ${verse.reference}`,
        })
      }
    } catch {
      // User cancelled share
    }
  }

  if (loading) {
    return (
      <div className="flex h-56 items-center justify-center rounded-2xl bg-surface">
        <Loader2 className="h-5 w-5 animate-spin text-brand-gold" />
      </div>
    )
  }

  if (!verse) {
    return (
      <div className="rounded-2xl bg-surface p-6 text-center">
        <p className="text-sm text-brand-text-hint">No hay versículo para hoy</p>
      </div>
    )
  }

  return (
    <div className="relative overflow-hidden rounded-2xl">
      {/* Background image */}
      <img
        src={getDailyImage()}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/40" />

      {/* Content */}
      <div className="relative z-10 p-5 pt-8 pb-5">
        <p className="text-xs font-medium uppercase tracking-widest text-brand-gold">
          Versículo del día
        </p>
        <p className="mt-4 font-[family-name:var(--font-playfair)] text-xl leading-relaxed text-white">
          &ldquo;{verse.text_es}&rdquo;
        </p>
        <p className="mt-3 text-sm font-medium text-brand-gold">
          — {verse.reference}
        </p>

        {/* Actions */}
        <div className="mt-5 flex items-center gap-4">
          <button onClick={handleLike} className="flex items-center gap-1.5 text-sm text-white/70 transition-colors hover:text-white cursor-pointer">
            <Heart
              size={18}
              className={liked ? 'fill-red-500 text-red-500' : ''}
            />
            <span>{verse.likes_count}</span>
          </button>
          <button className="flex items-center gap-1.5 text-sm text-white/70">
            <MessageCircle size={18} />
            <span>{verse.comments_count}</span>
          </button>
          <button onClick={handleShare} className="ml-auto text-white/70 transition-colors hover:text-white cursor-pointer">
            <Share2 size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}
