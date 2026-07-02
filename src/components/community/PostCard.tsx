'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Heart, MessageCircle, Share2, MoreHorizontal, Trash2 } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { es } from 'date-fns/locale'
import Avatar from '@/components/shared/Avatar'
import { supabase } from '@/lib/supabase/client'
import { useAuthStore } from '@/stores/authStore'
import type { Post } from '@/types'

interface PostCardProps {
  post: Post
  onLike: (postId: string) => void
  onUnlike: (postId: string) => void
  onDelete?: (postId: string) => void
}

export default function PostCard({ post, onLike, onUnlike, onDelete }: PostCardProps) {
  const { user } = useAuthStore()
  const [liked, setLiked] = useState(false)
  const [showMenu, setShowMenu] = useState(false)

  useEffect(() => {
    if (!user) return
    const check = async () => {
      const { data } = await supabase
        .from('post_likes')
        .select('id')
        .eq('post_id', post.id)
        .eq('user_id', user.id)
        .single()
      setLiked(!!data)
    }
    check()
  }, [post.id, user])

  const handleLike = () => {
    if (!user) return
    if (liked) {
      onUnlike(post.id)
    } else {
      onLike(post.id)
    }
    setLiked(!liked)
  }

  const handleShare = async () => {
    const text = post.content?.substring(0, 100) ?? ''
    try {
      if (navigator.share) {
        await navigator.share({ title: 'Cuerpo de Cristo', text })
      }
    } catch {
      // cancelled
    }
  }

  const timeAgo = formatDistanceToNow(new Date(post.created_at), {
    addSuffix: true,
    locale: es,
  })

  return (
    <div className="border-b border-brand-border bg-white px-4 py-4">
      {/* Header */}
      <div className="flex items-start gap-3">
        <Link href={`/profile`}>
          <Avatar src={post.profile?.avatar_url} name={post.profile?.full_name} size="md" />
        </Link>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold text-brand-text-primary truncate">
              {post.profile?.full_name || 'Usuario'}
            </p>
            <span className="text-xs text-brand-text-hint">{timeAgo}</span>
          </div>
        </div>

        {user?.id === post.user_id && (
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="text-brand-text-hint p-1"
            >
              <MoreHorizontal size={16} />
            </button>
            {showMenu && (
              <div className="absolute right-0 top-8 z-10 rounded-xl border border-brand-border bg-white py-1 shadow-lg">
                <button
                  onClick={() => { onDelete?.(post.id); setShowMenu(false) }}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-red-500"
                >
                  <Trash2 size={14} /> Eliminar
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Content */}
      {post.content && (
        <p className="mt-3 text-sm leading-relaxed text-brand-text-primary whitespace-pre-wrap">
          {post.content}
        </p>
      )}

      {/* Media */}
      {post.media_urls.length > 0 && (
        <div className="mt-3 overflow-hidden rounded-xl">
          {post.media_type === 'video' ? (
            <video
              src={post.media_urls[0]}
              controls
              className="w-full rounded-xl"
            />
          ) : (
            <div className={`grid gap-1 ${post.media_urls.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
              {post.media_urls.map((url, i) => (
                <img
                  key={i}
                  src={url}
                  alt=""
                  className="w-full rounded-xl object-cover"
                  style={{ maxHeight: post.media_urls.length > 1 ? '200px' : '400px' }}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="mt-3 flex items-center gap-6">
        <button
          onClick={handleLike}
          className="flex items-center gap-1.5 text-sm text-brand-text-secondary"
        >
          <Heart size={18} className={liked ? 'fill-red-500 text-red-500' : ''} />
          <span>{post.likes_count || ''}</span>
        </button>
        <Link
          href={`/community/${post.id}`}
          className="flex items-center gap-1.5 text-sm text-brand-text-secondary"
        >
          <MessageCircle size={18} />
          <span>{post.comments_count || ''}</span>
        </Link>
        <button
          onClick={handleShare}
          className="ml-auto text-brand-text-secondary"
        >
          <Share2 size={18} />
        </button>
      </div>
    </div>
  )
}
